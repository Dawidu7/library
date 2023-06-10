"use client"

import { useState } from "react"

export default function useMultiForm(forms: JSX.Element[]) {
  const [currentFormIndex, setCurrentFormIndex] = useState(0)

  return {
    currentFormIndex,
    form: forms[currentFormIndex],
    formsLength: forms.length,
    isFirstForm: currentFormIndex === 0,
    isLastForm: currentFormIndex === forms.length - 1,
    next: () => setCurrentFormIndex(i => (i < forms.length - 1 ? i + 1 : i)),
    previous: () => setCurrentFormIndex(i => (i > 0 - 1 ? i - 1 : i)),
  }
}
