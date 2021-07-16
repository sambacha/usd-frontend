import { NextApiHandler } from 'next'
import crypto from 'crypto'
import { RequestSchema } from '../../lib/schema'
import { Data } from '../../lib/types'

const PARTNER_NAME = 'sushiswap'
const SECRET = '240aFd41D38c831'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
    const data = req.body as Data

    try {
      await RequestSchema.validate(data)
    } catch (e) {
      console.error(e)

      return res.status(400).send({ message: e.message, field: e.path })
    }

    const nonce = 1000000
    const string = PARTNER_NAME + '_' + nonce

    const sig = crypto.createHmac('sha256', SECRET).update(string).digest('base64')

    const resp1 = await fetch('https://indacoin.com/api/exgw_createTransaction', {
      method: 'POST',
      body: JSON.stringify({
        user_id: data.email,
        cur_in: 'usd',
        cur_out: data.cur_out,
        target_address: data.eth_address,
        amount_in: data.amount
      }),
      headers: {
        'Content-Type': 'application/json',
        'gw-partner': PARTNER_NAME,
        'gw-nonce': nonce.toString(),
        'gw-sign': sig
      }
    })

    const txID = await resp1.json()

    const addInfo = JSON.stringify({
      cryptoAddress: data.eth_address,
      userId: data.email,
      email: data.email,
      cur_from: 'USD',
      cur_to: data.cur_out,
      'send.amount': data.amount
    })

    const cfnhash = Buffer.from(sig).toString('base64')

    res.status(200).send({
      cfnhash,
      txID
    })
  } else {
    res.status(405).send('Method Not Allowed')
  }
}

export default handler
