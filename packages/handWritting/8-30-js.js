

//判断数据类型
export function mytypeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

//数组扁平化
export function flat(arr, d = 1){
  return d > 0 
    ? arr.reduce(
      (pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, d - 1) : cur),
      []
    )
    : arr.slice()
}

export function* flat2(arr) {
  for(const item of arr){
    if(Array.isArray(item)) {
      yield* flat2(item)
    } else {
      yield item
    }
  }
}


//forEach会自动跳过空元素
export function flat3(arr, d = 1) {
  const result = [] //缓存递归结果
  //开始递归
  ;(function flat11(arr, d){
    arr.forEach(item => {
      //控制递归深度
      if(Array.isArray(item) && d > 0) {
        //递归数组
        flat11(item, d - 1)
      } else {
        //缓存元素
        result.push(item)
      }
    })
  })(arr,d)

  //返回结果
  return result
}

//stack
export function flat4(arr) {

  const stack = [...arr]
  const res = []

  while(stack.length) {
    const next = stack.pop()
    if(Array.isArray(next)) {
      //展开一层在送到栈中
      stack.push(...next)
    } else {
      res.push(next)
    }
  }

  return res.reverse()
}

export function flat5(arr) {
  //tostring / join会自动扁平化数组
  return arr.toString().split(',').map(v => +v)
}

//使用正则
export function flat6(arr) {
  return JSON.parse(`[${JSON.stringify(arr).replace(/\[|\]/g,'')}]`)
}


//原型链上实现

Array.prototype.forEach1 = function(cb, thisArg) {
  if(this === null) {
    throw new TypeError('this is null or not defined')
  }
  if(typeof this !== 'function') {
    throw new TypeError(cb + 'is not a function');
  }

  //创建一个新的Object对象, 该对象将会包裹传入参数this(当前数组)
  const O = Object(this)
  // O.length >>> 0 无符号右移 0 位
  // 意义：为了保证转换后的值为正整数。
  // 其实底层做了 2 层转换，第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型
  const len = O.length >>> 0
  let k = 0
  while(k < len) {
    if(k in O) {
      cb.call(thisArg, O[k], k, O)
    }
    k++
  }
}

//forEach
export function forEach(arr, cb) {

  const len = arr.length

  for(let i = 0; i < len; i++) {
    cb(arr[i], i, arr)
  }
}
//map
export function map(arr, cb) {
  const res = []
  
  for(let i=0; i< arr.length; i++) {
    res.push(cb(arr[i],i, arr))
  }

  return res
}
//filter
export function filter(arr, cb) {
  const res = []

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if(cb(element, index, arr)) {
      res.push(element)
    }
  }

  return res
}
//some
export function some(array, cb) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(cb(element, index, array)) {
      return true
    }
  }

  return false
}

//every
export function every(array, cb) {

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(!cb(element, index, array)) {
      return false
    }
  }
  return true
}

//reduce
export function reduce(array, cb, initialValue) {
  let result = initialValue || array[0]

  for (let index = initialValue ? 0 : 1; index < array.length; index++) {
    const element = array[index];
    result = cb(result, element, index)
  }

  return result
}

export function find(array, cb) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(cb(element, index, array)) {
      return element
    }
  }
  return undefined
}

export function findIndex(array, cb) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(cb(element, index, array)) {
      return index
    }
  }
  return -1
}