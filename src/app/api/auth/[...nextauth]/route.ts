import { compare } from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import db from "~/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const account = await db.account.findUnique({
          where: { email: credentials.email },
        })

        if (!account) return null

        const isPasswordValid = await compare(
          credentials.password,
          account.password
        )

        if (!isPasswordValid) return null

        const employer = await db.employer.findUnique({
          where: { id: account.employerId as string },
        })

        return employer
      },
    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
