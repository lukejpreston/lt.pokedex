const db = require('../db')()

const languages = require('./languages')
const ability = require('./ability')
const berry = require('./berry')

module.exports = {
  languages: languages(db),
  ability: ability(db),
  berry: berry(db)
}
