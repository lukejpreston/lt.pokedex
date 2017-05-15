const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  return (idName) => {
    const ability = db.getCollection('ability')

    const byName = ability.where(a => a.names && a.names.name === idName)
    if (byName.length > 0) return deLokiClone(byName[0])

    const byId = ability.findOne({ id: parseInt(idName, 10) })
    if (byId) return deLokiClone(byId)

    return null
  }
}
