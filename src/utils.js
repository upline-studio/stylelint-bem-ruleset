const isString = (val) => typeof val === 'string'
const isRegex = (val) => val instanceof RegExp

const isStringOrRegex = (val) => isString(val) || isRegex(val)


export {isString}
export {isRegex}
export {isStringOrRegex}
