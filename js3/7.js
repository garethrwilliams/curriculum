/*
 * write a map function for objects
 * @param {callback} cb
 * @returns {number}
*/

const solution = () => {
  Object.prototype.map = function (cb, i=0, resultArray=[]) {
      if (Object.keys(this).length === i) return resultArray
      resultArray.push(cb(Object.keys(this)[i], Object.values(this)[i], i))
      return this.map(cb, i+1, resultArray)
  }
}


module.exports = {
  solution
}
