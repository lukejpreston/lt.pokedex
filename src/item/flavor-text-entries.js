const language = require('../common/language')
const versionGroups = require('../common/version-groups')

module.exports = (db, i) => {
  return db.getCollection('_item_flavor_text')
    .find({item_id: i.id})
    .map(ift => {
      return {
        language: language({db, id: ift.language_id}),
        text: String(ift.flavor_text).replace(/"/g, ''),
        version_group: versionGroups({db, id: ift.version_group_id})
      }
    })
}
