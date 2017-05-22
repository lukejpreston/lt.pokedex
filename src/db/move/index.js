const base = require('./base')
const pastValues = require('./past-values')
const stateChanges = require('./stat-changes')
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
      move.past_values = pastValues(db, m)
      move.state_changes = stateChanges(db, m)
      move.super_contest_effect = superContestEffect(db, m)
      move.target = target(db, m)
      move.type = type(db, m)
      collection.insert(move)
    })
  return collection
}
