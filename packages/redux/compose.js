


export default function compose(...funcs) {
  if(funcs.length === 0) {
    return (args) => args
  }

  if(funcs.lengt === 1) {
    return funcs[0]
  }

  //这里的args 其实就相当于 store.dispatch
  /**
   * c1, c2, c3 经过compose([c1, c2, c3])
   * 变为c1(c2(c3(store.dispatch)))
   */
  return funcs.reduce((a, b) => (...args) => a(b(...args)))

}

