"use client"

import axios from "axios"
import { redirect } from "next/navigation"
import type { FormEvent } from "react"
import { Select, Form, Button, TextField } from "~/components"
import type { Book, Employer, Reader } from "@prisma/client"

interface BookProps {
  books: Book[]
  employers: Employer[]
  readers: Reader[]
}

export default function Rental({ books, employers, readers }: BookProps) {
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

    await axios.post("http://localhost:3000/api/rental", formData)

    redirect("http://localhost:3000/")
  }

  return (
    <div className="mx-auto max-w-md rounded-lg p-4 shadow-lg shadow-black/60">
      <h2 className="text-center text-4xl font-semibold">Add Rental</h2>
      <Form onSubmit={onSubmit}>
        <Select label="Book" name="book">
          {books.map(book => (
            <Select.Item key={book.signature}>{book.title}</Select.Item>
          ))}
        </Select>
        <Select label="Employer" name="employer">
          {employers.map(employer => (
            <Select.Item key={employer.id}>
              {employer.name} {employer.surname}
            </Select.Item>
          ))}
        </Select>
        <Select label="Reader" name="reader">
          {readers.map(reader => (
            <Select.Item key={reader.number}>
              {reader.name} {reader.surname}
            </Select.Item>
          ))}
        </Select>
        <Button type="submit" className="mt-4">
          Add Rental
        </Button>
      </Form>
    </div>
  )
}
