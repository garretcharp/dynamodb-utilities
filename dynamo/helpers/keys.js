const toKey = (key) => key.replace(/(-)|(\.)/g, '_')
const toNameKey = (key) => `#${key.split('.').map(toKey).join('.#')}`
const toValueKey = (key) => `:${toKey(key)}`

module.exports = {
  toNameKey,
  toValueKey
}
