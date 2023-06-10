"use client"

import axios from "axios"
import { redirect } from "next/navigation"
import { signIn } from "next-auth/react"
import type { FormEvent } from "react"
import Account from "./Account"
import Profile from "./Profile"
import { Button, Form } from "~/components"
import { useFormData, useMultiForm } from "~/lib/hooks"
import type { Position } from "@prisma/client"

interface RegisterProps {
  positions: Position[]
}

interface Value<T> {
  data: T
  error: boolean
}

export interface FormData {
  email: Value<string>
  password: Value<string>
  name: Value<string>
  surname: Value<string>
  position: Value<string>
  city: Value<string>
  salary: Value<number>
}

export default function Register({ positions }: RegisterProps) {
  const { formData, setFormData, updateFormData } = useFormData(
    "email",
    "password",
    "name",
    "surname",
    "position",
    "city",
    ["salary", 0]
  )
  function onChange(name: string, check?: (value: string) => boolean) {
    return (value: string) =>
      setFormData(prevData => ({
        ...prevData,
        [name]: {
          data: value,
          error:
            typeof check === "function" ? check(value) : value.length === 0,
        },
      }))
  }
  const {
    currentFormIndex,
    form,
    formsLength,
    isFirstForm,
    isLastForm,
    next,
    previous,
  } = useMultiForm([
    <Account key="account" onChange={onChange} {...formData} />,
    <Profile
      key="profile"
      onChange={onChange}
      positions={positions}
      {...formData}
    />,
  ])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    const isInvalid = updateFormData(form, {
      salary: value => Number(value) <= 0,
    })

    if (isInvalid) return

    const action = (
      e.currentTarget.querySelector("button[data-hovered]") as HTMLButtonElement
    ).innerText.toLowerCase()

    if (action === "next") return next()
    if (action === "previous") return previous()

    const { data: account, status } = await axios.post(
      "http://localhost:3000/api/employer",
      Object.entries(formData).reduce(
        (arr, [name, { data }]) => ({ ...arr, [name]: data }),
        {}
      )
    )

    if (account.status === 201) {
      signIn("credentials", {
        email: account.email,
        password: account.password,
      })
    }

    redirect("http://localhost:3000/")
  }

  return (
    <div className="mx-auto max-w-md rounded-lg p-4 shadow-lg shadow-black/60">
      <h2 className="mb-2 flex items-center justify-between">
        <span className="text-4xl font-semibold">Register</span>
        {currentFormIndex + 1}/{formsLength}
      </h2>
      <Form onSubmit={onSubmit}>
        {form}
        <Form.Group>
          {!isFirstForm && <Button type="submit">Previous</Button>}
          <Button type="submit">{isLastForm ? "Submit" : "Next"}</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
