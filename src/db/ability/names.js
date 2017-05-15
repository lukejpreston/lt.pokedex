module.exports = (db, a) => {
  const abilityNamesCollection = db.getCollection('_ability_names')
  const abilityNames = abilityNamesCollection.where(an => an.ability_id === a.id && an.local_language_id === '9')
  return [{
    name: abilityNames[0].name,
    language: {
      name: 'en',
      url: `http://pokeapi.co/api/v2/language/9`
    }
  }]
}
