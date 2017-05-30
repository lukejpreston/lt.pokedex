const base = require('./base')
const effectChanges = require('./effect-changes')
const effectEntries = require('./effect-entries')
const flavorTextEntries = require('./flavour-text-entries')
const generation = require('./generation')
const names = require('./names')
const pokemon = require('./pokemon')

module.exports = ({db, id = null, name = null}) => {
  const abilitiesCollection = db.getCollection('_abilities')
  let a = null
  if (id !== null) a = abilitiesCollection.findOne({id})
  if (name !== null) a = abilitiesCollection.findOne({identifier: name})

  let ability = base(a)
  ability.effect_changes = effectChanges(db, a)
  ability.effect_entries = effectEntries(db, a)
  ability.flavor_text_entries = flavorTextEntries(db, a)
  ability.generation = generation(db, a)
  ability.names = names(db, a)
  ability.pokemon = pokemon(db, a)

  return ability
}
