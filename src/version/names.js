module.exports = (db, v) => {
    // local_language_id
  const versionNamesCollection = db.getCollection('_version_names')
  const languagesCollection = db.getCollection('_languages')
  return versionNamesCollection
    .find({version_id: v.id})
    .map(vn => {
      const language = languagesCollection.findOne({id: vn.local_language_id})
      return {
        name: vn.name,
        language: {
          url: `http://pokeapi.co/api/v2/language/${language.id}/`,
          name: language.identifier
        }
      }
    })
    .sort((left, right) => {
      if (left.language.url < right.language.url) return -1
      if (left.language.url > right.language.url) return 1
      return 0
    })
}
