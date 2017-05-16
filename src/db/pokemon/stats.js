module.exports = (db, p) => {
  const statsCollection = db.getCollection('_stats')
  const pokemonStatsCollection = db.getCollection('_pokemon_stats')
  const stats = pokemonStatsCollection.find({pokemon_id: p.id})
  return stats
    .filter(s => s.pokemon_id)
    .map(s => {
      const stat = statsCollection.findOne({id: s.stat_id})
      return {
        base_stat: s.base_stat,
        effort: s.effort,
        stat: {
          url: `http://pokeapi.co/api/v2/stat/${s.stat_id}/`,
          name: stat.identifier
        }
      }
    })
}
