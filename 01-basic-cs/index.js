'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const topHats = _.chain(database)
  .flatMap('hats')
  .countBy('id')
  .toPairs()
  .orderBy(pair => pair[1], 'desc')
  .take(3)
  .map(pair => pair[1])
  .value()

const total = _.sum(topHats)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
