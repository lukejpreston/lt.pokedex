const generation = require('../common/generation')

module.exports = (db, i) => {
  return db.getCollection('_item_game_indices')
    .find({item_id: i.id})
    .map(igi => {
      return {
        game_index: igi.game_index,
        generation: generation({db, id: igi.generation_id})
      }
    })
}
