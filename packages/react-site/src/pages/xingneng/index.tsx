import { verifyDocumentType } from '@apollo/client/react/parser'
import React, { useState, memo } from 'react'

export default function Index() {
  return (
    <Parent />
  )
}

function equal(o, n) {
    console.log(o, n,'.')

    return o === n
}

const Child = memo( () => {  
  console.log('我是子组件')  
  return <p>我是子组件</p>  
})  


function Parent() {  
  const [show,setShow] = useState(true)  
  const info = React.useMemo(() => {
    return {  
      name: 'Even',  
      age: 22  
    }  
  },[])


  const click = React.useCallback(() => {
    () => {
      console.log('click')
    }
  }, [])

  const name = 'siry'
  return(  
      <div>  
          <Child name={info} click={click}/>  
          <button onClick={ () => setShow(!show) }>点击更新状态</button>  
      </div>  
  )  
}  
