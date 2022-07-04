export function isEqualArraysOfObjs(arrA, arrB) {
  let match = 0
  for (let i = 0; i < arrA.length; i++) {
    for (let j = 0; j < arrB.length; j++) {
      if (JSON.stringify(arrA[i]) === JSON.stringify(arrB[j])) {
        match++
        continue;
      }
    }
  }
  if (match === arrA.length && match === arrB.length) {
    return true
  }
  return false
}