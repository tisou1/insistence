//节流, 时间戳
function throttle(fn, wait) {
  let preTime = 0
  return function(...args) {
    let nowTime = Date.now()
    let context = this
    
    if(nowTime - preTime > wait) {
      fn.apply(context, args)
      preTime = nowTime
    }
  }
}

//定时器
function throttle2(fn, wait) {
  let timeout

  return function(...args) {
    let context = this
    if(!timeout) {
      timeout = setTimeout(() =>{
        timeout = null
        fn.apply(context, args)
      },wait)
    }
  }
}

export { throttle, throttle2 }