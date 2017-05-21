module.exports = (db, i) => {
  const pokemonItemsCollection = db.getCollection('_pokemon_items')
  const pokemonCollection = db.getCollection('_pokemon')
  const versionsCollection = db.getCollection('_versions')

  let heldByPokemon = {}

  pokemonItemsCollection
    .find({item_id: i.id})
    .forEach(pi => {
      heldByPokemon[pi.pokemon_id] = heldByPokemon[pi.pokemon_id] || {}
      heldByPokemon[pi.pokemon_id].version_details = heldByPokemon[pi.pokemon_id].version_details || []

      const version = versionsCollection.findOne({id: pi.version_id})

      heldByPokemon[pi.pokemon_id]
        .version_details
        .push({
          rarity: pi.rarity,
          version: {
            url: `http://pokeapi.co/api/v2/version/${version.id}/`,
            name: version.identifier
          }
        })
    })

  return Object.keys(heldByPokemon).map(pokemonId => {
    const pokemon = pokemonCollection.findOne({id: parseInt(pokemonId, 10)})
    return {
      pokemon: {
        name: pokemon.identifier,
        url: `http://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
      },
      version_details: heldByPokemon[pokemonId].version_details
    }
  })
}
