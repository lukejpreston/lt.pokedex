module.exports = ({db, id}) => {
  const typesCollection = db.getCollection('_types')
  const type = typesCollection.findOne({id})

  return {
    url: `http://pokeapi.co/api/v2/type/${type.id}/`,
    name: type.identifier
  }
}
