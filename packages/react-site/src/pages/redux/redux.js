

export default function createStore(reducer, preloadedState, enhancer) {

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatch = false

  /**
   * 当dispatching时们我们使用currentListeners的浅拷贝nextListeners作为一个临时的列表.
   * 
   * 这可以预防在订阅和取消订阅产生bug
   */

   function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function getState(){
    if(isDispatch) {
      //正在分发调度
      throw new Error(
      'You may not call store.getState() while the reducer is executing. ' +
      'The reducer has already received the state as an argument. ' +
      'Pass it down from the top reducer instead of reading it from the store.')
    }
    return currentState
  }

  function subscribe(listener) {
    if(typeof listener !== 'function') {
      throw new Error(
        `Expected the listener to be a function. Instead, received: '${kindOf(
          listener
        )}'`
      )
    }

    if(isDispatch) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api/store#subscribelistener for more details.'
      )
    }

    let isSuscribed = true

    ensureCanMutateNextListeners()

    //监听函数,放入数组
    nextListeners.push(listener)

    //返回一个取消订阅的方法
    return function unsubscribe() {
      if(!isSuscribed) {
        return
      }
      if(isDispatch) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api/store#subscribelistener for more details.'
        )
      }

      //取消订阅的标识
      isSuscribed = false

      ensureCanMutateNextListeners()
      const idx = nextListeners.findIndex(v => v === listener)
      nextListeners.splice(idx, 1)
      currentListeners = null
    }
  }

  function dispatch(action) {
    if(isDispatch) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try{
      isDispatch = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatch = false
    }
    
    //遍历执行函数,同事同步nextListeners到currentListeners
    const listeners = (currentListeners = nextListeners)
    for(let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  return {
    dispatch,
    subscribe,
    getState
  }
}