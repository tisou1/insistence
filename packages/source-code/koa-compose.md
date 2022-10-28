# koa-compose

源码不长,主要使用了Promise的链式执行,不管中间件是同步还是异步都通过Promise转成异步的链式执行

## 源码
```js
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
      //保证不会多次next()  
      //await next()
      //await next()
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
```

## 测试文件
```js
const compose = require('..')
const assert = require('assert')

function wait (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms || 1))
}

function isPromise (x) {
  return x && typeof x.then === 'function'
}

describe('Koa Compose', function () {
  it('should work', async () => {
    const arr = []
    const stack = []

    stack.push(async (context, next) => {
      arr.push(1)
      await wait(1)
      await next()
      await wait(1)
      arr.push(6)
    })

    stack.push(async (context, next) => {
      arr.push(2)
      await wait(1)
      await next()
      await wait(1)
      arr.push(5)
    })

    stack.push(async (context, next) => {
      arr.push(3)
      await wait(1)
      await next()
      await wait(1)
      arr.push(4)
    })

    await compose(stack)({})
    expect(arr).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]))
  })
```

