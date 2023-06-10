import { redirect } from "next/navigation"
import { Button, Select, TextField, NumberField, Form } from "~/components"
import db from "~/lib/prisma"
import Book from "./Book"

export default async function BookWrapper() {
  const [authors, sections] = await Promise.all([
    db.author.findMany(),
    db.section.findMany(),
  ])

  return <Book authors={authors} sections={sections} />
}
