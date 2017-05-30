const base = require('./base')
const pokemon = require('./pokemon')
const find = require('../find')

module.exports = (options) => {
  const db = options.db
  let t = find(Object.assign({}, options, {collectionName: '_types'}))

  const type = base(t)
  type.pokemon = pokemon(db, t)

  return type
}
