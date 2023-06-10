import { getSession } from "~/lib/server"
import Content from "./Content"

export default async function Navbar() {
  const session = await getSession()

  return (
    <header className="sticky bg-indigo-600 px-12 py-4 shadow-lg shadow-black/60">
      <Content session={session} />
    </header>
  )
}
