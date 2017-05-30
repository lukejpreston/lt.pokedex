module.exports = (db, p) => {
  const pokemonSpeciesCollection = db.getCollection('_pokemon_species')
  const species = pokemonSpeciesCollection.findOne({id: p.species_id})
  return {
    name: species.identifier,
    url: `http://pokeapi.co/api/v2/pokemon-species/${species.id}/`
  }
}
