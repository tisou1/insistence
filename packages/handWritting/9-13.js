
/**
 * 
 * 
 * 正则模式上主要有一下三个方法
 * - test  测试字符串, 返回boolean
 * - exec  测试字符串, 返回一直数组
 * 
 * 字符串上使用查找方法
 * - match
 * - matchAll
 * - search
 * - repalce
 * - repalceAll
 * - split
 */


//常用的正则匹配规则

//十六进制颜色
export const regColor = (str) => {
  const regex = /#(0-9a-fA-F){6}|[0-9a-fA-F]{3}/g

  return regex.test(str)
}

//yyyy-mm-dd
export const  regTime = (str) => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g

  return regex.test(str)
}

export const regQQ = (str) => {
  const regex = /^[1-9][0-9]{4,10}$/g

  return regex.test(str)
}


export const regPhone = (str) => {
  const regex = /^1[34578]\d{9}$/g

  return regex.test(str)
}

export const regUsername = (str) => {
  const regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/g

  return regex.test(str)
}