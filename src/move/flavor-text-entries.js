const utils = require('../utils')
const language = require('../common/language')
const versionGroup = require('../common/version-groups')

module.exports = (db, m) => {
  return db.getCollection('_move_flavor_text')
    .find({move_id: m.id})
    .map(mft => {
      return {
        flavor_text: utils.clean(mft.flavor_text),
        language: language({db, id: mft.language_id}),
        version_group: versionGroup({db, id: mft.version_group_id})
      }
    })
}
