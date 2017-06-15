const generation = require('../common/generation')

module.exports = (db, m) => {
  return generation({db, id: m.generation_id})
}
