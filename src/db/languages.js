const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  const languagesCollection = db.getCollection('_languages')
  const languagesNamesCollection = db.getCollection('_language_names')
  const languages = db.addCollection('languages')

  languagesCollection.data.forEach(language => {
    let newLanguage = deLokiClone(language)

    newLanguage.id = parseInt(newLanguage.id, 10)
    newLanguage.official = newLanguage.official === '1'
    delete newLanguage.order

    let names = languagesNamesCollection.findOne({
      language_id: language.id
    })
    if (names !== null) {
      newLanguage.names = {
        name: names.name,
        language: {
          name: newLanguage.identifier,
          url: `http"//pokeapi.co/api/v2/language/${newLanguage.id}`
        }
      }
    }

    if (newLanguage.id) languages.insert(newLanguage)
  })

  return languages
}
