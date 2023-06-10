import { Form, NumberField, Select, TextField } from "~/components"
import type { Position } from "@prisma/client"
import { FormData } from "./Register"

interface AccountProps extends Partial<FormData> {
  positions: Position[]
  onChange: (
    name: string,
    check?: (value: string) => boolean
  ) => (value: any) => void
}

export default function Profile({
  positions,
  onChange,
  name,
  surname,
  position,
  city,
  salary,
}: AccountProps) {
  return (
    <>
      <Form.Group>
        <TextField
          data-error={name?.error || undefined}
          defaultValue={name?.data}
          label="Name"
          name="name"
          onChange={onChange("name")}
        />
        <TextField
          data-error={surname?.error || undefined}
          defaultValue={surname?.data}
          label="Surname"
          name="surname"
          onChange={onChange("surname")}
        />
      </Form.Group>
      <Select
        label="Dział"
        name="position"
        onSelectionChange={onChange("position")}
        defaultSelectedKey={position?.data}
      >
        {positions.map(pos => (
          <Select.Item key={pos.name}>{pos.name}</Select.Item>
        ))}
      </Select>
      <TextField
        data-error={city?.error || undefined}
        defaultValue={city?.data}
        label="City"
        name="city"
        onChange={onChange("city")}
      />
      <NumberField
        data-error={salary?.error || undefined}
        defaultValue={salary?.data || undefined}
        label="Salary"
        minValue={0}
        name="salary"
        onChange={onChange("salary")}
      />
    </>
  )
}
