const { toNameKey } = require('../helpers/keys')

module.exports = ({
  add = [], set = [], remove = [], del = [],
  equals = [], contains = [], exists = [], notExists = []
}) => {
  const attributeNames = {}

  ;[...add, ...set, ...remove, ...del, ...equals, ...contains, ...exists, ...notExists].forEach(([key]) =>
    key.split('.').forEach(part => attributeNames[toNameKey(part)] = part)
  )

  return attributeNames
}
