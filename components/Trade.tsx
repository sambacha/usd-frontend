import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import React, { useEffect } from 'react'
import { Option } from 'baseui/select'
import { Block } from 'baseui/block'
import { useStyletron } from 'baseui'
import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import { Spinner } from 'baseui/spinner'
import { Formik, FormikConfig, useField } from 'formik'
import { useCheckRate, useDebounce } from '../lib/hooks'
import { Button } from 'baseui/button'
import { SelectAtEnd } from './SelectAtEnd'
import { TradeSchema } from '../lib/schema'
import { Data } from '../lib/types'
import { useMemo } from 'react'

const isStablecoin = (coin: any) => ['USDC', 'USDT', 'ETH'].includes(coin.short_name)

const Out = ({
  data,
  values,
  setFieldValue,
  endSelectValue,
  setEndSelectValue
}: {
  data: any
  values: any
  setFieldValue: (field: string, value: any) => void
  endSelectValue: any
  setEndSelectValue: (v: any) => void
}) => {
  useEffect(() => {
    if (values.cur_out === '' && data) {
      const coin = data.find(isStablecoin)
      setEndSelectValue([{ label: coin.short_name, id: coin.cur_id, fee: coin.txfee }])
    }
  }, [data])

  useEffect(() => {
    if (endSelectValue?.[0]) {
      setFieldValue('cur_out', endSelectValue[0].label)
    }
  }, [endSelectValue])

  const debouncedValue = useDebounce({ to: values.cur_out, amount: values.amount }, 1000)

  let { rate } = useCheckRate(debouncedValue)

  return (
    <FormControl label="You get" caption={`Cryptocurrency you get (fee: ${endSelectValue?.[0]?.fee}%)`}>
      <SelectAtEnd
        disabled
        inputValue={rate?.toString()}
        selectValue={endSelectValue}
        onSelectChange={(v) => setEndSelectValue(v as (Option & { fee: number })[])}
        options={data.filter(isStablecoin).map((x) => ({
          label: x.short_name,
          id: x.short_name,
          fee: x.txfee
        }))}
        name="amount_out"
        id="amount_out"
      />
    </FormControl>
  )
}

const AmountIn = () => {
  const [amountField, amountMeta] = useField({
    name: 'amount',
    id: 'amount',
    inputMode: 'numeric',
    type: 'number',
    required: true
  })

  return (
    <FormControl
      error={amountMeta.touched && amountMeta.error ? amountMeta.error : null}
      label="You give"
      caption={`Fiat currency you give`}
    >
      <Input startEnhancer="$" {...amountField} />
    </FormControl>
  )
}

const Trade = ({
  initialValues,
  onSubmit
}: {
  onSubmit: FormikConfig<{ cur_out: string; amount: number }>['onSubmit']
  initialValues: Data
}) => {
  const { data, error } = useSWR('https://indacoin.com/api/mobgetcurrencies/1', fetcher)

  const cachedOption = useMemo(() => {
    if (data && initialValues) {
      const coin = data.find((x) => x.short_name === initialValues.cur_out)
      if (coin)
        return [
          {
            label: coin.short_name,
            id: coin.short_name,
            fee: coin.txfee
          }
        ]
      else return []
    }
  }, [initialValues, data])

  const [endSelectValue, setEndSelectValue] = React.useState<(Option & { fee: number })[]>(cachedOption)

  const [css, theme] = useStyletron()

  if (error) {
    return (
      <Block
        className={css({
          borderColor: theme.colors.borderError,
          boxShadow: theme.lighting.shadow500,
          color: theme.colors.shadowError
        })}
      ></Block>
    )
  }

  if (data) {
    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize={false}
        validationSchema={TradeSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, isValid, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <AmountIn />

            <Out {...{ data, values, setFieldValue, setEndSelectValue, endSelectValue }} />
            <Block display="grid">
              <Button type="submit" disabled={!isValid}>
                Continue
              </Button>
            </Block>
          </form>
        )}
      </Formik>
    )
  }

  return (
    <Block display="flex" justifyContent="center" alignItems="center" height="calc(400px + 23px)">
      <Spinner />
    </Block>
  )
}

export default Trade
