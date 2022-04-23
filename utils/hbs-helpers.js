module.exports = {
    ifeq(a, b, options) {
       if (a.toString() === b.toString()) {
          return options.fn(this)
       } else {
          return options.inverse(this)
       }
    },
    ifinc(a, b, options) {
       if (a.includes(b)){
          return options.fn(this)
       } else {
          return options.inverse(this)
       }
    }
 }