import { Children, cloneElement } from "react"
import type { ComponentProps } from "react"

interface FormProps extends ComponentProps<"form"> {}

function Form({ children, ...props }: FormProps) {
  return (
    <form className="flex flex-col" {...props}>
      {children}
    </form>
  )
}

function Group({ children }: Children) {
  return (
    <div className="mt-4 flex gap-2">
      {Children.map(
        children,
        child =>
          child && cloneElement(child as JSX.Element, { className: "flex-1" })
      )}
    </div>
  )
}

Form.Group = Group

export default Form
