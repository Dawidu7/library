"use client"

import { cva, VariantProps } from "class-variance-authority"
import clsx from "clsx"
import { forwardRef, useRef } from "react"
import type { ComponentProps } from "react"
import { mergeProps, useButton, useHover, useFocusRing } from "react-aria"
import type { AriaButtonProps } from "react-aria"
import { twMerge } from "tailwind-merge"
import { mergeRefs } from "~/lib/utils"

const variants = cva(
  [
    "rounded-lg px-4 py-2 shadow-xl outline-none transition",
    "ring-offset-2 data-[pressed]:scale-95 data-[focus-visible]:ring-2",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-indigo-500 text-white",
          "data-[hovered]:bg-indigo-600 data-[focus-visible]:ring-indigo-600",
        ],
        destructive: [
          "bg-red-500 text-white",
          "data-[hovered]:bg-red-600 data-[focus-visible]:ring-red-600",
        ],
        plain: "p-0 shadow-none data-[focus-visible]:ring-black",
      },
      disabled: {
        true: "pointer-events-none opacity-60 ring-offset-0 data-[focus-visible]:ring-0",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

interface ButtonProps
  extends AriaButtonProps,
    Omit<
      ComponentProps<"button">,
      "onBlur" | "onFocus" | "onKeyDown" | "onKeyUp" | "disabled"
    >,
    VariantProps<typeof variants> {}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  forwardedRef
) {
  const { children, className, disabled, variant } = props
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps, isPressed } = useButton(props, ref)
  const { hoverProps, isHovered } = useHover(props)
  const { focusProps, isFocusVisible } = useFocusRing(props)

  return (
    <button
      className={twMerge(clsx(variants({ disabled, variant }), className))}
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focus-visible={isFocusVisible || undefined}
      ref={mergeRefs(ref, forwardedRef)}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
    >
      {children}
    </button>
  )
})
