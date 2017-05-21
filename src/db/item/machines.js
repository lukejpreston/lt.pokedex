module.exports = (db, i) => {
  const machinesCollection = db.getCollection('_machines')
  const versionGroupsCollection = db.getCollection('_version_groups')

  return machinesCollection
    .find({item_id: i.id})
    .map(m => {
      const versionGroup = versionGroupsCollection.findOne({id: m.version_group_id})

      return {
        machine: {
          url: `http://pokeapi.co/api/v2/machine/${m.index}/`
        },
        version_group: {
          name: versionGroup.identifier,
          url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`
        }
      }
    })
}
