module.exports = (db, i) => {
  const itemFlavorTextCollection = db.getCollection('_item_flavor_text')
  const languagesCollection = db.getCollection('_languages')
  const versionGroupsCollection = db.getCollection('_version_groups')

  return itemFlavorTextCollection
    .find({item_id: i.id})
    .map(ift => {
      const language = languagesCollection.findOne({id: ift.language_id})
      const versionGroup = versionGroupsCollection.findOne({id: ift.version_group_id})
      return {
        language: {
          url: `http://pokeapi.co/api/v2/language/${language.id}/`,
          name: language.identifier
        },
        text: String(ift.flavor_text).replace(/"/g, ''),
        version_group: {
          url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`,
          name: versionGroup.identifier
        }
      }
    })
}
