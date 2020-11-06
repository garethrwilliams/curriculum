/*
 * Write a function that takes in an object and a number (millieseconds).
 * - You must call each function value of the object {"nVal": (k) => {...}}
 * - {"nVal": (k) => {...When this function runs, k is "nVal"...}}
 * @param {object} obj
 * @param {number} num (millieseconds)
 * @call each function value of the object, millieseconds after each other
*/

const runFun = function (arr, num, i=0) {
  if (arr.length === i) return 
  arr[i]()
  setTimeout( () => {
  return runFun(arr, num, i+1)
  }, num)
}

const solution = (obj, num) => {
   const functions = Object.keys(obj).map( (e) => {
      return () => {
          obj[e](e)
          }
       })
      return runFun(functions, num)
}

module.exports = {
  solution
}
