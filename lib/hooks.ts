import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from './fetcher'

export function useDebounce<T = any>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useCheckRate = ({ from = 'USD', to, amount }: { from?: string; to: string; amount: number }) => {
  const { data } = useSWR(
    from && to && amount ? `https://indacoin.com/api/GetCoinConvertAmount/${from}/${to}/${amount}` : null,
    fetcher
  )

  return { rate: data }
}
