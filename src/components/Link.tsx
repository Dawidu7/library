"use client"

import clsx from "clsx"
import { default as NextLink } from "next/link"
import { useRef } from "react"
import type { ComponentProps } from "react"
import { mergeProps, useLink, useHover } from "react-aria"
import type { AriaLinkOptions } from "react-aria"

interface LinkProps
  extends AriaLinkOptions,
    Omit<
      ComponentProps<typeof NextLink>,
      "onBlur" | "onFocus" | "onKeyDown" | "onKeyUp"
    > {}

export default function Link(props: LinkProps) {
  const { children, className, target, href } = props
  const ref = useRef<HTMLAnchorElement>(null)
  const { linkProps } = useLink(props, ref)
  const { isHovered, hoverProps } = useHover(props)

  return (
    <NextLink
      className={clsx(
        "outline-none transition",
        "data-[hovered]:opacity-70",
        className
      )}
      data-hovered={isHovered || undefined}
      href={href}
      target={target}
      {...mergeProps(linkProps, hoverProps)}
    >
      {children}
    </NextLink>
  )
}
