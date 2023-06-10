"use client"

import type { Session } from "next-auth"
import { Link } from ".."

interface ContentProps {
  session: Session | null
}

export default function Content({ session }: ContentProps) {
  const links = session
    ? [{ route: "/logout", name: "Logout" }]
    : [
        { route: "/login", name: "Login" },
        { route: "/register", name: "Register" },
      ]

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between text-white">
      <Link className="text-4xl font-semibold" href="/">
        Library
      </Link>
      <ul className="flex gap-4">
        {links.map(({ route, name }) => (
          <li key={route}>
            <Link href={route}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
