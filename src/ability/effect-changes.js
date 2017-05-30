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

  const languagesCollection = db.getCollection('_languages')

  const effectEntries = abilityChangelogProse.map(acp => {
    let language = languagesCollection.findOne({id: acp.local_language_id})

    return {
      effect: acp.effect,
      language: {
        name: language.identifier,
        url: `http://pokeapi.co/api/v2/language/${language.id}/`
      }
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
