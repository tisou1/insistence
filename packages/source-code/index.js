function compose(...funcs) {

  if(funcs.length === 0) {
    return (arg) => arg
  }

  if(funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(
    (a, b) => 
      (...args) => 
        a(b(...args))
  )
}


function a(n) {
  return n + 1
}


function b(n) {
  return n + 2
}

function c(n) {
  return n + 3
}

const fn = compose(a, b, c)

console.log(fn(0))