const base = require('./base')
const names = require('./names')
const find = require('../find')

module.exports = ({db, id = null, name = null}) => {
  let l = find({db, id, name, collectionName: '_languages'})

  let language = base(l)
  language.names = names(db, l)

  return language
}
