

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


Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || window

  let fn = Symbol()
  ctx[fn] = this
  //将函数当做ctx(上下文)的方法调用
  let result = ctx[fn](...args)
  //最后再删除该方法
  delete ctx[fn]

  return result
}

Function.prototype.myApply = function(ctx, args) {
  return this.myCall(ctx, ...args)
}

Function.prototype.bind = function(ctx, ...args) {
  let that = this

  const bind = function(){
    return that.call(this instanceof bind ? this : ctx, ...args)
  }

  return bind
}


//new

function myNew(fn, ...args) {
  if(typeof fn !== 'function') {
    throw new TypeError(`${fn.name} is not a function`)
  }

  const newObj = Object.create(fn.prototype)

  const result = fn.apply(newObj, args)

  return (typeof result === 'object' && result !== null) ? result : newObj
}


//函数科里化
function curry(fn, ...args) {

  //返回一个新的函数
  let curried = function(...args2) {
    let allArgs = [...args, ...args2]
    return curry(fn, ...allArgs)
  }

  //利用toString隐式转换的特性, 当最后执行函数时,会隐式转换
  curried.toString = function() {
    return fn(...args)
  }

  return curried
}

function add(...args) {
  return args.reduce((pre, cur) => pre + cur, 0)
}

let addCurry = curry(add)

console.log(addCurry(1)(2,3) == 6)  //这时候会进行隐式调用toString()



//深浅拷贝
/**
 * Object.assign() 
 * 展开运算符
 */

export function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function shallowClone(obj) {
  if(!isObject(obj)) return obj
  let newObj = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj
}


//hash作为一个检查器, 避免对象拷贝中出现循环引用
function deepClone(obj, hash = new WeakMap()) {
  if(!isObject(obj)) return obj
  //检查是否存在相同的对象在之前的拷贝中
  if(hash.has(obj)) return hash.get(obj)

  let newObj = Array.isArray(obj) ? [] : {}
  //设置备份在hash中,
  hash.set(obj, newObj)
  //返回对象自身的所有键,包括symbol键
  Reflect.ownKeys(obj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key], hash) : obj[key]
  })

  return newObj
}


Object.myAssign = function(target, ...source) {
  if(target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  let res = Object(target)
  source.forEach((obj) => {
    if(obj !== null) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          res[key] = obj[key];
        }
      }
    }
  })

  return res
}

Object.myIs = (x, y) => {
  if(x === y) {
    //+0和-0
    //如果x不等于0,直接返回true
    //如果 x === 0，则需要判断+0和-0，则可以直接使用 1/+0 === Infinity 和 1/-0 === -Infinity来进行判断
    return x !== 0 || 1/x === 1/y
  }

  //如果x !== x说明x是NaN
  //x,y同时为NaN返回true
  return x !== x && y !== y
}