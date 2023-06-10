"use client"

import { signOut } from "next-auth/react"

export default function Logout() {
  signOut({ callbackUrl: "http://localhost:3000/" })

  return <p>Logging out...</p>
}
