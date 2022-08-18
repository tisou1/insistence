
//防抖
export function debounce(fn, wait = 1000, immediate = true) {
  let timeout

  let debounced =  function() {
    let context = this
    let args = arguments

    if(timeout) clearTimeout(timeout)
    if(immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if(callNow) 
        fn.apply(context, args)
    } else {
      timeout = setTimeout(function(){
        fn.apply(context, args)
      }, wait)
    }
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
