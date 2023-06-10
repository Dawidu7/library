import { NextRequest, NextResponse } from "next/server"
import db from "~/lib/prisma"

export async function POST(request: NextRequest) {
  const {
    author: authorId,
    price,
    publicationPlace,
    publicationYear,
    publisher,
    section: sectionName,
    title,
    volume,
  } = await request.json()

  if (
    !authorId ||
    !price ||
    !publicationPlace ||
    !publicationYear ||
    !publisher ||
    !sectionName ||
    !title ||
    !volume
  )
    return NextResponse.json("Incomplete Values", { status: 400 })

  const author = await db.author.findUnique({
    where: { id: Number(authorId) },
  })

  const section = await db.section.findUnique({
    where: { name: sectionName },
  })

  const book = await db.book.create({
    data: {
      title,
      publisher,
      publicationPlace,
      publicationYear: Number(publicationYear.split(",").join("")),
      volume: Number(volume.split(",").join("")),
      price: Number(price.split(",").join("")),
      sectionId: section!.id,
      authorId: author!.id,
    },
  })

  return NextResponse.json(book, { status: 201 })
}
