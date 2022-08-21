//发布订阅者模式

export class PubSub{
  events = {}

  //监听事件
  on(type, cb) {
    if(!this.events[type]) {
      this.events[type] = []
    }
    //将构造函数存入
    this.events[type].push(cb)
  }


  //触发事件
  emit(type, ...args){
    if(this.events[type]) {
      this.events[type].forEach(cb => cb(args))
    }
  }


  //取消事件
  off(type, cb) {
    if(this.events[type]) {
      //查找到对应的回调函数位置
      let idx = this.events[type].findIndex(callback => cb === callback)
      //从数组中去掉这个回调函数
      if(idx !== -1) {
        this.events[type].splice(idx, 1)
      }
      
      if(this.events[type].length === 0) {
        Reflect.deleteProperty(this.events, type)//
        // delete this.events[type]
      }
    }
  }

  //取消所有
  offAll(type) {
    if(this.events[type]) {
      Reflect.deleteProperty(this.events, type)//
      // delete this.events[type]
    }
  }
}