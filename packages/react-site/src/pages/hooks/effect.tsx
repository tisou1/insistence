import React, { useState, useEffect , useLayoutEffect} from 'react'

export default function Effect() {
  const [p1, setP1] = useState(1)
  const [p2, setP2] = useState('1')

  useEffect(() => {
    setTimeout(() => {
      setP1(2)
      setP2('2')
    })
  },[])

  useEffect(() => {
    console.log('useEffect')
  })

  return (
    <div>effect</div>
  )
}
