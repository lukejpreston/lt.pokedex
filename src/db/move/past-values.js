const utils = require('../utils')

module.exports = (db, m) => {
  const moveChangelogCollection = db.getCollection('_move_changelog')
  const moveEffectProseCollection = db.getCollection('_move_effect_prose')
  const languagesCollection = db.getCollection('_languages')
  const versionGroupsCollection = db.getCollection('_version_groups')
  const typesCollection = db.getCollection('_types')

  return moveChangelogCollection
    .find({move_id: m.id})
    .map(mc => {
      const effectChance = mc.effect_chance || null
      const power = mc.power || null
      const accuracy = mc.accuracy || null
      const pp = mc.pp || null

      const versionGroup = versionGroupsCollection.findOne({id: mc.changed_in_version_group_id})
      const type = typesCollection.findOne({id: mc.type_id})

      const effectEntries = moveEffectProseCollection
          .find({
            move_effect_id: mc.effect_id
          })
          .filter(mep => mep.move_effect_id)
          .map(mep => {
            const language = languagesCollection.findOne({id: mep.local_language_id})
            return {
              effect: utils.clean(mep.effect),
              short_effect: utils.clean(mep.short_effect),
              language: {
                url: `http://pokeapi.co/api/v2/language/${language.id}/`,
                name: language.identifier
              }
            }
          })

      return {
        power: power,
        pp: pp,
        accuracy: accuracy,
        effect_chance: effectChance,
        effect_entries: effectEntries,
        type: {
          url: `http://pokeapi.co/api/v2/type/${type.id}/`,
          name: type.identifier
        },
        version_group: {
          url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`,
          name: versionGroup.identifier
        }
      }
    })
}
