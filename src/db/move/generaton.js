module.exports = (db, m) => {
  const generationsCollection = db.getCollection('_generations')
  const generaton = generationsCollection.findOne({id: m.generation_id})
  return {
    name: generaton.identifier,
    url: `http://pokeapi.co/api/v2/generation/${generaton.id}/`
  }
}
