const versionGroup = require('../common/version-groups')

module.exports = (db, m) => {
  return db.getCollection('_machines')
    .find({move_id: m.id})
    .map(ma => {
      return {
        machine: {
          url: `http://pokeapi.co/api/v2/machine/${ma.index}/`
        },
        version_group: versionGroup({db, id: ma.version_group_id})
      }
    })
    .sort((left, right) => {
      if (left.machine.url < right.machine.url) return -1
      if (left.machine.url > right.machine.url) return 1
      return 0
    })
}
