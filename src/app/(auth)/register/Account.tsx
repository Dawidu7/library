import { TextField } from "~/components"
import { FormData } from "./Register"

interface AccountProps extends Partial<FormData> {
  onChange: (
    name: string,
    check?: (value: string) => boolean
  ) => (value: string) => void
}

export default function Account({ email, password, onChange }: AccountProps) {
  return (
    <>
      <TextField
        data-error={email?.error || undefined}
        defaultValue={email?.data}
        label="Email"
        name="email"
        type="email"
        onChange={onChange("email")}
      />
      <TextField
        data-error={password?.error || undefined}
        defaultValue={password?.data}
        label="Password"
        name="password"
        type="password"
        onChange={onChange("password")}
      />
    </>
  )
}
