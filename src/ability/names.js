const language = require('../common/language')

module.exports = (db, a) => {
  return db.getCollection('_ability_names')
    .find({ability_id: a.id})
    .map(an => {
      return {
        name: an.name,
        language: language({db, id: an.local_language_id})
      }
    })
}
