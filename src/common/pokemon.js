module.exports = ({db, id}) => {
  const pokemonCollection = db.getCollection('_pokemon')
  const pokemon = pokemonCollection.findOne({id})
  return {
    name: pokemon.identifier,
    url: `http://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
  }
}
