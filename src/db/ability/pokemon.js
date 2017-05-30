const utils = require('../utils')

module.exports = (db, a) => {
  const pokemonAbilitiesCollection = db.getCollection('_pokemon_abilities')
  const pokemonCollection = db.getCollection('_pokemon')

  const pokemonAbilities = pokemonAbilitiesCollection.find({ability_id: a.id})

  const data = pokemonAbilities
    .map(pa => {
      const pokemon = pokemonCollection.findOne({id: pa.pokemon_id})
      return {
        slot: pa.slot,
        is_hidden: pa.is_hidden,
        pokemon: {
          name: pokemon.identifier,
          url: `http://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
        }
      }
    })
  utils.sortAsc(data, 'pokemon', 'pokemon')
  return data
}
