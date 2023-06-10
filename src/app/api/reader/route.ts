import { NextRequest, NextResponse } from "next/server"
import db from "~/lib/prisma"

export async function POST(request: NextRequest) {
  const {
    name,
    surname,
    dateOfBirth,
    street,
    postcode,
    city,
    id,
    function: functionName,
    gender,
  } = await request.json()

  if (
    !name ||
    !surname ||
    !dateOfBirth ||
    !street ||
    !postcode ||
    !city ||
    !id ||
    !functionName ||
    !gender
  )
    return NextResponse.json("Incomplete Values", { status: 400 })

  const reader = await db.reader.create({
    data: {
      name,
      surname,
      dateOfBirth: new Date(dateOfBirth),
      signUpDate: new Date(),
      street,
      postcode,
      city,
      id,
      function: functionName,
      gender,
    },
  })

  return NextResponse.json(reader, { status: 201 })
}
