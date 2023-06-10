"use client"

import clsx from "clsx"
import { forwardRef, useRef } from "react"
import type { Node } from "@react-types/shared"
import { useListBox, useOption } from "react-aria"
import type { AriaListBoxOptions } from "react-aria"
import type { ListState } from "react-stately"

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  state: ListState<unknown>
}

interface OptionProps {
  item: Node<unknown>
  state: ListState<unknown>
}

export default forwardRef<HTMLUListElement, ListBoxProps>(function ListBox(
  props,
  forwardedRef
) {
  const { state } = props
  const ref = useRef<HTMLUListElement>(null)
  const listBoxRef = (forwardedRef || ref) as React.RefObject<HTMLUListElement>
  const { listBoxProps } = useListBox(props, state, listBoxRef)

  return (
    <ul ref={listBoxRef} {...listBoxProps}>
      {/* @ts-expect-error */}
      {[...state.collection].map(item => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  )
})

function Option({ item, state }: OptionProps) {
  const ref = useRef<HTMLLIElement>(null)
  const { optionProps, isDisabled, isFocused, isSelected } = useOption(
    { key: item.key },
    state,
    ref
  )

  return (
    <li
      className={clsx(
        "px-2",
        isFocused && "cursor-pointer bg-indigo-500 text-white outline-none"
      )}
      ref={ref}
      {...optionProps}
    >
      {item.rendered}
    </li>
  )
}
