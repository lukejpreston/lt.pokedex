const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  return (idName) => {
    const collection = db.getCollection('item')

    const byName = collection.findOne({ name: idName })
    if (byName) return deLokiClone(byName)

    const byId = collection.findOne({ id: parseInt(idName, 10) })
    if (byId) return deLokiClone(byId)

    return null
  }
}
