

export default function createStore(reducer, preloadedState, enhancer) {

  //处理中间件

  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
      'createStore(). This is not supported. Instead, compose them ' +
      'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.'
    )
  }

  /**
   * 如果没有传第三个参数,同时第二个参数为函数,则就把第二个参数和第三个参数的值调换
   */

  if(typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if(typeof enhancer !== 'undefined') {
    if(typeof enhancer !== 'function') {
      throw new Error(
        `Expected the enhancer to be a function. Instead, received: '${kindOf(
          enhancer
        )}'`
      )
    }

    return enhancer(createStore)(reducer, preloadedState)
  }


  if(typeof reducer !== 'function') {
    throw new Error(
      `Expected the root reducer to be a function. Instead, received: '${kindOf(
        reducer
      )}'`
    )
  }

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

  function getState() {
    if (isDispatch) {
      //正在分发调度
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
        'The reducer has already received the state as an argument. ' +
        'Pass it down from the top reducer instead of reading it from the store.')
    }
    return currentState
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error(
        `Expected the listener to be a function. Instead, received: '${kindOf(
          listener
        )}'`
      )
    }

    if (isDispatch) {
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
      if (!isSuscribed) {
        return
      }
      if (isDispatch) {
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
    if (isDispatch) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatch = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatch = false
    }

    //遍历执行函数,同事同步nextListeners到currentListeners
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
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