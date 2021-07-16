import * as Yup from 'yup'

export const TradeSchema = Yup.object().shape({
  cur_out: Yup.string().required('Required'),
  amount: Yup.number().required('Required')
})

export const PersonalInfoSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  eth_address: Yup.string()
    .matches(/^(0x){1}[0-9a-fA-F]{40}$/i, { message: 'Invalid Ethereum address' })
    .required('Required')
})

export const RequestSchema = Yup.object().concat(TradeSchema).concat(PersonalInfoSchema)
