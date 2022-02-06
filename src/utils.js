const isString = (val) => typeof val === 'string'
const isRegex = (val) => val instanceof RegExp

const isStringOrRegex = (val) => isString(val) || isRegex(val)


module.exports.isString = isString
module.exports.isRegex = isRegex
module.exports.isStringOrRegex = isStringOrRegex
