const base = require('./base')
const generation = require('./generation')
const moveLearnMethods = require('./move-learn-methods')
const pokedexes = require('./pokedexes')
const regions = require('./regions')
const versions = require('./versions')
const find = require('../find')

module.exports = (options) => {
  const db = options.db
  let vg = find(Object.assign({}, options, {collectionName: '_version_groups'}))

  const versionGroup = base(vg)
  versionGroup.generation = generation(db, vg)
  versionGroup.pokedexes = pokedexes(db, vg)
  versionGroup.regions = regions(db, vg)
  versionGroup.versions = versions(db, vg)
  versionGroup.move_learn_methods = moveLearnMethods(db, vg)

  return versionGroup
}
