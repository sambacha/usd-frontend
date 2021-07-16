import { NextApiHandler } from 'next'
import crypto from 'crypto'

const PARTNER_NAME = 'sushiswap'
const SECRET = '240aFd41D38c831'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const txID = req.body

    if (!txID) return res.status(400).send('Missing tx ID')

    const nonce = 1000000
    const string = PARTNER_NAME + '_' + nonce

    const sig = crypto.createHmac('sha256', SECRET).update(string).digest('base64')

    const cfnhash = Buffer.from(sig).toString('base64')

    const getParams = `?partner=${PARTNER_NAME}&transaction_id=${txID}&cnfhash=${cfnhash}=`

    if (!getParams) return res.status(400).send('Missing body')

    const resp = await fetch(`https://indacoin.com/gw/payment_form${getParams}`)

    const json = await resp.text()

    res.send(json)
  } else {
    res.status(405).send('Method Not Allowed')
  }
}

export default handler
