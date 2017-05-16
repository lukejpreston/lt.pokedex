const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  const languagesCollection = db.getCollection('_languages')
  const languagesNamesCollection = db.getCollection('_language_names')
  const language = db.addCollection('language')

  languagesCollection.data.forEach(l => {
    let newLanguage = deLokiClone(l)

    newLanguage.id = parseInt(newLanguage.id, 10)
    newLanguage.official = newLanguage.official === '1'
    delete newLanguage.order

    let names = languagesNamesCollection.findOne({
      language_id: l.id
    })
    if (names !== null) {
      newLanguage.names = [{
        name: names.name,
        language: {
          name: newLanguage.identifier,
          url: `http"//pokeapi.co/api/v2/language/${newLanguage.id}`
        }
      }]
    }

    if (newLanguage.id) language.insert(newLanguage)
  })

  return language
}
