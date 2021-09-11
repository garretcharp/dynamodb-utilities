const { toNameKey, toValueKey } = require('../helpers/keys')

const toUpdateExpression = (array, operator = '') => {
  return array.map(([key]) =>
    `${toNameKey(key)} ${operator} ${toValueKey(key)}`
  ).join(', ')
}

module.exports = ({ add = [], set = [], remove = [], del = [] }) => {
  const updateParts = []

  if (add && add.length) {
    updateParts.push(`ADD ${toUpdateExpression(add)}`)
  }

  if (set && set.length) {
    updateParts.push(`SET ${toUpdateExpression(set, '=')}`)
  }

  if (remove && remove.length) {
    updateParts.push(`REMOVE ${remove.map(([key]) => toNameKey(key))}`)
  }

  if (del && del.length) {
    updateParts.push(`DELETE ${toUpdateExpression(del)}`)
  }

  if (updateParts.length === 0) {
    throw new TypeError('You must update the item in some way.')
  }

  return updateParts.join(' ')
}
