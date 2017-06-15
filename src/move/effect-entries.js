const utils = require('../utils')
const language = require('../common/language')

module.exports = (db, m) => {
  const moveEffectProseCollection = db.getCollection('_move_effect_prose')
  return moveEffectProseCollection
    .find({move_effect_id: m.effect_id})
    .map(mep => {
      return {
        effect: utils.clean(mep.effect),
        short_effect: utils.clean(mep.short_effect),
        language: language({db, id: mep.local_language_id})
      }
    })
}
