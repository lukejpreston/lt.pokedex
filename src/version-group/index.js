const base = require('./base')
const generation = require('./generation')
const moveLearnMethods = require('./move-learn-methods')
const pokedexes = require('./pokedexes')
const regions = require('./regions')
const versions = require('./versions')

module.exports = (db) => {
  const collection = db.addCollection('version-group')
  const versionGroupsCollection = db.getCollection('_version_groups')
  versionGroupsCollection
    .data
    .filter(vg => vg.id)
    .forEach(vg => {
      const versionGroup = base(vg)
      versionGroup.generation = generation(db, vg)
      versionGroup.pokedexes = pokedexes(db, vg)
      versionGroup.regions = regions(db, vg)
      versionGroup.versions = versions(db, vg)
      versionGroup.move_learn_methods = moveLearnMethods(db, vg)
      collection.insert(versionGroup)
    })
  return collection
}
