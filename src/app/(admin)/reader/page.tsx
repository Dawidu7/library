"use client"

import axios from "axios"
import { redirect } from "next/navigation"
import type { FormEvent } from "react"
import { TextField, Form, Button, Select } from "~/components"

export default function Reader() {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    const formData = Array.from(form.querySelectorAll("input")).reduce(
      (acc, { name, value }) => {
        if (!name) return acc

        return {
          ...acc,
          [name]: value,
        }
      },
      {}
    )

    await axios.post("http://localhost:3000/api/reader", formData)

    redirect("http://localhost:3000/")
  }

  return (
    <div className="mx-auto max-w-md rounded-lg p-4 shadow-lg shadow-black/60">
      <h2 className="text-center text-4xl font-semibold">Add Reader</h2>
      <Form onSubmit={onSubmit}>
        <TextField label="Name" name="name" />
        <TextField label="Surname" name="surname" />
        <input type="date" name="dateOfBirth" className="mt-4" />
        <TextField label="Street" name="street" />
        <TextField label="Postcode" name="postcode" />
        <TextField label="City" name="city" />
        <TextField label="ID" name="id" />
        <Select label="Funckja" name="function">
          <Select.Item key="PD">PD</Select.Item>
          <Select.Item key="S">S</Select.Item>
        </Select>
        <Select label="Płeć" name="gender">
          <Select.Item key="K">K</Select.Item>
          <Select.Item key="M">M</Select.Item>
        </Select>
        <Button type="submit" className="mt-4">
          Add Reader
        </Button>
      </Form>
    </div>
  )
}
