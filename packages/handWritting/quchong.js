

export function unique(arr) {
  return [...new Set(arr)]
}


export function unique2(arr) {
  return arr.filter((v,i,array) => {
    return array.indexOf(v) === i
  })
}