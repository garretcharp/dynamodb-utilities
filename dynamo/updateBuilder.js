const { Array, Dictionary, Record, Tuple, String, Number, Unknown, Union } = require('runtypes')
const { key, set } = require('./helpers/types')
const {
  getUpdateExpression,
  getConditionExpression,
  getExpressionAttributeNames,
  getExpressionAttributeValues
} = require('./expressions')

const StringUnknownTuple = Array(Tuple(String, Unknown)).optional()
const StringTuple = Array(Tuple(String)).optional()

const DynamoUpdate = Record({
  params: Record({ TableName: String, Key: key }).asPartial(),

  updates: Record({
    add: Array(Tuple(String, Union(Number, set.string, set.number))).optional(),
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
