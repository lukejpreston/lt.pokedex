const language = require('../common/language')
const versionGroups = require('../common/version-groups')

module.exports = (db, a) => {
  const abilityChangelogCollection = db.getCollection('_ability_changelog')
  const abilityChangelog = abilityChangelogCollection.findOne({ id: a.id })
  if (abilityChangelog === null) return {}

  const abilityChangelogProseCollection = db.getCollection('_ability_changelog_prose')
  const abilityChangelogProse = abilityChangelogProseCollection.find({ability_changelog_id: abilityChangelog.id})

  const effectEntries = abilityChangelogProse.map(acp => {
    return {
      effect: acp.effect,
      language: language({db, id: acp.local_language_id})
    }
  })

  return [{
    version_group: versionGroups({db, id: abilityChangelog.changed_in_version_group_id}),
    effect_entries: effectEntries
  }]
}
