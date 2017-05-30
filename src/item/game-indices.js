module.exports = (db, i) => {
  const itemGameIndicesCollection = db.getCollection('_item_game_indices')
  const generationsCollection = db.getCollection('_generations')
  return itemGameIndicesCollection
    .find({item_id: i.id})
    .map(igi => {
      const generation = generationsCollection.findOne({id: igi.generation_id})

      return {
        game_index: igi.game_index,
        generation: {
          url: `http://pokeapi.co/api/v2/generation/${igi.generation_id}/`,
          name: generation.identifier
        }
      }
    })
}
