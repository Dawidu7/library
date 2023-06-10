"use client"

import clsx from "clsx"
import { useState } from "react"
import { useFocusWithin } from "react-aria"
import { twMerge } from "tailwind-merge"

export { default as TextField } from "./Text"
export { default as NumberField } from "./Number"

export function getClassNames(className?: string, ...classes: string[]) {
  const inputClass = twMerge(
    clsx(
      "peer w-full border-b border-neutral-400 bg-transparent py-1 outline-none transition",
      "data-[error]:border-red-600 data-[focused]:border-neutral-600",
      className,
      ...classes
    )
  )

  const labelClass = clsx([
    "absolute left-0 top-1 z-10 -translate-y-4 bg-inherit text-sm text-neutral-400 transition-all duration-250",
    "peer-data-[focused]:z-10 peer-data-[focused]:-translate-y-4 peer-data-[focused]:text-sm peer-data-[focused]:text-neutral-600",
    "peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:p-0 peer-placeholder-shown:text-xl",
    "group-data-[error]:text-red-600 peer-data-[error]:text-red-600",
  ])

  return { inputClass, labelClass }
}

export function useFocus() {
  const [isFocused, setFocus] = useState(false)
  const { focusWithinProps } = useFocusWithin({
    onFocusWithin: () => setFocus(true),
    onBlurWithin: () => setFocus(false),
  })

  return { isFocused, focusWithinProps }
}
