
const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// let ani = alice1.animate(aliceTumbling, aliceTiming)
// //promise
// ani.finished
// .then(() => {
//   let ani =  alice2.animate(aliceTumbling, aliceTiming)
//   return ani.finished
// })
// .then(() => {
//   alice3.animate(aliceTumbling, aliceTiming)
// })
// .then(() => {
//   console.log('动画结束')
// })
// .catch(( ) => {
//   console.log('出错了')
// })


async function startAnimation() {
  await alice1.animate(aliceTumbling, aliceTiming).finished
  await alice2.animate(aliceTumbling, aliceTiming).finished
  await alice3.animate(aliceTumbling, aliceTiming).finished
  console.log('动画结束')
}

startAnimation()

//async await

// function startAnimation() {
//   return new Promise((resolve, reject) => {
//     resolve()
//   })
// }