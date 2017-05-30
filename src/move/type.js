module.exports = (db, m) => {
  const typesCollection = db.getCollection('_types')
  const type = typesCollection.findOne({id: m.type_id})

  return {
    url: `http://pokeapi.co/api/v2/type/${m.type_id}/`,
    name: type.identifier
  }
}
