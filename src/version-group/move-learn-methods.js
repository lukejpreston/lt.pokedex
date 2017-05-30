module.exports = (db, vg) => {
  const versionGroupPokemonMoveMethodsCollection = db.getCollection('_version_group_pokemon_move_methods')
  const pokemonMoveMethodsCollection = db.getCollection('_pokemon_move_methods')
  return versionGroupPokemonMoveMethodsCollection
    .find({version_group_id: vg.id})
    .map(vgpmm => {
      const pokemonMoveMethod = pokemonMoveMethodsCollection.findOne({id: vgpmm.pokemon_move_method_id})
      return {
        name: pokemonMoveMethod.identifier,
        url: `http://pokeapi.co/api/v2/move-learn-method/${pokemonMoveMethod.id}/`
      }
    })
    .sort((left, right) => {
      if (left.url < right.url) return -1
      if (left.url > right.url) return 1
      return 0
    })
}
