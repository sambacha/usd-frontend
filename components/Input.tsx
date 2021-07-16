import React from 'react'
import { Input as BaseInput, InputProps } from 'baseui/input'
import { useField } from 'formik'
import { FormControl, FormControlProps } from 'baseui/form-control'

export const Input = ({
  label,
  caption,
  disabled,

  ...props
}: InputProps & Pick<FormControlProps, 'disabled' | 'label' | 'caption'>) => {
  const [field, meta] = useField(props.name)

  return (
    <FormControl error={() => (meta.touched && meta.error ? meta.error : null)} {...{ label, caption, disabled }}>
      <Input disabled={disabled} error={!!meta.error} {...field} {...props} />
    </FormControl>
  )
}
