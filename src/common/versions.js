module.exports = ({db , id}) => {
  const versionsCollection = db.getCollection('_versions')
  const version = versionsCollection.findOne({id})
  return {
    url: `http://pokeapi.co/api/v2/version/${version.id}/`,
    name: version.identifier
  }
}
