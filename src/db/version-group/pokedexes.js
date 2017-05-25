module.exports = (db, vg) => {
  const pokedexVersionGroupsCollection = db.getCollection('_pokedex_version_groups')
  const pokedexesCollection = db.getCollection('_pokedexes')
  return pokedexVersionGroupsCollection
    .find({version_group_id: vg.id})
    .map(pvg => {
      const pokedex = pokedexesCollection.findOne({id: pvg.pokedex_id})
      return {
        name: pokedex.identifier,
        url: `http://pokeapi.co/api/v2/pokedex/${pokedex.id}/`
      }
    })
}
