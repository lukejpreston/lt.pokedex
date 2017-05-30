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

module.exports = ({db, id = null, name = null}) => {
  const pokemonCollection = db.getCollection('_pokemon')
  let p = null
  if (id !== null) p = pokemonCollection.findOne({id})
  if (name !== null) p = pokemonCollection.findOne({identifier: name})

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
