"use client"

import { SSRProvider } from "react-aria"

export default function Wrapper({ children }: Children) {
  return <SSRProvider>{children}</SSRProvider>
}
