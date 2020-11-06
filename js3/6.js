/*
 * write a function that takes in an array of numbers, and returns a new array of all duplicate numbers
 * @param {array} arr
 * @returns {array}
*/

const solution = (arr) => {
  const duplicates = arr.reduce( (acc, e) => {
       acc[0][e] = (acc[0][e] || 0) + 1
       if (acc[0][e] === 2) {
           acc[1].push(e)
       }
       return acc
   }, [{}, []])
   return duplicates[1]
   }

module.exports = {
  solution
}
