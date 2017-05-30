module.exports = (db, p) => {
  const pokemonAbilitiesCollection = db.getCollection('_pokemon_abilities')
  const abilitiesCollection = db.getCollection('_abilities')

  return pokemonAbilitiesCollection
    .find({pokemon_id: p.id})
    .map(pa => {
      const ability = abilitiesCollection.findOne({id: pa.ability_id})
      return {
        ability: {
          url: `http://pokeapi.co/api/v2/ability/${ability.id}/`,
          name: ability.identifier
        },
        slot: pa.slot,
        is_hidden: pa.is_hidden
      }
    })
}
