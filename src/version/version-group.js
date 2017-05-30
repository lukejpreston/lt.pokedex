module.exports = (db, v) => {
  const versionGroupsCollection = db.getCollection('_version_groups')
  const versionGroup = versionGroupsCollection.findOne({id: v.version_group_id})
  return {
    url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`,
    name: versionGroup.identifier
  }
}
