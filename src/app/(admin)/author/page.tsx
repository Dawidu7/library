import { redirect } from "next/navigation"
import { Button, TextField, Form } from "~/components"
import db from "~/lib/prisma"

async function addAuthor(formData: FormData) {
  "use server"

  await db.author.create({
    data: {
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
    },
  })

  redirect("http://localhost:3000")
}

export default function Author() {
  return (
    <div className="mx-auto max-w-md rounded-lg p-4 shadow-lg shadow-black/60">
      <h2 className="text-center text-4xl font-semibold">Add Author</h2>
      <Form action={addAuthor}>
        <TextField label="Name" name="name" />
        <TextField label="Surname" name="surname" />
        <Button type="submit" className="mt-4">
          Add Author
        </Button>
      </Form>
    </div>
  )
}
