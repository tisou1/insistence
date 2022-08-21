export function myInstanceof(target, origin) {
  if(typeof target !== 'object' || target === null) return false
  if(typeof origin !== 'function')
    throw new TypeError('origin必须是一个函数')
  //获取target的直接原型
  let proto = Object.getPrototypeOf(target)
  //顺着原型链往上找
  while(proto) {
    if(proto === origin) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}