import { afterEach } from "vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MyPromise } from '../promise'

it('promise check', () => {
  const p = new MyPromise((resolve, reject) => {
    resolve(1)
    console.log('状态改变',p)
  })
})