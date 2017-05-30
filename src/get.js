const deLoki = require('./de-loki-clone')

module.exports = (db, find, name) => {
  const collection = db.addCollection(name)

  return (idOrName) => {
    const isUsingId = typeof idOrName === 'number'
    const isUsingName = typeof idOrName === 'string'

    let thing = {}
    if (typeof idOrName === 'undefined') console.log('get list')
    if (isUsingId) thing = collection.findOne({id: idOrName})
    if (isUsingName) thing = collection.findOne({name: idOrName})

    if (thing === null && isUsingId) {
      thing = find({db, id: idOrName})
      collection.insert(thing)
    }

    return deLoki(thing)
  }
}
