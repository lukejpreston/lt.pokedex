const language = require('../common/language')

module.exports = (db, i) => {
  return db.getCollection('_item_names')
    .find({item_id: i.id})
    .map(ina => {
      return {
        name: ina.name,
        language: language({db, id: ina.local_language_id})
      }
    })
}
