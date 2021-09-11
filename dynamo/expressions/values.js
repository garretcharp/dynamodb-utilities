const { toValueKey } = require('../helpers/keys')

module.exports = ({
  add = [], set = [], del = [],
  equals = [], contains = []
}) => {
  const attributeValues = {}

    ;[...add, ...set, ...del, ...equals, ...contains].forEach(([key, value]) => {
      attributeValues[toValueKey(key)] = value
    })

  return attributeValues
}
