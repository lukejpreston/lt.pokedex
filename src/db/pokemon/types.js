module.exports = (db, p) => {
  const typesCollection = db.getCollection('_types')
  const pokemonTypesCollection = db.getCollection('_pokemon_types')
  const types = pokemonTypesCollection.find({pokemon_id: p.id})
  return types
    .filter(t => t.pokemon_id)
    .map(t => {
      let type = typesCollection.findOne({id: t.type_id})
      return {
        slot: t.slot,
        type: {
          name: type.identifier,
          url: `http://pokeapi.co/api/v2/type/${type.id}/`
        }
      }
    })
}
