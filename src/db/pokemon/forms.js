module.exports = (db, p) => {
  const pokemonFormsCollection = db.getCollection('_pokemon_forms')
  return pokemonFormsCollection
    .find({pokemon_id: p.id})
    .map(pf => {
      return {
        url: `http://pokeapi.co/api/v2/pokemon-form/${pf.id}/`,
        name: pf.identifier
      }
    })
}
