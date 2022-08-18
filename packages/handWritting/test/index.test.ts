import { afterEach } from "vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { debounce } from '../debounce'


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
    expect(mock).toHaveBeenCalledTimes(2)
  })
})