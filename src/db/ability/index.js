const base = require('./base')
const effectChanges = require('./effect-changes')
const effectEntries = require('./effect-entries')
const flavorTextEntries = require('./flavour-text-entries')
const generation = require('./generation')
const names = require('./names')
const pokemon = require('./pokemon')

module.exports = (db) => {
  const collection = db.addCollection('ability')

  db.getCollection('_abilities').data
    .filter(a => a.id)
    .forEach(a => {
      let ability = base(a)
      ability.effect_changes = effectChanges(db, a)
      ability.effect_entries = effectEntries(db, a)
      ability.flavor_text_entries = flavorTextEntries(db, a)
      ability.generation = generation(db, a)
      ability.names = names(db, a)
      ability.pokemon = pokemon(db, a)
      collection.insert(ability)
    })

  return collection
}
