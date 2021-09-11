const UpdateBuilder = require('./dynamo/updateBuilder')

module.exports = { UpdateBuilder }

console.log(
  UpdateBuilder({
    updates: {
      set: [
        ['something.here', 'is this'],
        ['something.also', 'can be this']
      ],
      add: [
        ['stats.updated', 10],
        ['stats.viewed', 5]
      ]
    }
  })
)
