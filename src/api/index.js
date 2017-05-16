const db = require('../db')()

const language = require('./language')
const ability = require('./ability')
const berry = require('./berry')
const pokemon = require('./pokemon')

module.exports = {
  language: language(db),
  ability: ability(db),
  berry: berry(db),
  pokemon: pokemon(db)
}
