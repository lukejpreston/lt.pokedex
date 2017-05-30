module.exports = (db, vg) => {
  const generationsCollection = db.getCollection('_generations')
  const generation = generationsCollection.findOne({id: vg.generation_id})
  return {
    name: generation.identifier,
    url: `http://pokeapi.co/api/v2/generation/${generation.id}/`
  }
}
