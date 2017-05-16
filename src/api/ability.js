const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  return (idName) => {
    const ability = db.getCollection('ability')

    const byName = ability.findOne({ name: idName })
    if (byName) return deLokiClone(byName)

    const byId = ability.findOne({ id: parseInt(idName, 10) })
    if (byId) return deLokiClone(byId)

    return null
  }
}
