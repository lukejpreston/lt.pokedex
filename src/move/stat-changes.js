module.exports = (db, m) => {
  const moveMetaStatChangesCollection = db.getCollection('_move_meta_stat_changes')
  const statsCollection = db.getCollection('_stats')
  return moveMetaStatChangesCollection
    .find({move_id: m.id})
    .map(mmsc => {
      const stat = statsCollection.findOne({id: mmsc.stat_id})
      return {
        change: mmsc.change,
        stat: {
          name: stat.identifier,
          url: `http://pokeapi.co/api/v2/stat/${stat.id}/`
        }
      }
    })
}
