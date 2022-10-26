

const isObject = (obj) => {
  if(typeof obj === 'object' && obj !== null)
    return true
  else 
    return false
}

function deepClone(obj, hash = new WeakMap()) {
  if(!isObject(obj)) return obj

  //查找是否有obj这个键,有的话直接返回,防止循环引用
  if(hash.has(obj)) return hash.get(obj)  

  let newObj = Array.isArray(obj) ? [] : {}
  //当前的obj对象 的深拷贝结果newObj
  hash.set(obj, newObj)

  //可以读取到symbol类型
  Reflect.ownKeys(obj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key], hash) : obj[key]
  })

  return newObj
}