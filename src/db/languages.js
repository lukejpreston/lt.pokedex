const deLokiClone = require('../de-loki-clone')

module.exports = (db) => {
  const _languages = db.getCollection('_languages')
  const _languagesNames = db.getCollection('_language_names')
  const languages = db.addCollection('languages')

  _languages.data.forEach(language => {
    let newLanguage = deLokiClone(language)

    newLanguage.id = parseInt(newLanguage.id, 10)
    newLanguage.official = newLanguage.official === '1'
    delete newLanguage.order

    let names = _languagesNames.findOne({
      language_id: language.id
    })
    if (names !== null) {
      newLanguage.names = {
        name: names.name,
        language: {
          name: newLanguage.identifier,
          url: `http"//pokeapi.co/api/v2/language/${newLanguage.id}`,
          query: `pokedex.language(${newLanguage.id})`
        }
      }
    }

    if (newLanguage.id) languages.insert(newLanguage)
  })

  return languages
}
