import { hash } from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import db from "~/lib/prisma"

export async function POST(request: NextRequest) {
  const { email, password, name, surname, position: positionName, city, salary } =
    await request.json()

  if(!email || !password || !name ||!surname ||!positionName ||!city ||salary <= 0) return NextResponse.json("Incomplete Data", {status: 400})

  const hashedPassword = await hash(password, 10)

  const position = await db.position.findUnique({
    where: { name: positionName }
  })

  if(!position) return NextResponse.json("Invalid Position")

  const account = await db.account.create({
    data: {
      email,
      password: hashedPassword,
      employer: {
        create: {
          name,
          surname,
          positionId: position.id,
          city,
          salary
        }
      }
    }
  })

  return NextResponse.json(account, { status: 201 })
}
