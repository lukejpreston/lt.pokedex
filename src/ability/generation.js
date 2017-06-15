const generation = require('../common/generation')

module.exports = (db, a) => {
  return generation({ db, id: a.generation_id })
}
