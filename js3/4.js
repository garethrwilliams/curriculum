/*
 * 2sum: write a function that takes in an array of numbers and a number, and returns true if any pairs add up to the number.
 * (The numbers in the array is not unique, meaning there may be duplicate numbers)
 * @param {array} arr
 * @param {number} num
 * @returns {boolean}
 */

const solution = (arr, num) => {
    if (arr.length === 0) return false
    const match = (e, arr, num, i=0) => {
        if (i === arr.length) return false
        if (e + arr[i] === num) return true
        return match(e, arr, num, i+1)
    }
    return arr.reduce( (acc, e) => {
        return match(e, arr, num)
    }, '')

  }



module.exports = {
  solution
}
