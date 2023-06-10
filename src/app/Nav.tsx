"use client"

import { Link } from "~/components"

const links = [
  { route: "/author", name: "Author" },
  { route: "/book", name: "Book" },
  { route: "/reader", name: "Reader" },
  { route: "/rental", name: "Rental" },
]

export default function Nav() {
  return (
    <ul className="mb-10 flex w-full gap-4">
      {links.map(({ route, name }) => (
        <li key={route} className="flex flex-1">
          <Link
            className="flex-1 rounded-xl bg-indigo-500 py-4 text-center text-xl font-semibold text-white shadow-lg shadow-black/60 data-[hovered]:bg-indigo-600"
            href={route}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
