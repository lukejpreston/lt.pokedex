const base = require('./base')
const abilities = require('./abilities')
const forms = require('./forms')
const gameIndices = require('./game-indices')
const heldItems = require('./held-items')
const moves = require('./moves')
const species = require('./species')
const sprites = require('./sprites')
const stats = require('./stats')
const types = require('./types')

const find = require('../find')

module.exports = ({db, id, name}) => {
  let p = find({db, id, name, collectionName: '_pokemon'})

  let pokemon = base(p)
  pokemon.abilities = abilities(db, p)
  pokemon.forms = forms(db, p)
  pokemon.game_indices = gameIndices(db, p)
  pokemon.held_items = heldItems(db, p)
  pokemon.moves = moves(db, p)
  pokemon.species = species(db, p)
  pokemon.sprites = sprites(db, p)
  pokemon.stats = stats(db, p)
  pokemon.types = types(db, p)

  return pokemon
}
