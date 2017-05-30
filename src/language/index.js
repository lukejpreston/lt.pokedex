const base = require('./base')
const names = require('./names')
const find = require('../find')

module.exports = (options) => {
  const db = options.db
  let l = find(Object.assign({}, options, {collectionName: '_languages'}))

  let language = base(l)
  language.names = names(db, l)

  return language
}
