import React from 'react'
import {
  useQuery,
  gql
} from '@apollo/client'

const EXCHANGE_RATES = gql`
query info {
  hello
}
`

export default function GraphqlC() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES)
  if(loading) return <p> Loading...</p>
  if(error) return <p>Error...</p>

  console.log(data);
  return (
    <div>{data.hello}</div>
  )
}
