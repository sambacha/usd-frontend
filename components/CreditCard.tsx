import React from 'react'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { PaymentCard } from 'baseui/payment-card'
import { useFormik } from 'formik'
import { Block } from 'baseui/block'

const CreditCard = () => {
  const formik = useFormik({
    initialValues: {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: ''
    },
    onSubmit: (form) => {
      console.log(form)
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Block>
          <FormControl label="Credit card number">
            <PaymentCard
              id="number"
              name="number"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              autoComplete="cc-number"
              maxLength={19}
              placeholder="XXXX XXXX XXXX XXXX"
              onChange={formik.handleChange}
              value={formik.values.number}
              required
            />
          </FormControl>
        </Block>
        <Block display="flex" flexDirection="row" justifyContent="space-between">
          <Block marginRight="2rem">
            <FormControl label="Expiry">
              <Input
                autoComplete="off"
                placeholder="XX/XX"
                id="expiry"
                name="expiry"
                onChange={formik.handleChange}
                value={formik.values.expiry}
                required
              />
            </FormControl>
          </Block>
          <Block width="150px">
            <FormControl label="CVC">
              <Input
                max={999}
                pattern="([0-9]|[0-9]|[0-9])"
                type="number"
                inputMode="numeric"
                placeholder="XXX"
                id="cvc"
                name="cvc"
                maxLength={3}
                onChange={formik.handleChange}
                value={formik.values.cvc}
                required
              />
            </FormControl>
          </Block>
        </Block>

        <Button>Submit</Button>
      </form>
    </>
  )
}

export default CreditCard
