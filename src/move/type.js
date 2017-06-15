const type = require('../common/type')

module.exports = (db, m) => {
  return type({db, id: m.type_id})
}
