"use client"

import { signIn } from "next-auth/react"
import type { FormEvent } from "react"
import { Button, TextField, Form } from "~/components"

export default function Login() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    signIn("credentials", {
      email: form.email.value,
      password: form.password.value,
      callbackUrl: "http://localhost:3000/",
    })
  }

  return (
    <div className="mx-auto max-w-md rounded-lg p-4 shadow-lg shadow-black/60">
      <h2 className="mb-2 text-center text-4xl font-semibold">Login</h2>
      <Form onSubmit={onSubmit}>
        <TextField label="Email" type="email" name="email" />
        <TextField label="Password" type="password" name="password" />
        <Button type="submit" className="mt-4">
          Login
        </Button>
      </Form>
    </div>
  )
}
