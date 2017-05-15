module.exports = (db, a) => {
  const pokemonAbilitiesCollection = db.getCollection('_pokemon_abilities')
  const pokemonAbilities = pokemonAbilitiesCollection.find({ability_id: String(a.id)})

  const pokemonCollection = db.getCollection('_pokemon')

  return pokemonAbilities.map(pa => {
    const pokemon = pokemonCollection.findOne({
      id: pa.pokemon_id
    })

    return {
      is_hidden: pa.is_hidden === '1',
      slot: parseInt(pa.slot, 10),
      pokemon: {
        name: pokemon.identifier,
        url: `http://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
      }
    }
  })
}
