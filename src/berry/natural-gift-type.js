module.exports = (db, b) => {
  const typesCollection = db.getCollection('_types')
  const type = typesCollection.findOne({
    id: b.natural_gift_type_id
  })

  return {
    name: type.identifier,
    url: `http://pokeapi.co/api/v2/type/${type.id}/`
  }
}
