import Rental from "./Rental"
import db from "~/lib/prisma"

export default async function RentalWrapper() {
  const [books, employers, readers] = await Promise.all([
    db.book.findMany(),
    db.employer.findMany(),
    db.reader.findMany(),
  ])

  return <Rental books={books} employers={employers} readers={readers} />
}
