import React, { useEffect } from 'react'
import { FormControl } from 'baseui/form-control'
import { Button } from 'baseui/button'
import { PaymentCard, PaymentCardProps } from 'baseui/payment-card'
import { Field, Formik, FormikConfig, useField, useFormik } from 'formik'
import { Block } from 'baseui/block'
import { CreditCardInfo } from '../lib/types'
import { FieldInput } from './FieldInput'
import { CreditCardSchema } from '../lib/schema'

const FullNameInput = () => {
  return <FieldInput name="full_name" type="text" label="Full name" placeholder="John Doe" />
}

const ExpiryInput = () => {
  return (
    <FieldInput
      autoComplete="off"
      placeholder="XX/XX"
      id="card_data.expiryDate"
      name="card_data.expiryDate"
      label="Expiry"
      required
    />
  )
}

const CVCInput = () => {
  return (
    <FieldInput
      pattern="^[0-9]{3,4}$"
      type="text"
      inputMode="numeric"
      placeholder="XXX"
      id="card_data.cvc"
      name="card_data.cvc"
      maxLength={3}
      min={0}
      required
      label="CVC"
    />
  )
}

const CardInput = (props: PaymentCardProps) => {
  const [field, meta] = useField<string>('card_data.card')

  return (
    <FormControl label="Credit card number" error={() => (meta.touched && meta.error ? meta.error : null)}>
      <PaymentCard
        id="card_data.card"
        name="card_data.card"
        type="tel"
        inputMode="numeric"
        pattern="[0-9\s]{13,19}"
        autoComplete="cc-number"
        maxLength={19}
        placeholder="XXXX XXXX XXXX XXXX"
        required
        {...field}
        {...props}
      />
    </FormControl>
  )
}

const CreditCard = ({
  onSubmit,
  initialValues
}: {
  onSubmit: FormikConfig<CreditCardInfo>['onSubmit']
  initialValues: CreditCardInfo
}) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={CreditCardSchema}>
      {({ handleSubmit, ...formik }) => (
        <form onSubmit={handleSubmit}>
          <FullNameInput />
          <CardInput />

          <Block display="flex" flexDirection="row" justifyContent="space-between">
            <Block marginRight="2rem">
              <ExpiryInput />
            </Block>
            <Block width="150px">
              <CVCInput />
            </Block>
          </Block>
          <Button type="submit" disabled={!(formik.isValid && formik.dirty)}>
            Submit information
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default CreditCard
