const versionGroups = require('../common/version-groups')

module.exports = (db, i) => {
  return db.getCollection('_machines')
    .find({item_id: i.id})
    .map(m => {
      return {
        machine: {
          url: `http://pokeapi.co/api/v2/machine/${m.index}/`
        },
        version_group: versionGroups({db, id: m.version_group_id})
      }
    })
}
