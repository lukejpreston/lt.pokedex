const base = require('./base')
const names = require('./names')
const versionGroup = require('./version-group')
const find = require('../find')

module.exports = (options) => {
  const db = options.db
  let v = find(Object.assign({}, options, {collectionName: '_versions'}))

  const version = base(v)
  version.names = names(db, v)
  version.version_group = versionGroup(db, v)

  return version
}
