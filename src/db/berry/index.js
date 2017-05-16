const base = require('./base')
const name = require('./name')
const firmness = require('./firmness')
const flavors = require('./flavors')
const item = require('./item')
const natualGiftType = require('./natural-gift-type')

module.exports = (db) => {
  const collection = db.addCollection('berry')

  db.getCollection('_berries')
    .data
    .filter(b => b.id)
    .forEach(b => {
      const berry = base(b)
      berry.name = name(db, b)
      berry.firmness = firmness(db, b)
      berry.flavors = flavors(db, b)
      berry.item = item(db, b)
      berry.natural_gift_type = natualGiftType(db, b)
      collection.insert(berry)
    })

  return collection
}
