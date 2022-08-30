import { afterEach } from "vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";

import {
  mytypeof,
  flat,
  flat2,
  flat3,
  flat4,
  flat5,
  flat6,
  forEach,
  map,
  filter,
  some,
  every,
  reduce,
  find,
  findIndex
} from '../8-30-js'



describe('一些手写测试', () => {
  it('mytypeof', () => {
    expect(mytypeof([])).toBe('Array')
  })

  it('数组扁平化', () => {
    let arr = [1,[2,3,[4,5]]]
    let expectedArr = [1, 2, 3, 4, 5]
    expect(flat(arr, Infinity)).toEqual(expectedArr)
    expect([...flat2(arr)]).toEqual(expectedArr)
    expect(flat3(arr, Infinity)).toEqual(expectedArr)
    expect(flat4(arr)).toEqual(expectedArr)
    expect(flat5(arr)).toEqual(expectedArr)
    expect(flat6(arr)).toEqual(expectedArr)
  })

  const mock = vi.fn((v) => {
    console.log(v)
    return v + 1
  })

  it('forEach', () => {
    let arr = [1, 2, 3, 4, 5]
    forEach(arr, mock)
    expect(mock).toHaveBeenCalledTimes(5)
  })

  it('map', () => {
    let arr = [1, 2, 3, 4, 5]
    expect(map(arr, mock)).toEqual([2,3,4,5,6])
  })

  
  it('filter', () => {
    let arr = [1, 2, 3, 4, 5]
    expect(filter(arr, (v) => v > 2)).toEqual([3,4,5])
  })

  it('some', () => {
    let arr = [1, 2, 3, 4, 5]
    expect(some(arr, (v) => v > 2)).toEqual(true)
  })

  it('every', () => {
    let arr = [1, 2, 3, 4, 5]
    expect(every(arr, (v) => v > 2)).toEqual(false)
    expect(every(arr, (v) => v >= 1)).toEqual(true)

  })

  it('reduce', () => {
    let arr = [1, 2, 3, 4, 5]
    expect(reduce(arr, (a, b) => a + b)).toMatchInlineSnapshot('15')
    expect(arr.reduce((a, b) => a + b)).toBe(15)
  })

  it('find findIndex', () => {
    let arr = [1, 2, 3, 4, 5]
    expect(find(arr, (a) => a > 2)).toMatchInlineSnapshot('3')
    expect(findIndex(arr,(a) => a > 2)).toBe(2)
  })
})
