const utils = require('../utils')
const language = require('../common/language')
const versionGroups = require('../common/version-groups')

module.exports = (db, m) => {
  const moveEffectChangelogCollection = db.getCollection('_move_effect_changelog')
  const moveEffectChangelogProseCollection = db.getCollection('_move_effect_changelog_prose')

  return moveEffectChangelogCollection
    .find({effect_id: m.effect_id})
    .map(mec => {
      const effectEntries = moveEffectChangelogProseCollection
        .find({move_effect_changelog_id: mec.id})
        .map(mecp => {
          return {
            effect: utils.clean(mecp.effect),
            language: language({db, id: mecp.local_language_id})
          }
        })
      return {
        effect_entries: effectEntries,
        version_group: versionGroups({db, id: mec.changed_in_version_group_id})
      }
    })
}
