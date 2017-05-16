module.exports = (db, a) => {
  const pokemonAbilitiesCollection = db.getCollection('_pokemon_abilities')
  const pokemonCollection = db.getCollection('_pokemon')

  const pokemonAbilities = pokemonAbilitiesCollection.find({ability_id: a.id})

  return pokemonAbilities
    .map(pa => {
      const pokemon = pokemonCollection.findOne({id: pa.pokemon_id})
      return {
        slot: pa.slot,
        is_hidden: pa.is_hidden,
        pokemon: {
          id: pokemon.id,
          name: pokemon.identifier,
          url: `http://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
        }
      }
    })
    .sort((left, right) => {
      if (left.pokemon.id < right.pokemon.id) return -1
      if (left.pokemon.id > right.pokemon.id) return 1
      return 0
    })
    .map(pa => {
      delete pa.pokemon.id
      return pa
    })
}
