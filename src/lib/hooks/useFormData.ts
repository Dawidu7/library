"use client"

import { useState } from "react"

type Value = string | [string, any]

interface FormData {
  [name: string]: {
    data: unknown
    error: boolean
  }
}

interface Checks {
  [name: string]: (value: string) => boolean
}

export default function useFormData(...values: Value[]) {
  const [formData, setFormData] = useState<FormData>(
    values.reduce((acc, curr) => {
      if (typeof curr === "string") {
        return {
          ...acc,
          [curr]: {
            data: "",
            error: false,
          },
        }
      }

      return {
        ...acc,
        [curr[0]]: {
          data: curr[1],
          error: false,
        },
      }
    }, {})
  )

  function updateFormData(form: HTMLFormElement, checks: Checks) {
    return Array.from(form.querySelectorAll("input"))
      .map(({ name, value }) => {
        if (!Object.keys(formData).includes(name)) return

        const isInvalid = Object.keys(checks).includes(name)
          ? checks[name](value)
          : value.length === 0

        setFormData(prevData => ({
          ...prevData,
          [name]: {
            data: value,
            error: isInvalid,
          },
        }))

        return isInvalid
      })
      .some(result => result === true)
  }

  return { formData, setFormData, updateFormData }
}
