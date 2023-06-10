import Wrapper from "./Wrapper"
import { Navbar } from "~/components"
import "~/globals.css"

export const metadata = {
  title: "Library",
}

export default function RootLayout({ children }: Children) {
  return (
    <html>
      <body className="text-lg">
        <Wrapper>
          <Navbar />
          <main className="mx-auto mt-12 max-w-6xl px-4">{children}</main>
        </Wrapper>
      </body>
    </html>
  )
}
