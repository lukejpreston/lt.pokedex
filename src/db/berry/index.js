// "berries.json",
// "berry_firmness.json",
// "berry_firmness_names.json",
// "berry_flavors.json",

const base = require('./base')
const name = require('./name')

module.exports = (db) => {
  const collection = db.addCollection('berry')

  db.getCollection('_berries').data
    .filter(b => b.id)
    .forEach(b => {
      const berry = base(b)
      berry.name = name(db, b)
      collection.insert(berry)
    })

  return collection
}
