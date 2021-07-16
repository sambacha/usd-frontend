import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import React from 'react'
import { Field, Formik, FormikConfig, useField } from 'formik'
import { PersonalInfoSchema } from '../lib/schema'
import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { Data } from '../lib/types'

const EmailInput = () => {
  const [field, meta] = useField<string>('email')

  return (
    <FormControl label="Your email address" error={meta.touched && meta.error ? meta.error : null}>
      <Input {...field} type="email" placeholder="example@mail.com" required />
    </FormControl>
  )
}

const EthAddressInput = () => {
  const [field, meta] = useField<string>('eth_address')

  return (
    <FormControl label="Your Ethereum address" error={meta.touched && meta.error ? meta.error : null}>
      <Input
        {...field}
        type="text"
        placeholder="0x0000000000000000000000000000000000000000"
        required
        maxLength={42}
        pattern="^(0x){1}[0-9a-fA-F]{40}$"
      />
    </FormControl>
  )
}

export const PersonalInfo = ({
  initialValues,
  onSubmit,
  isLoading
}: {
  onSubmit: FormikConfig<{ eth_address: string; email: string }>['onSubmit']
  initialValues: Data
  isLoading: boolean
}) => {
  return (
    <Formik initialValues={initialValues} validationSchema={PersonalInfoSchema} onSubmit={onSubmit}>
      {({ handleSubmit, isValid }) => (
        <form onSubmit={handleSubmit}>
          <EmailInput />
          <EthAddressInput />
          <Block display="grid">
            <Button type="submit" isLoading={isLoading} disabled={!isValid}>
              Submit transaction
            </Button>
          </Block>
        </form>
      )}
    </Formik>
  )
}
