import React from 'react'
import createStore from './redux'

const store = createStore(reducer, 0)

function reducer(state: any, action: any) {
  switch(action.type){
    case '+': return state + 1
    case '-': return state - 1
    default: return state
  }
}

store.subscribe(() => {
  console.log('增加', store.getState())
})

export default function Index() {
  
  return (
    <div onClick={() => store.dispatch({type:'+'})}>Index</div>
  )
}
