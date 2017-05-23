const utils = require('../utils')

module.exports = (db, m) => {
  const moveFlavorTextCollection = db.getCollection('_move_flavor_text')
  const languagesCollection = db.getCollection('_languages')
  const versionGroupsCollection = db.getCollection('_version_groups')

  return moveFlavorTextCollection
    .find({move_id: m.id})
    .map(mft => {
      const language = languagesCollection.findOne({id: mft.language_id})
      const versionGroup = versionGroupsCollection.findOne({id: mft.version_group_id})
      return {
        flavor_text: utils.clean(mft.flavor_text),
        language: {
          name: language.identifier,
          url: `http://pokeapi.co/api/v2/language/${language.id}/`
        },
        version_group: {
          url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`,
          name: versionGroup.identifier
        }
      }
    })
}
