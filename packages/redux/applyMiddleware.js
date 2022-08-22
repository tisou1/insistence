import compose from './compose'


export default function appliMiddleware(...middlewares) {
  return (createStore) => (...args) => {//这里args接收创建store需要的reducer和state
    const store = createStore(...args)

    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    /**
     *chain = [c1, c2, c3] 经过compose(...chain)
   *  变为c1(c2(c3(store.dispatch)))
   * 这时候外面使用的dispatch就是包装后的dispatch, 类似koa的洋葱模型
     */
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }

  }
}
