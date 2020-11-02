/**
 * takes in 2 integers, create 2d array of objects. First integer represents how many nested arrays within the array. Second integer represents how many objects within each array.
 * solution(4,2)
 * returns:
 * [
    [{x: 0, y: 0}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}],
    [{x: 0, y: 3}, {x: 1, y: 3}],
  ]
 * @param {integer} num1 {integer} num2
 * @return {array} arr
 */

const makeRow = (input, i, j=0, result=[]) => {
  if (j === input) return result
  result.push({x: j, y: i}) 
  return makeRow(input, i, j+1, result)
}

const solution = (num1, num2, i=0, result=[]) => {
  if (num1 === i) return result

  result.push(makeRow(num2, i))
  return solution(num1, num2, i+1, result)
}




module.exports = {
  solution
}
