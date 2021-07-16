export type Data = Partial<{
  cur_out: string
  amount: number
  eth_address: string
  email: string
  phone: string
}>

export type CreditCardInfo = {
  full_name: string
  card_data: {
    card: string
    expiryDate: string
    cvc: string
  }
}
