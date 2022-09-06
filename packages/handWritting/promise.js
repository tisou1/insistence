const PENDING = 'PENDING'
const REJECTED = 'REJECTED'
const RESOLVED = 'RESOLVED'

class MyPromise {
  constructor(executor) {
    //当前promise的状态
    this.status = PENDING
    //成功回调的返回值
    this.value = null
    //失败回调的返回值
    this.reason = null

    //保存onResolve和onReject回调函数,在异步改变状态时,全部调用
    this.onResolveCallback = []

    this.onRejectCallback = []

    try {
      executor(this.#resolve, this.#reject)
    } catch (err) {
      this.#reject(err)
    }
  }

  //私有方法
  #resolve = (value) => {
    //状态由pending变为resolve
    if (this.status === PENDING) {
      setTimeout(() => {
        this.status = RESOLVED
        this.value = value

        //状态改变进行相应的回调
        this.onResolveCallback.forEach((cb) => {
          cb(this.value)
        })
      })
    }
  }

  #reject = (reason) => {
    //状态由pending变为reject
    if (this.status === PENDING) {
      setTimeout(() => {
        this.status = REJECTED
        this.reason = reason

        //失败的回调
        this.onRejectCallback.forEach((cb) => {
          cb(this.reason)
        })
      })

    }
  }

  //then方法
  /**
   * 
   * @param {function} onResolve   成功的回调
   * @param {function} onReject  失败的回调
   */
  then(onResolve, onReject) {
    //如果传入的不是函数,这直接返回
    onResolve = typeof onResolve === 'function' ? onResolve : v => v

    onReject = typeof onReject === 'function' ? onReject : v => { throw v }

    //then的链式调用
    const myPromise2 = new MyPromise((resolve, reject) => {
      //then是微任务,这里使用setTImeout(=宏任务)模拟
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onResolve(this.value)
            //处理返回值
            resolvePromise(x, resolve, reject, myPromise2)
          } catch (e) {
            reject(e)
          }
        }, 0)

      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onReject(this.reason)
            resolvePromise(x, resolve, reject, myPromise2)
          } catch (e) {
            reject(e)
          }
        }, 0)

      } else if (this.status === PENDING) {
        //暂时存放回调函数
        this.onResolveCallback.push(() => {
          try {
            let x = onResolve(this.value)
            resolvePromise(x, resolve, reject, myPromise2)
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectCallback.push(() => {
          try {
            let x = onReject(this.reason)
            resolvePromise(x, resolve, reject, myPromise2)
          } catch (e) {
            reject(e)
          }
        })
      }

      //处理then的链式回调
      const resolvePromise = (x, resolve, reject, promise2) => {

        if (x === promise2) {
          return reject(new TypeError('Chaining cycle detected for promise'))
        }
        //x如果是MyPromise的实例,则使用then方法获取MyPromise的结果
        if (x instanceof MyPromise) {

          if (x.status === PENDING) {
            x.then(
              y => {
                resolvePromise(y, resolve, reject, promise2);
              }, reject)
          } else if (x.status === RESOLVED) {
            resolve(x.value)
          } else if (x.status === REJECTED) {
            reject(x.reason)
          }

        } else if (x && (typeof x === 'function' || typeof x === 'object')) {
          let called = false
          try {
            let then = x.then
            if (typeof then === 'function') {
              then.call(
                x,
                y => {
                  if (called) return
                  called = true
                  resolvePromise(y, resolve, reject, promise2)
                },
                r => {
                  if (called) return
                  called = true
                  reject(r)
                })
            } else {
              resolve(x)
            }
          } catch (e) {
            if (called) return
            called = true
            reject(e)
          }

        } else {
          return resolve(x)
        }
      }

    })


    return myPromise2

  }

}



MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

module.exports = MyPromise;