
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



//promise封装一个ajax请求

function getData(url, type = 'GET') {
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(type, url, true)  //异步,默认就为true

    xhr.onreadystatechange = () => {
      if(xhr.readyState !== 4) return
      if(xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.statusText))
      }
    }

    xhr.onerror = function () {
      reject(new Error(xhr.status))
    }

    //设置响应的数据类型
    xhr.responseType = 'json'
    xhr.setRequestHeader('Accept', 'application/json')
    //发送http请求
    xhr.send()

  })
}

