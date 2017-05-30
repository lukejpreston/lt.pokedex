module.exports = (db, i) => {
  if (i.fling_effect_id === '') return null

  const itemFlingEffectsCollection = db.getCollection('_item_fling_effects')
  const itemFlingEffect = itemFlingEffectsCollection.findOne({id: i.fling_effect_id})

  return {
    url: `http://pokeapi.co/api/v2/item-fling-effect/${itemFlingEffect.id}/`,
    name: itemFlingEffect.name
  }
}
