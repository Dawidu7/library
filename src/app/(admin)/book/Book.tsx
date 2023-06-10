"use client"

import axios from "axios"
import { redirect } from "next/navigation"
import type { FormEvent } from "react"
import { Form, Button, TextField, NumberField, Select } from "~/components"
import type { Section, Author } from "@prisma/client"

interface BookProps {
  sections: Section[]
  authors: Author[]
}

export default function Book({ sections, authors }: BookProps) {
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

    await axios.post("http://localhost:3000/api/book", formData)

    redirect("http://localhost:3000/")
  }

  return (
    <div className="mx-auto max-w-md rounded-lg p-4 shadow-lg shadow-black/60">
      <h2 className="text-center text-4xl font-semibold">Add Book</h2>
      <Form onSubmit={onSubmit}>
        <TextField label="Title" name="title" />
        <TextField label="Publisher" name="publisher" />
        <TextField label="Publication Place" name="publicationPlace" />
        <NumberField label="Publication Year" name="publicationYear" />
        <NumberField label="Volume" name="volume" />
        <NumberField label="Price" name="price" step={0.01} />
        <Select label="Dział" name="section">
          {sections.map(({ name }) => (
            <Select.Item key={name}>{name}</Select.Item>
          ))}
        </Select>
        <Select label="Autor" name="author">
          {authors.map(author => (
            <Select.Item key={author.id}>
              {author.name} {author.surname}
            </Select.Item>
          ))}
        </Select>
        <Button type="submit" className="mt-4">
          Add Book
        </Button>
      </Form>
    </div>
  )
}
