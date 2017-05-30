const base = require('./base')
const names = require('./names')
const versionGroup = require('./version-group')

module.exports = (db) => {
  const collection = db.addCollection('version')
  const versionsCollection = db.getCollection('_versions')
  versionsCollection
    .data
    .filter(v => v.id)
    .forEach(v => {
      const version = base(v)
      version.names = names(db, v)
      version.version_group = versionGroup(db, v)
      collection.insert(version)
    })
  return collection
}
