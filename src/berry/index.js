const base = require('./base')
const name = require('./name')
const firmness = require('./firmness')
const flavors = require('./flavors')
const item = require('./item')
const natualGiftType = require('./natural-gift-type')
const find = require('../find')

module.exports = (options) => {
  const db = options.db
  let b = find(Object.assign({}, options, {collectionName: '_berries'}))

  const berry = base(b)
  berry.name = name(db, b)
  berry.firmness = firmness(db, b)
  berry.flavors = flavors(db, b)
  berry.item = item(db, b)
  berry.natural_gift_type = natualGiftType(db, b)

  return berry
}
