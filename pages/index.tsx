import React, { useState } from 'react'
import { Block } from 'baseui/block'
import { Tabs, Tab } from 'baseui/tabs-motion'
import CreditCard from '../components/CreditCard'
import { useStyletron } from 'baseui'
import Trade from '../components/Trade'
import { PersonalInfo } from '../components/PersonalInfo'
import { CreditCardInfo, Data } from '../lib/types'
import { useEffect } from 'react'
import { RequestSchema } from '../lib/schema'
import { submitTx } from '../lib/submitTx'

const PaymentForm = () => {
  const [activeKey, setActiveKey] = useState<React.Key>('0')

  const [css, theme] = useStyletron()

  const [data, setData] = useState<Data>({
    cur_out: '',
    amount: 100
  })

  const [cardInfo, setCardInfo] = useState<CreditCardInfo>({
    full_name: '',
    card_data: {
      card: '',
      cvc: '',
      expiryDate: ''
    }
  })

  const [isLoading, setLoading] = useState(false)

  const [enabledCount, setEnabledCount] = useState(0)

  const [txResponse, setTxResponse] = useState<string>()

  useEffect(() => {
    if (data) {
      RequestSchema.isValid(data).then((isValid) => {
        if (isValid) {
          fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((res) => res.text())
            .then((res) => {
              setLoading(false)
              setTxResponse(res)
            })
        }
      })
    }
  }, [data])

  useEffect(() => {
    if (cardInfo && data && txResponse && enabledCount === 2) {
      submitTx(txResponse).then((json) => console.log(json))
    }
  }, [cardInfo])

  return (
    <Block
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100vw"
    >
      <Block
        as="h1"
        className={css({
          textAlign: 'center',
          ...theme.typography.HeadingSmall,
          fontWeight: 'bold'
        })}
      >
        USDMarkets
      </Block>
      <Block
        height="calc(508px + 2rem)"
        width="461px"
        backgroundColor="white"
        className={css({
          boxShadow: theme.lighting.shadow500
        })}
      >
        <Tabs
          overrides={{
            TabList: {
              style: ({}) => ({
                width: '100%',
                justifyContent: 'space-between'
              })
            }
          }}
          activeKey={activeKey}
          onChange={({ activeKey }) => {
            setActiveKey(activeKey)
          }}
          activateOnFocus
        >
          <Tab
            disabled={enabledCount === 2}
            title="Buy"
            overrides={{
              Tab: {
                style: () => ({
                  width: '33%'
                })
              }
            }}
          >
            <Trade
              initialValues={{
                cur_out: data.cur_out,
                amount: data.amount
              }}
              onSubmit={(form) => {
                setData((d) => ({ ...d, ...form }))
                setActiveKey(1)
                if (enabledCount <= 1 || enabledCount === 2) setEnabledCount(1)
              }}
            />
          </Tab>
          <Tab
            title="Credentials"
            disabled={enabledCount < 1 || enabledCount === 2}
            overrides={{
              Tab: {
                style: () => ({
                  width: '33%'
                })
              }
            }}
          >
            <PersonalInfo
              isLoading={isLoading}
              initialValues={{
                email: data.email,
                eth_address: data.eth_address
              }}
              onSubmit={(form) => {
                setData((d) => ({ ...d, ...form }))

                setActiveKey(2)
                setEnabledCount(2)

                setLoading(true)
              }}
            />
          </Tab>
          <Tab
            title="Credit Card"
            disabled={enabledCount < 2}
            overrides={{
              Tab: {
                style: () => ({
                  width: '33%'
                })
              }
            }}
          >
            <CreditCard
              onSubmit={(form) => {
                setCardInfo(form)
              }}
              initialValues={cardInfo}
            />
          </Tab>
        </Tabs>
      </Block>
    </Block>
  )
}

export default PaymentForm
