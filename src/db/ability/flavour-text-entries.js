const utils = require('../utils')

module.exports = (db, a) => {
  const abilityFlavorTextCollection = db.getCollection('_ability_flavor_text')
  const versionsCollection = db.getCollection('_versions')
  const languagesCollection = db.getCollection('_languages')

  const abilityFlavorText = abilityFlavorTextCollection.find({ability_id: a.id})

  return abilityFlavorText.map(aft => {
    const language = languagesCollection.findOne({id: aft.language_id})

    const versionGroup = versionsCollection.find({version_group_id: aft.version_group_id})
    const name = versionGroup.sort((left, right) => {
      if (left.id < right.id) return -1
      if (left.id > right.id) return 1
      return 0
    }).map(vg => vg.identifier).join('-')

    return {
      flavor_text: utils.stripQuotesAndDoubleSpace(aft.flavor_text),
      language: {
        name: language.identifier,
        url: `http://pokeapi.co/api/v2/language/${language.id}/`
      },
      version_group: {
        name: name,
        url: `http://pokeapi.co/api/v2/version-group/${aft.version_group_id}/`
      }
    }
  })
}
