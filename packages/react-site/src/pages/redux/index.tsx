import React from 'react'
import { createStore, applyMiddleware, thunk } from 'redux-l'

function logger({ getState }: any) {
  //next就相当于dispatch, applyMiddleware中最左边的函数的next就是原始的dispatch
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)
    console.log(next)
    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

function logger2({ getState }: any) {
  return next => action => {
    console.log('will dispatch 222', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)
    console.log(next)

    console.log('state after dispatch 222', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}





const store = createStore(reducer, 0, applyMiddleware(thunk, logger, logger2))

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

  const addCount = ()=> {
    return { type: '+' }
  }

  const handleClick = () => {
    return dispatch => {
      console.log(dispatch)
      setTimeout(() => {
        console.log('first')

        dispatch(addCount())
      },2000)
    }
  }
  return (
   <>
      <div onClick={() => store.dispatch({type:'+'})}>同步</div>
      <div onClick={() => store.dispatch(handleClick())}>异步</div>
    </>
  )
}
