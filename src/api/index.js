const db = require('../db')()

const language = require('./language')
const ability = require('./ability')
const berry = require('./berry')
const pokemon = require('./pokemon')
const item = require('./item')

module.exports = {
  language: language(db),
  ability: ability(db),
  berry: berry(db),
  pokemon: pokemon(db),
  item: item(db)
}
