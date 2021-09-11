const getUpdateExpression = require('./update')
const getConditionExpression = require('./condition')
const getExpressionAttributeNames = require('./names')
const getExpressionAttributeValues = require('./values')

module.exports = {
  getUpdateExpression,
  getConditionExpression,
  getExpressionAttributeNames,
  getExpressionAttributeValues
}
