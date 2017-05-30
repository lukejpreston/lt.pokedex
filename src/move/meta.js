module.exports = (db, m) => {
  const moveMetaCollection = db.getCollection('_move_meta')
  const moveMetaAilmentsCollection = db.getCollection('_move_meta_ailments')
  const moveMetaCategoriesCollection = db.getCollection('_move_meta_categories')

  const moveMeta = moveMetaCollection.findOne({move_id: m.id})

  if (moveMeta === null) return null

  const moveMetaAilment = moveMetaAilmentsCollection.findOne({id: moveMeta.meta_ailment_id})
  const moveMetaCategory = moveMetaCategoriesCollection.findOne({id: moveMeta.meta_category_id})

  const minTurns = moveMeta.min_turns === '' ? null : moveMeta.min_turns
  const maxTurns = moveMeta.max_turns === '' ? null : moveMeta.max_turns

  const minHits = moveMeta.min_hits === '' ? null : moveMeta.min_hits
  const maxHits = moveMeta.max_hits === '' ? null : moveMeta.max_hits

  return {
    ailment_chance: moveMeta.ailment_chance,
    crit_rate: moveMeta.crit_rate,
    drain: moveMeta.drain,
    flinch_chance: moveMeta.flinch_chance,
    stat_chance: moveMeta.stat_chance,
    healing: moveMeta.healing,
    min_turns: minTurns,
    max_turns: maxTurns,
    min_hits: minHits,
    max_hits: maxHits,
    ailment: {
      url: `http://pokeapi.co/api/v2/move-ailment/${moveMetaAilment.id}/`,
      name: moveMetaAilment.identifier
    },
    category: {
      url: `http://pokeapi.co/api/v2/move-category/${moveMetaCategory.id}/`,
      name: moveMetaCategory.identifier
    }
  }
}
