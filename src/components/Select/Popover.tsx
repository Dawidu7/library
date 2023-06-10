"use client"

import { forwardRef, useRef } from "react"
import {
  DIRECTORY_DRAG_TYPE,
  DismissButton,
  Overlay,
  usePopover,
} from "react-aria"
import type { AriaPopoverProps } from "react-aria"
import type { OverlayTriggerState } from "react-stately"
import { mergeRefs } from "~/lib/utils"

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef">, Children {
  state: OverlayTriggerState
  width?: number
}

export default forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  props,
  forwardedRef
) {
  const { state, children, width } = props
  const ref = useRef<HTMLDivElement>(null)
  const popoverRef = (forwardedRef || ref) as React.RefObject<HTMLDivElement>
  const { popoverProps, underlayProps } = usePopover(
    { ...props, popoverRef },
    state
  )

  return (
    <Overlay>
      <div className="fixed inset-0" {...underlayProps} />
      <div
        className="border border-neutral-400 bg-white"
        ref={popoverRef}
        {...popoverProps}
        style={{ ...popoverProps.style, width: `${width}px` }}
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  )
})
