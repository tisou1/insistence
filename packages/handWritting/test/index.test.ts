import { afterEach } from "vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  debounce,
  unique,
  unique2,
  reduce,
  sortArray,
  myInstanceof,
  PubSub
}
  from '../index'

const mock = vi.fn(() => console.log('executed'))

describe('测试手写函数', () => {
  beforeEach(() => {
    //告诉vitest,我们使用模拟时间
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('防抖函数', () => {
    const debounced = debounce(mock, 1000)

    debounced()
    debounced()
    debounced()
    vi.runAllTimers()

    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('数组去重函数', () => {
    let arr = [1, 2, 1, 3, 4, 3, 2, 1, 5]
    const expectArr = [1, 2, 3, 4, 5]
    expect(unique(arr)).toEqual(expectArr)
    expect(unique2(arr)).toEqual(expectArr)
  })

  //reduce
  it('reduce', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(reduce(arr, (a: number, b: number) => a + b)).toBe(15)
  })


  //快速排序
  it('快速排序', () => {
    let arr = [1, 2, 1, 3, 4, 3, 2, 1, 5]
    const expectArr = [1, 1, 1, 2, 2, 3, 3, 4, 5]

    expect(sortArray(arr)).toEqual(expectArr)
  })



  it('myInstanceof check', () => {
    let fn1 = () => { }
    let fn2 = function () { }

    //箭头函数没有原型
    expect(myInstanceof(fn1, Function)).not.toEqual(true)
    expect(myInstanceof(fn2, Function)).not.toEqual(true)

  })


  //发布订阅

  it('发布订阅者模式', () => {
    let p = new PubSub()
    const handleCLick = () => {
      console.log('函数调用')
    }

    const mock = vi.fn(handleCLick)

    p.on('click', mock)
    p.emit('click')
    p.emit('click')

    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledTimes(2)

  })
})