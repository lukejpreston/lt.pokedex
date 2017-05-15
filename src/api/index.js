const db = require('../db')()

const languages = require('./languages')
const ability = require('./ability')

module.exports = {
  languages: languages(db),
  ability: ability(db)
}
