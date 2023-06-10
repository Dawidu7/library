"use client"

import { forwardRef, useRef } from "react"
import { mergeProps, useTextField } from "react-aria"
import type { ComponentProps } from "react"
import type { AriaTextFieldProps } from "react-aria"
import { useFocus, getClassNames } from "."
import { mergeRefs } from "~/lib/utils"

interface TextProps
  extends AriaTextFieldProps,
    Omit<ComponentProps<"input">, InputOmitProps> {
  label: React.ReactNode
  isError?: boolean
  inputClass?: string
  labelClass?: string
}

export default forwardRef<HTMLDivElement, TextProps>(function Text(
  props,
  forwardedRef
) {
  const { className, label, isError } = props
  const ref = useRef<HTMLInputElement>(null)
  const { inputProps, labelProps } = useTextField(
    {
      ...props,
      placeholder: " ",
    },
    ref
  )
  const { isFocused, focusWithinProps } = useFocus()
  const { inputClass, labelClass } = getClassNames(className)

  return (
    <div className="relative mt-4">
      <input
        className={inputClass}
        data-error={isError || undefined}
        data-focused={isFocused || undefined}
        ref={mergeRefs(ref, forwardedRef)}
        {...mergeProps(inputProps, focusWithinProps)}
      />
      <label className={labelClass} {...labelProps}>
        {label}
      </label>
    </div>
  )
})
