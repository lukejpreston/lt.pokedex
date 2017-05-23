const utils = require('../utils')

module.exports = (db, m) => {
  const moveEffectProseCollection = db.getCollection('_move_effect_prose')
  const languagesCollection = db.getCollection('_languages')
  return moveEffectProseCollection
    .find({move_effect_id: m.effect_id})
    .map(mep => {
      const language = languagesCollection.findOne({id: mep.local_language_id})

      return {
        effect: utils.clean(mep.effect),
        short_effect: utils.clean(mep.short_effect),
        language: {
          url: `http://pokeapi.co/api/v2/language/${language.id}/`,
          name: language.identifier
        }
      }
    })
}
