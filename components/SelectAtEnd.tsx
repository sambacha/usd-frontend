import { Input, InputProps } from 'baseui/input'
import React from 'react'
import { Option, Select, Value } from 'baseui/select'
import { useStyletron } from 'baseui'

export function SelectAtEnd({
  options,
  inputValue,
  onInputChange,
  onSelectChange,
  selectValue,
  id,
  ...props
}: {
  options: Option[]
  inputValue: string
  onInputChange?: (v: string) => any
  onSelectChange: (v: Value) => any
  selectValue: Value
  id: string
} & InputProps) {
  const [css] = useStyletron()
  return (
    <div className={css({ display: 'flex' })}>
      <Input {...props} onChange={(e) => onInputChange?.(e.currentTarget.value)} value={inputValue} id={id} />
      <div className={css({ width: '200px', paddingLeft: '8px' })}>
        <Select
          required
          options={options}
          valueKey="id"
          labelKey="label"
          onChange={({ value }) => onSelectChange(value)}
          value={selectValue}
        />
      </div>
    </div>
  )
}
