import Register from "./Register"
import db from "~/lib/prisma"

export default async function RegisterWrapper() {
  const positions = await db.position.findMany()

  return <Register positions={positions} />
}
