const find = require('./find')
const deLoki = require('../../de-loki-clone')

module.exports = (db) => {
  const collection = db.addCollection('ability')

  return (idOrName) => {
    const isUsingId = typeof idOrName === 'number'
    const isUsingName = typeof idOrName === 'string'

    let ability = {}
    if (typeof idOrName === 'undefined') console.log('get list')
    if (isUsingId) ability = collection.findOne({id: idOrName})
    if (isUsingName) ability = collection.findOne({name: idOrName})

    if (ability === null && isUsingId) {
      ability = find({db, id: idOrName})
      collection.insert(ability)
    }

    return deLoki(ability)
  }
}
