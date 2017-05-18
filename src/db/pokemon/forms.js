module.exports = (db, p) => {
  const pokemonFormsCollection = db.getCollection('_pokemon_forms')
  if (p.id === 12) console.log(pokemonFormsCollection.data[0])
  return pokemonFormsCollection
    .find({pokemon_id: p.id})
    .map(pf => {
      return {
        url: `http://pokeapi.co/api/v2/pokemon-form/${pf.id}/`,
        name: pf.identifier
      }
    })
}
