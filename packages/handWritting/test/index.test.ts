import { afterEach } from "vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { debounce } from '../debounce'
import { unique, unique2 } from '../quchong'

const mock = vi.fn(() => console.log('executed'))

describe('测试手写函数', () => {
  beforeEach(() => {
    //告诉vitest,我们使用模拟事件
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('防抖函数', () => {
    setInterval(debounce(mock), 100)
    // vi.runAllTimers()
    // expect(mock).toHaveBeenCalledTimes(1)
    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(1)

    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(1)

    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(1)

    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it.only('数组去重函数', () => {
    let arr = [1, 2, 1, 3, 4, 3, 2, 1, 5]
    const expectArr = [1, 2, 3, 4, 5]
    expect(unique(arr)).toEqual(expectArr)
    expect(unique2(arr)).toEqual(expectArr)
  })
})