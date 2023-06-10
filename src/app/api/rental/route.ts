import { NextRequest, NextResponse } from "next/server"
import db from "~/lib/prisma"

export async function POST(request: NextRequest) {
  const {
    book: bookId,
    employer: employerId,
    reader: readerId,
  } = await request.json()

  if (!bookId || !employerId || !readerId)
    return NextResponse.json("Incomplete Values", { status: 400 })

  const [book, employer, reader] = await Promise.all([
    db.book.findUnique({
      where: { signature: Number(bookId) },
    }),
    db.employer.findUnique({
      where: { id: employerId },
    }),
    db.reader.findUnique({
      where: { number: Number(readerId) },
    }),
  ])

  const rental = await db.rental.create({
    data: {
      signature: book!.signature,
      employerId: employer!.id,
      readerNumber: reader!.number,
    },
  })

  return NextResponse.json(rental, { status: 201 })
}
