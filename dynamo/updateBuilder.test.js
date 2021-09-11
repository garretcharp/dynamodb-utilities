const { ValidationError } = require('runtypes')
const UpdateBuilder = require('../dynamo/updateBuilder')

const params = {
  TableName: 'test',
  Key: {
    pk: '123',
    sk: '321'
  }
}

describe('Update Builder', () => {
  describe('Set Values', () => {
    test('it should build update query that sets key value', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            set: [
              ['something', true],
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'SET #something = :something',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something'
        },
        ExpressionAttributeValues: {
          ':something': true
        },
        ...params
      })
    })

    test('it should build update query that sets multiple key values', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            set: [
              ['something', true],
              ['another_thing', 'is this value'],
              ['number', 10]
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'SET #something = :something, #another_thing = :another_thing, #number = :number',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#another_thing': 'another_thing',
          '#number': 'number'
        },
        ExpressionAttributeValues: {
          ':something': true,
          ':another_thing': 'is this value',
          ':number': 10
        },
        ...params
      })
    })

    test('it should build update query that sets nested key value', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            set: [
              ['something.nested', true],
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'SET #something.#nested = :something_nested',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested'
        },
        ExpressionAttributeValues: {
          ':something_nested': true
        },
        ...params
      })
    })

    test('it should build update query that sets multiple nested key values in the same object', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            set: [
              ['something.nested', true],
              ['something.here', 'is this'],
              ['something.updated', 10]
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'SET #something.#nested = :something_nested, #something.#here = :something_here, #something.#updated = :something_updated',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested',
          '#here': 'here',
          '#updated': 'updated'
        },
        ExpressionAttributeValues: {
          ':something_nested': true,
          ':something_here': 'is this',
          ':something_updated': 10
        },
        ...params
      })
    })

    test('it should build update query that sets multiple nested key values in different objects', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            set: [
              ['something.nested', true],
              ['something.here', 'is this'],
              ['object.other', ['is', 'this']],
              ['object.here', { value: true, other: 'thing' }]
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'SET #something.#nested = :something_nested, #something.#here = :something_here, #object.#other = :object_other, #object.#here = :object_here',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested',
          '#here': 'here',
          '#object': 'object',
          '#other': 'other'
        },
        ExpressionAttributeValues: {
          ':something_nested': true,
          ':something_here': 'is this',
          ':object_other': ['is', 'this'],
          ':object_here': { value: true, other: 'thing' }
        },
        ...params
      })
    })

    test('it requires at least one value to set', () => {
      expect(() => {
        UpdateBuilder({
          params,
          updates: {
            set: []
          }
        })
      }).toThrow(TypeError)
    })
  })

  describe('Add Values', () => {
    test('it should build update query that adds a value to a key', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            add: [
              ['something', 5],
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'ADD #something :something',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something'
        },
        ExpressionAttributeValues: {
          ':something': 5
        },
        ...params
      })
    })

    test('it should build update query that adds multiple values to different keys', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            add: [
              ['something', 5],
              ['another_thing', 5],
              ['number', 5]
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'ADD #something :something, #another_thing :another_thing, #number :number',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#another_thing': 'another_thing',
          '#number': 'number'
        },
        ExpressionAttributeValues: {
          ':something': 5,
          ':another_thing': 5,
          ':number': 5
        },
        ...params
      })
    })

    test('it should build update query that adds a value to a nested key', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            add: [
              ['something.nested', 5],
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'ADD #something.#nested :something_nested',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested'
        },
        ExpressionAttributeValues: {
          ':something_nested': 5
        },
        ...params
      })
    })

    test('it should build update query that adds multiple nested key values in the same object', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            add: [
              ['something.nested', 5],
              ['something.here', 5],
              ['something.updated', 5]
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'ADD #something.#nested :something_nested, #something.#here :something_here, #something.#updated :something_updated',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested',
          '#here': 'here',
          '#updated': 'updated'
        },
        ExpressionAttributeValues: {
          ':something_nested': 5,
          ':something_here': 5,
          ':something_updated': 5
        },
        ...params
      })
    })

    test('it should build update query that adds multiple nested key values in different objects', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            add: [
              ['something.nested', 5],
              ['something.here', 5],
              ['object.other', 5],
              ['object.here', 5]
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'ADD #something.#nested :something_nested, #something.#here :something_here, #object.#other :object_other, #object.#here :object_here',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested',
          '#here': 'here',
          '#object': 'object',
          '#other': 'other'
        },
        ExpressionAttributeValues: {
          ':something_nested': 5,
          ':something_here': 5,
          ':object_other': 5,
          ':object_here': 5
        },
        ...params
      })
    })

    test('it requires value to add to be a number', () => {
      expect(() => {
        UpdateBuilder({
          params,
          updates: {
            add: [
              ['something', 'not a number']
            ]
          }
        })
      }).toThrow(ValidationError)
    })

    test('it requires at least one value to add', () => {
      expect(() => {
        UpdateBuilder({
          params,
          updates: {
            add: []
          }
        })
      }).toThrow(TypeError)
    })
  })

  describe('Remove Values', () => {
    test('it should build update query that remove a key', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            remove: [
              ['something'],
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'REMOVE #something',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something'
        },
        ExpressionAttributeValues: {},
        ...params
      })
    })

    test('it should build update query that removes multiple keys', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            remove: [
              ['something'],
              ['another_thing'],
              ['number']
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'REMOVE #something, #another_thing, #number',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#another_thing': 'another_thing',
          '#number': 'number'
        },
        ExpressionAttributeValues: {},
        ...params
      })
    })

    test('it should build update query that removes a nested key', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            remove: [
              ['something.nested'],
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'REMOVE #something.#nested',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested'
        },
        ExpressionAttributeValues: {},
        ...params
      })
    })

    test('it should build update query that removes multiple nested keys from the same object', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            remove: [
              ['something.nested'],
              ['something.here'],
              ['something.updated']
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'REMOVE #something.#nested, #something.#here, #something.#updated',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested',
          '#here': 'here',
          '#updated': 'updated'
        },
        ExpressionAttributeValues: {},
        ...params
      })
    })

    test('it should build update query that removes multiple nested keys from different objects', () => {
      expect(
        UpdateBuilder({
          params,
          updates: {
            remove: [
              ['something.nested'],
              ['something.here'],
              ['object.other'],
              ['object.here']
            ]
          }
        })
      ).toEqual({
        UpdateExpression: 'REMOVE #something.#nested, #something.#here, #object.#other, #object.#here',
        ConditionExpression: undefined,
        ExpressionAttributeNames: {
          '#something': 'something',
          '#nested': 'nested',
          '#here': 'here',
          '#object': 'object',
          '#other': 'other'
        },
        ExpressionAttributeValues: {},
        ...params
      })
    })

    test('it requires at least one value to remove', () => {
      expect(() => {
        UpdateBuilder({
          params,
          updates: {
            remove: []
          }
        })
      }).toThrow(TypeError)
    })
  })
})
