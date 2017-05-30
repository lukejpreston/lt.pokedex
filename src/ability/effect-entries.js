const utils = require('../utils')

module.exports = (db, a) => {
  const abilityProseCollection = db.getCollection('_ability_prose')
  const languagesCollection = db.getCollection('_languages')

  const abilityProse = abilityProseCollection.find({ability_id: a.id})

  return abilityProse.map(ap => {
    let language = languagesCollection.findOne({id: ap.local_language_id})

    return {
      effect: utils.clean(ap.effect),
      short_effect: utils.clean(ap.short_effect),
      language: {
        name: language.identifier,
        url: `http://pokeapi.co/api/v2/language/${language.id}/`
      }
    }
  })
}
