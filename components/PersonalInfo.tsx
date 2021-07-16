import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import React from 'react'
import { Field, Formik, FormikConfig, useField } from 'formik'
import { PersonalInfoSchema } from '../lib/schema'
import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { Data } from '../lib/types'
import { FieldInput } from './FieldInput'

const EmailInput = () => {
  return <FieldInput name="email" label="Your email address" type="email" placeholder="example@mail.com" required />
}

const EthAddressInput = () => {
  return (
    <FieldInput
      name="eth_address"
      label="Your Ethereum address"
      type="text"
      placeholder="0x..."
      required
      maxLength={42}
      pattern="^(0x){1}[0-9a-fA-F]{40}$"
    />
  )
}

const PhoneInput = () => {
  return <FieldInput name="phone" label="Your phone number" type="tel" placeholder="+X XXX XX XX" required />
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
          <PhoneInput />
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
