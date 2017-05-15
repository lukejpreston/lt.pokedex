const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  return (idName) => {
    const languages = db.getCollection('languages')

    const byName = languages.where(language => language.names && language.names.name === idName)
    if (byName.length > 0) return deLokiClone(byName[0])

    const byId = languages.findOne({ id: parseInt(idName, 10) })
    if (byId) return deLokiClone(byId)

    return null
  }
}
