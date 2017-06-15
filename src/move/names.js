const language = require('../common/language')

module.exports = (db, m) => {
  return db.getCollection('_move_names')
    .find({move_id: m.id})
    .map(mn => {
      return {
        language: language({db, id: mn.local_language_id}),
        name: mn.name
      }
    })
}
