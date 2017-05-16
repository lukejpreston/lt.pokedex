const db = require('../db')()

const language = require('./language')
const ability = require('./ability')
const berry = require('./berry')

module.exports = {
  language: language(db),
  ability: ability(db),
  berry: berry(db)
}
