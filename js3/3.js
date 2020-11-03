const solution = (arr) => {
    return (obj) => {
        return arr.reduce( (acc, e) => {
            if (obj.hasOwnProperty(e)) {
                acc[e] = obj[e]
            }
            return acc
        }, {})
    }
  }