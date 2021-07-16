export const submitTx = async (txID: string) => {
  const res = await fetch('/api/send_tx', {
    method: 'POST',
    body: txID
  })

  const json = await res.text()

  return json
}
