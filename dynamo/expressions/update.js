const { toNameKey, toValueKey } = require('../helpers/keys')

const toUpdateExpression = (array, operator = '') => {
  return array.map(([key]) =>
    `${toNameKey(key)} ${operator} ${toValueKey(key)}`
  ).join(', ').replace(/  +/g, ' ')
}

module.exports = ({ add = [], set = [], del = [], remove = [] }) => {
  const updateParts = []

  if (add && add.length) {
    updateParts.push(`ADD ${toUpdateExpression(add)}`)
  }

  if (set && set.length) {
    updateParts.push(`SET ${toUpdateExpression(set, '=')}`)
  }

  if (del && del.length) {
    updateParts.push(`DELETE ${toUpdateExpression(del)}`)
  }

  if (remove && remove.length) {
    updateParts.push(`REMOVE ${remove.map(([key]) => toNameKey(key)).join(', ')}`)
  }

  if (updateParts.length === 0) {
    throw new TypeError('You must update the item in some way.')
  }

  return updateParts.join(' ')
}
