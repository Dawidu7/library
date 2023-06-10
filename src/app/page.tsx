import Nav from "./Nav"
import SearchArea from "./SearchArea"
import { getSession } from "~/lib/server"
import db from "~/lib/prisma"

export default async function Home() {
  const isAuthenticated = !!(await getSession())
  const books = await db.book.findMany({
    include: {
      section: true,
      author: true,
    },
  })

  return (
    <div>
      {isAuthenticated && <Nav />}
      <SearchArea books={books} />
    </div>
  )
}
