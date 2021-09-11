const { toValueKey } = require('../helpers/keys')

module.exports = ({
  add = [], set = [], del = [],
  equals = [], contains = []
}) => {
  const attributeValues = {}

  ;[...add, ...set, ...del, ...equals, ...contains].forEach(([key, value]) => {
    if (attributeValues[toValueKey(key)]) {
      throw new TypeError('Cannot create query, 2 or more values use the same calculated value key')
    }

    attributeValues[toValueKey(key)] = value
  })

  return attributeValues
}
