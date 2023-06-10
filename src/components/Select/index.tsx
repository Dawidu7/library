"use client"

import { useRef, useState } from "react"
import { HiddenSelect, useSelect } from "react-aria"
import type { AriaSelectProps } from "react-aria"
import { RxCaretDown, RxCaretUp } from "react-icons/rx"
import { Item, useSelectState } from "react-stately"
import ListBox from "./ListBox"
import Popover from "./Popover"
import { Button } from "~/components"

interface SelectProps<T> extends AriaSelectProps<T> {}

function Select<T extends object>(props: SelectProps<T>) {
  const { label, name, defaultSelectedKey, onSelectionChange } = props
  const ref = useRef<HTMLButtonElement>(null)
  const [value, setValue] = useState(defaultSelectedKey)
  const state = useSelectState({
    ...props,
    onSelectionChange: selected => {
      setValue(selected.toString())

      if (typeof onSelectionChange === "function") {
        onSelectionChange(selected)
      }
    },
  })
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  )
  const width = ref.current?.clientWidth

  return (
    <div className="relative w-full">
      <input type="hidden" name={name} value={value} />
      <label
        className="absolute top-0 translate-y-2 text-sm text-neutral-500 opacity-0 transition duration-250 data-[visible]:translate-y-0 data-[visible]:opacity-100"
        data-visible={!!value || undefined}
        {...labelProps}
      >
        {label}
      </label>
      <HiddenSelect state={state} triggerRef={ref} label={label} name={name} />
      <Button
        className="mt-5 flex w-full items-center justify-between rounded-none border-b border-neutral-400"
        ref={ref}
        variant="plain"
        {...triggerProps}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : `Select ${label || "Option"}`}
        </span>
        {state.isOpen ? <RxCaretUp /> : <RxCaretDown />}
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} width={width}>
          <ListBox state={state} {...menuProps} />
        </Popover>
      )}
    </div>
  )
}

Select.Item = Item

export default Select
