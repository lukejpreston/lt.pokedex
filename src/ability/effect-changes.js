const language = require('../common/language')

module.exports = (db, a) => {
  const abilityChangelogCollection = db.getCollection('_ability_changelog')
  const abilityChangelog = abilityChangelogCollection.findOne({ id: a.id })
  if (abilityChangelog === null) return {}

  const versionGroupsCollection = db.getCollection('_version_groups')
  const versionGroup = versionGroupsCollection.findOne({
    id: abilityChangelog.changed_in_version_group_id
  })

  const abilityChangelogProseCollection = db.getCollection('_ability_changelog_prose')
  const abilityChangelogProse = abilityChangelogProseCollection.find({ability_changelog_id: abilityChangelog.id})

  const effectEntries = abilityChangelogProse.map(acp => {
    return {
      effect: acp.effect,
      language: language({db, id: acp.local_language_id})
    }
  })

  return [{
    version_group: {
      name: versionGroup.identifier,
      url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`
    },
    effect_entries: effectEntries
  }]
}
