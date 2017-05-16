const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  return (idName) => {
    const berry = db.getCollection('berry')

    const byName = berry.findOne({ name: idName })
    if (byName) return deLokiClone(byName)

    const byId = berry.findOne({ id: parseInt(idName, 10) })
    if (byId) return deLokiClone(byId)

    return null
  }
}
