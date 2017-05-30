const base = require('./base')
const pokemon = require('./pokemon')

module.exports = (db) => {
  const collection = db.addCollection('type')
  db.getCollection('_types')
    .data
    .forEach(t => {
      const type = base(t)
      type.pokemon = pokemon(db, t)
      collection.insert(type)
    })
  return collection
}
