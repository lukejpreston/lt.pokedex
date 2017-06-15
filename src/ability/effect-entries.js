const utils = require('../utils')
const language = require('../common/language')

module.exports = (db, a) => {
  return db.getCollection('_ability_prose')
    .find({ability_id: a.id})
    .map(ap => {
      return {
        effect: utils.clean(ap.effect),
        short_effect: utils.clean(ap.short_effect),
        language: language({db, id: ap.local_language_id})
      }
    })
}
