// Promise.resolve().then(() => {
//   console.log(0);
//   // return Promise.resolve(4);
// }).then((res) => {
//   console.log(res)
//   return 11
// }).then(res => {
//   console.log(res)
// }).then(res => {
//   console.log(22)
// })

// Promise.resolve().then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })


let p2 = new Promise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log(res)
})

//the会返回一个新的promise. 这个新的promise的状态根据 then的回调函数的返回值来决定
/**
1、then方法本身会返回一个新的Promise对象
2、如果返回值是promise对象，返回值为成功，新promise就是成功
3、如果返回值是promise对象，返回值为失败，新promise就是失败
4、如果返回值非promise对象，新promise对象就是成功，值为此返回值 (then中没有return 默认返回值为undefined)
 */


p2.then(res => {
  //这个时候的状态 是由上一个promise来决定的
  console.log(res,p2,"正常")
},err => {
  console.log('出错了',err)
})