const pokemon = require('../common/pokemon')
const versions = require('../common/versions')

module.exports = (db, i) => {
  const pokemonItemsCollection = db.getCollection('_pokemon_items')
  let heldByPokemon = {}

  pokemonItemsCollection
    .find({item_id: i.id})
    .forEach(pi => {
      heldByPokemon[pi.pokemon_id] = heldByPokemon[pi.pokemon_id] || {}
      heldByPokemon[pi.pokemon_id].version_details = heldByPokemon[pi.pokemon_id].version_details || []

      heldByPokemon[pi.pokemon_id]
        .version_details
        .push({
          rarity: pi.rarity,
          version: versions({db, id: pi.version_id})
        })
    })

  return Object.keys(heldByPokemon).map(pokemonId => {
    return {
      pokemon: pokemon({db, id: parseInt(pokemonId, 10)}),
      version_details: heldByPokemon[pokemonId].version_details
    }
  })
}
