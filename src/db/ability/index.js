const base = require('./base')
const generation = require('./generation')
const names = require('./names')
const effectEntries = require('./effect-entries')
const effectChanges = require('./effect-changes')
const flavorTextEntries = require('./flavour-text-entries')
const pokemon = require('./pokemon')

module.exports = (db) => {
  const collection = db.addCollection('ability')

  db.getCollection('_abilities').data
    .filter(a => a.id)
    .forEach(a => {
      let ability = base(a)
      ability.generation = generation(db, a)
      ability.names = names(db, a)
      ability.effect_entries = effectEntries(db, a)
      ability.effect_changes = effectChanges(db, a)
      ability.flavor_text_entries = flavorTextEntries(db, a)
      ability.pokemon = pokemon(db, a)
      collection.insert(ability)
    })

  return collection
}
