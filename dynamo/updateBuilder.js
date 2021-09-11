const { Array, Dictionary, Record, Tuple, String, Number, Unknown, Union } = require('runtypes')
const {
  getUpdateExpression,
  getConditionExpression,
  getExpressionAttributeNames,
  getExpressionAttributeValues
} = require('./expressions')

const KeyString = String.withConstraint(
  v => !v.includes(' ') || 'Cannot include a space in key value',
  { name: 'KeyValue' }
)
const StringUnknownTuple = Array(Tuple(KeyString, Unknown)).optional()
const StringTuple = Array(Tuple(KeyString)).optional()

const DynamoUpdate = Record({
  params: Record({
    TableName: String,
    Key: Dictionary(KeyString, Union(String, Number))
  }).asPartial(),

  updates: Record({
    add: Array(Tuple(KeyString, Number)).optional(),
    set: StringUnknownTuple,
    remove: StringTuple,
    del: StringUnknownTuple
  }),

  conditions: Record({
    equals: StringUnknownTuple,
    contains: StringUnknownTuple,
    exists: StringTuple,
    notExists: StringTuple
  }).optional()
})

module.exports = (op) => {
  op = DynamoUpdate.check(op)

  const conditions = op.conditions || {}

  return {
    UpdateExpression: getUpdateExpression(op.updates),
    ConditionExpression: getConditionExpression(conditions),
    ExpressionAttributeNames: getExpressionAttributeNames({ ...op.updates, ...conditions }),
    ExpressionAttributeValues: getExpressionAttributeValues({ ...op.updates, ...conditions }),
    ...op.params
  }
}
