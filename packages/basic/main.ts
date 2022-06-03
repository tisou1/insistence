import './index.css'

async function  getName(params: string) {
    const n1 = await 'siry'
    const n2 = await 'tisou1'

    return n2
}

getName('cc').then(res => console.log(res))


/**
 * 
 * await 后面是Promise对象时,返回该对象的结果; 如果不是Promise对象,直接返回其值.
 */
async function  getC() {
  return await 333
  //等同于 return 333
}

getC().then(res => console.log(res))