const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  return (idName) => {
    const language = db.getCollection('language')

    const byName = language.where(language => language.names && language.names.some(n => n.name === idName))
    if (byName.length > 0) return deLokiClone(byName[0])

    const byId = language.findOne({ id: parseInt(idName, 10) })
    if (byId) return deLokiClone(byId)

    return null
  }
}
