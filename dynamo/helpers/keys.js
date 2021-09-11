const toKey = (key) => key.replace(/(-)|(\.)/g, '_')
const toNameKey = (key) => `#${key.split('.').map(toKey).join('.#')}`
const toValueKey = (key) => `:${toKey(key)}`

const upperFirstLetter = v => v[0].toUpperCase() + v.substring(1)

const toAttributeName = (value) => {
  if (value.includes('-')) {
    return value
      .split('-')
      .map((v, i) => i > 0 ? upperFirstLetter(v) : v)
  }

  return value
}

module.exports = {
  toNameKey,
  toValueKey,
  toAttributeName
}
