const { Array, Number, String, Boolean, Null, Unknown, Record, Union, Dictionary } = require('runtypes')

const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

// Scalar Types
const number = Number
const string = String
const binary = String.withConstraint(s => base64Regex.test(s) || 'Must be base64 encoded')
const boolean = Boolean
const nulled = Null

// Document Types
const list = Array(Unknown)
const map = Record().asPartial()

// Set Types
const stringSet = Array(string).withConstrain(a => a.length > 0 || 'Set cannot be empty')
const numberSet = Array(number).withConstrain(a => a.length > 0 || 'Set cannot be empty')
const binarySet = Array(binary).withConstrain(a => a.length > 0 || 'Set cannot be empty')

module.exports = {
  key: Dictionary(string, Union(string, number, binary)).withConstrain(d => [1, 2].includes(Object.keys(d).length) || 'Dynamo key requires 1 or 2 attributes'),
  set: { string: stringSet, number: numberSet, binary: binarySet },
  scalar: { number, string, binary, boolean, nulled },
  document: { list, map }
}
