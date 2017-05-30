module.exports = (db, m) => {
  const machinesCollection = db.getCollection('_machines')
  const versionGroupsCollection = db.getCollection('_version_groups')
  return machinesCollection
    .find({move_id: m.id})
  .map(ma => {
    const versionGroup = versionGroupsCollection.findOne({id: ma.version_group_id})
    return {
      machine: {
        url: `http://pokeapi.co/api/v2/machine/${ma.index}/`
      },
      version_group: {
        url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`,
        name: versionGroup.identifier
      }
    }
  })
    .sort((left, right) => {
      if (left.machine.url < right.machine.url) return -1
      if (left.machine.url > right.machine.url) return 1
      return 0
    })
}
