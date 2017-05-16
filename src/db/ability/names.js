module.exports = (db, a) => {
  const abilityNamesCollection = db.getCollection('_ability_names')
  const languagesCollection = db.getCollection('_languages')
  const abilityNames = abilityNamesCollection.find({ability_id: a.id})

  return abilityNames.map(an => {
    const language = languagesCollection.findOne({id: an.local_language_id})
    return {
      name: an.name,
      language: {
        name: language.identifier,
        url: `http://pokeapi.co/api/v2/language/${language.id}/`
      }
    }
  })
}
