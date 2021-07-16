import * as Yup from 'yup'
import 'yup-phone'

const cvcRegExp = /^[0-9]{3,4}$/

const ethRegExp = /^(0x){1}[0-9a-fA-F]{40}$/i

export const TradeSchema = Yup.object().shape({
  cur_out: Yup.string().required('Required'),
  amount: Yup.number().required('Required')
})

export const PersonalInfoSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  eth_address: Yup.string().matches(ethRegExp, { message: 'Invalid Ethereum address' }).required('Required'),
  phone: Yup.string().phone().required('Required')
})

export const RequestSchema = Yup.object().concat(TradeSchema).concat(PersonalInfoSchema)

export const CreditCardSchema = Yup.object().shape({
  full_name: Yup.string().required('Required'),
  card_data: Yup.object()
    .shape({
      card: Yup.string()
        .required('Required')
        .matches(/[0-9\s]{13,19}/, { message: 'Invalid credit card number' }),
      expiryDate: Yup.string()
        .required('Required')
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, { message: 'Invalid expiry date' }),
      cvc: Yup.string().required('Required').matches(cvcRegExp, { message: 'Invalid CVC' })
    })
    .required('Required')
})
