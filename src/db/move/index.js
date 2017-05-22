const base = require('./base')
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
