const base = require('./base')
const contestCombos = require('./contest-combos')
const contestEffect = require('./contest-effect')
const contestType = require('./contest-type')
const damageClass = require('./damage-class')
const effectChanges = require('./effect-changes')
const effectEntries = require('./effect-entries')
const flavorTextEntries = require('./flavor-text-entries')
const generation = require('./generaton')
const machines = require('./machines')
const meta = require('./meta')
const names = require('./names')
const pastValues = require('./past-values')
const statChanges = require('./stat-changes')
const superContestEffect = require('./super-contest-effect')
const target = require('./target')
const type = require('./type')

module.exports = (db) => {
  const collection = db.addCollection('move')
  const movesCollection = db.getCollection('_moves')
  movesCollection
    .data
    .filter(m => m.id)
    .forEach(m => {
      let move = base(m)
      move.contest_combos = contestCombos(db, m)
      move.contest_effect = contestEffect(db, m)
      move.contest_type = contestType(db, m)
      move.damage_class = damageClass(db, m)
      move.effect_changes = effectChanges(db, m)
      move.effect_entries = effectEntries(db, m)
      move.flavor_text_entries = flavorTextEntries(db, m)
      move.generation = generation(db, m)
      move.machines = machines(db, m)
      move._meta = meta(db, m)
      move.names = names(db, m)
      move.past_values = pastValues(db, m)
      move.stat_changes = statChanges(db, m)
      move.super_contest_effect = superContestEffect(db, m)
      move.target = target(db, m)
      move.type = type(db, m)
      collection.insert(move)
    })
  return collection
}
