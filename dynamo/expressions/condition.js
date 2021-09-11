const { toNameKey, toValueKey } = require('../helpers/keys')

const toEqualsExpression = ([key]) => {
  return `${toNameKey(key)} = ${toValueKey(key)})`
}
const toContainsExpression = ([key]) => {
  return `contains(${toNameKey(key)}, ${toValueKey(key)})`
}
const toExistsExpression = ([key]) => {
  return `attribute_exists(${toNameKey(key)})`
}
const toNotExistsExpression = ([key]) => {
  return `attribute_not_exists(${toNameKey(key)})`
}

module.exports = ({ equals = [], contains = [], exists = [], notExists = [] }) => {
  const conditionParts = []

  if (equals && equals.length) {
    conditionParts.push(`(${equals.map(toEqualsExpression).join(' and ')})`)
  }

  if (contains && contains.length) {
    conditionParts.push(`(${contains.map(toContainsExpression).join(' and ')})`)
  }

  if (exists && exists.length) {
    conditionParts.push(`(${exists.map(toExistsExpression).join(' and ')})`)
  }

  if (notExists && notExists.length) {
    conditionParts.push(`(${notExists.map(toNotExistsExpression).join(' and ')})`)
  }

  return conditionParts.length ? conditionParts.join(' AND ') : undefined
}
