//观察者模式


//目标者类
 class Subject{
  observers = []  //观察者列表

  add(observer) {
    this.observers.push(observer)
  }

  remove(observer) {
    let idx = this.observers.findIndex(v => v === observer)
    if(idx > -1) {
      this.observers.splice(idx, 1)
    }
  }

  //通知
  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}

//观察者类

 class Observer{
  constructor(name) {
    this.name = name
  }

  update() {
    console.log(`目标通知更新了.我是${this.name}`)
  }
}

//实例化目标者
let subject = new Subject()

//实例化观察者1
let ob1 = new Observer('siry')
let ob2 = new Observer('tisou1')

subject.add(ob1)
subject.add(ob2)


subject.notify()
