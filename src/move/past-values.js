const utils = require('../utils')
const language = require('../common/language')
const versionGroup = require('../common/version-groups')
const type = require('../common/type')

module.exports = (db, m) => {
  const moveChangelogCollection = db.getCollection('_move_changelog')
  const moveEffectProseCollection = db.getCollection('_move_effect_prose')

  return moveChangelogCollection
    .find({move_id: m.id})
    .map(mc => {
      const effectChance = mc.effect_chance || null
      const power = mc.power || null
      const accuracy = mc.accuracy || null
      const pp = mc.pp || null

      const effectEntries = moveEffectProseCollection
          .find({
            move_effect_id: mc.effect_id
          })
          .filter(mep => mep.move_effect_id)
          .map(mep => {
            return {
              effect: utils.clean(mep.effect),
              short_effect: utils.clean(mep.short_effect),
              language: language({db, id: mep.local_language_id})
            }
          })

      return {
        power: power,
        pp: pp,
        accuracy: accuracy,
        effect_chance: effectChance,
        effect_entries: effectEntries,
        type: type({db, id: mc.type_id}),
        version_group: versionGroup({db, id: mc.changed_in_version_group_id})
      }
    })
}
