const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  return (idName) => {
    const pokemon = db.getCollection('pokemon')

    const byName = pokemon.findOne({ name: idName })
    if (byName) return deLokiClone(byName)

    const byId = pokemon.findOne({ id: parseInt(idName, 10) })
    if (byId) return deLokiClone(byId)

    return null
  }
}
