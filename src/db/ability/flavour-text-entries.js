module.exports = (db, a) => {
  const abilityFlavorTextCollection = db.getCollection('_ability_flavor_text')
  const versionGroupsCollection = db.getCollection('_versions')

  const abilityFlavorText = abilityFlavorTextCollection.where(aft => aft.language_id === '9' && aft.ability_id === a.id)
  return abilityFlavorText.map(aft => {
    const versionGroups = versionGroupsCollection.findOne({
      id: aft.version_group_id
    })
    return {
      flavor_text: aft.flavor_text,
      language: {
        name: 'en',
        url: 'http://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: versionGroups.identifier,
        url: `http://pokeapi.co/api/v2/version-group/${versionGroups.id}/`
      }
    }
  })
}
