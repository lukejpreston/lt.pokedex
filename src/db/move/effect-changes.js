const utils = require('../utils')

// local_language_id

module.exports = (db, m) => {
  const moveEffectChangelogCollection = db.getCollection('_move_effect_changelog')
  const moveEffectChangelogProseCollection = db.getCollection('_move_effect_changelog_prose')
  const versionGroupsCollection = db.getCollection('_version_groups')
  const languagesCollection = db.getCollection('_languages')

  return moveEffectChangelogCollection
    .find({effect_id: m.effect_id})
    .map(mec => {
      const versionGroup = versionGroupsCollection.findOne({id: mec.changed_in_version_group_id})

      const effectEntries = moveEffectChangelogProseCollection
        .find({move_effect_changelog_id: mec.id})
        .map(mecp => {
          const language = languagesCollection.findOne({id: mecp.local_language_id})
          return {
            effect: utils.clean(mecp.effect),
            language: {
              url: `http://pokeapi.co/api/v2/language/${language.id}/`,
              name: language.identifier
            }
          }
        })
      return {
        effect_entries: effectEntries,
        version_group: {
          url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`,
          name: versionGroup.identifier
        }
      }
    })
}
