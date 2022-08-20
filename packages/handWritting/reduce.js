

export function reduce(arr, cb, initialValue) {
  let total = initialValue || arr[0]

  for(let i = initialValue ? 0 : 1; i < arr.length; i++) {
    total = cb(total, arr[i], arr)
  }

  return total
}