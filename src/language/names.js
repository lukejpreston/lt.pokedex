module.exports = (db, l) => {
  const languageNamesCollection = db.getCollection('_language_names')
  const languagesCollection = db.getCollection('_languages')

  const names = languageNamesCollection.find({language_id: l.id})

  return names
    .filter(n => n.language_id)
    .map(n => {
      let nl = languagesCollection.findOne({id: n.local_language_id})
      return {
        name: n.name,
        language: {
          name: nl.identifier,
          url: `http://pokeapi.co/api/v2/language/${n.local_language_id}/`
        }
      }
    })
    .sort((left, right) => {
      let leftNum = left.language.url.replace('http://pokeapi.co/api/v2/language/', '').replace('/', '')
      leftNum = parseInt(leftNum, 10)
      let rightNum = right.language.url.replace('http://pokeapi.co/api/v2/language/', '').replace('/', '')
      rightNum = parseInt(rightNum, 10)

      if (leftNum < rightNum) return -1
      if (leftNum > rightNum) return 1
      return 0
    })
}
