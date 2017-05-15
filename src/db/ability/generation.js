module.exports = (db, a) => {
  const generationsCollection = db.getCollection('_generations')
  const generation = generationsCollection.findOne({
    id: String(a.generation_id)
  })
  return {
    name: generation.identifier,
    url: `http://pokeapi.co/api/v2/generation/${generation.id}`
  }
}
