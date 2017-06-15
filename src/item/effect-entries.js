const utils = require('../utils')
const language = require('../common/language')

module.exports = (db, i) => {
  return db.getCollection('_item_prose')
    .find({item_id: i.id})
    .map(ip => {
      return {
        short_effect: utils.clean(ip.short_effect),
        effect: utils.clean(ip.effect),
        language: language({db, id: ip.local_language_id})
      }
    })
}
