module.exports = (db, p) => {
  const pokemonFormsCollection = db.getCollection('_pokemon_forms')
  if (p.id === 12) console.log(pokemonFormsCollection.data[0])
  return []
}
