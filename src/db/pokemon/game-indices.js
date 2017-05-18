module.exports = (db, p) => {
  const pokemonGameIndiciesCollection = db.getCollection('_pokemon_game_indices')
  const pokemonGameIndicies = pokemonGameIndiciesCollection.find({pokemon_id: p.id})
  const versionsCollection = db.getCollection('_versions')

  return pokemonGameIndicies.map(pgi => {
    const version = versionsCollection.findOne({id: pgi.version_id})
    return {
      game_index: pgi.game_index,
      version: {
        url: `http://pokeapi.co/api/v2/version/${pgi.version_id}/`,
        name: version.identifier
      }
    }
  })
}
