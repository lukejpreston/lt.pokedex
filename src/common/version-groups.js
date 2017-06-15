
module.exports = ({db, id}) => {
  const versionGroupsCollection = db.getCollection('_version_groups')
  const versionGroup = versionGroupsCollection.findOne({id})

  return {
    name: versionGroup.identifier,
    url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`
  }
}
