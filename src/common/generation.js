module.exports = ({db, id}) => {
  const generationsCollection = db.getCollection('_generations')
  const generation = generationsCollection.findOne({id})
  return {
    url: `http://pokeapi.co/api/v2/generation/${generation.id}/`,
    name: generation.identifier
  }
}
