const utils = require('../utils')
const pokemon = require('../common/pokemon')

module.exports = (db, a) => {
  const data = db.getCollection('_pokemon_abilities')
    .find({ability_id: a.id})
    .map(pa => {
      return {
        slot: pa.slot,
        is_hidden: pa.is_hidden,
        pokemon: pokemon({db, id: pa.pokemon_id})
      }
    })
  utils.sortAsc(data, 'pokemon', 'pokemon')
  return data
}
