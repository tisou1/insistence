import React from 'react'
import {
  useQuery,
  gql
} from '@apollo/client'

// const EXCHANGE_RATES = gql`
// query info {
//   hello
// }
// `

const EXCHANGE_RATES = gql`
 query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`

export default function GraphqlC() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES)
  if(loading) return <p> Loading...</p>
  if(error) return <p>Error...</p>

  console.log(data);


  return (
    <div>
     asd
    </div>
  )
}
