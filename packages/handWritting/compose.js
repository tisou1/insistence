


export function compose(middleware) {
  if(!Array.isArray(middleware)){
    throw new TypeError('Middleware stack must be an array')
  }
  for(let fn of middleware) {
    if(typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!')
    }
  }



  return function(ctx, next){
    let index = -1 
    return dispatch(0)

    function dispatch(i) {
      if(i <= index) Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      //最后执行调用compose时传入的next
      if(i === middleware.length) fn = next
      if(!fn) return Promise.resolve()
      try{
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch(err){
        return Promise.reject(err)
      }

    }
  }
}