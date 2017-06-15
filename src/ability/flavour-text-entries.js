const utils = require('../utils')
const versionGroups = require('../common/version-groups')
const language = require('../common/language')

module.exports = (db, a) => {
  return db.getCollection('_ability_flavor_text')
    .find({ability_id: a.id})
    .map(aft => {
      return {
        flavor_text: utils.clean(aft.flavor_text),
        language: language({db, id: aft.language_id}),
        version_group: versionGroups({db, id: aft.version_group_id})
      }
    })
}
