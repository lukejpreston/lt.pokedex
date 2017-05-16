module.exports = (db, a) => {
  const abilityProseCollection = db.getCollection('_ability_prose')
  const abilityProses = abilityProseCollection.where(an => an.ability_id === a.id && an.local_language_id === '9')
  if (abilityProses.length > 0) {
    return [{
      effect: abilityProses[0].effect,
      short_effect: abilityProses[0].short_effect,
      language: {
        name: 'en',
        url: 'http://pokeapi.co/api/v2/language/9/'
      }
    }]
  }
}
