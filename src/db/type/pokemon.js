const utils = require('../utils')

module.exports = (db, t) => {
  const pokemonTypesCollection = db.getCollection('_pokemon_types')
  const pokemonCollection = db.getCollection('_pokemon')
  const data = pokemonTypesCollection
    .find({type_id: t.id})
    .map(pt => {
      const pokemon = pokemonCollection.findOne({id: pt.pokemon_id})
      return {
        pokemon: {
          url: `http://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
          name: pokemon.identifier
        },
        slot: pt.slot
      }
    })

  return utils.sortAsc(data, 'pokemon', 'pokemon')
}
