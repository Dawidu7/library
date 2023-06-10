"use client"

import { forwardRef, useRef } from "react"
import type { ComponentProps } from "react"
import { mergeProps, useLocale, useNumberField } from "react-aria"
import type { AriaNumberFieldProps } from "react-aria"
import { useNumberFieldState } from "react-stately"
import { getClassNames, useFocus } from "."
import Button from "../Button"
import { mergeRefs } from "~/lib/utils"

interface NumberFieldProps
  extends AriaNumberFieldProps,
    Omit<ComponentProps<"input">, InputOmitProps | "step"> {
  label: React.ReactNode
  isError?: boolean
}

export default forwardRef<HTMLDivElement, NumberFieldProps>(function Number(
  props,
  forwardedRef
) {
  const { className, label, isError } = props
  const ref = useRef<HTMLInputElement>(null)
  const { locale } = useLocale()
  const state = useNumberFieldState({ ...props, locale })
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField({ ...props, placeholder: " " }, state, ref)
  const { isFocused, focusWithinProps } = useFocus()
  const { inputClass, labelClass } = getClassNames(className)

  return (
    <div className="relative mt-4" {...groupProps}>
      <input
        className={inputClass}
        data-error={isError || undefined}
        data-focused={isFocused || undefined}
        ref={mergeRefs(ref, forwardedRef)}
        {...mergeProps(inputProps, focusWithinProps)}
      />
      <div className="absolute right-0 top-1 flex gap-1">
        <Button {...decrementButtonProps} className="w-7 px-1 py-0">
          -
        </Button>
        <Button {...incrementButtonProps} className="w-7 px-1 py-0">
          +
        </Button>
      </div>
      <label className={labelClass} {...labelProps}>
        {label}
      </label>
    </div>
  )
})
