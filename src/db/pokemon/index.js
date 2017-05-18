const base = require('./base')
const forms = require('./forms')
const gameIndices = require('./game-indices')
const heldItems = require('./held-items')
const moves = require('./moves')
const species = require('./species')
const sprites = require('./sprites')
const stats = require('./stats')
const types = require('./types')

module.exports = (db) => {
  const collection = db.addCollection('pokemon')
  const pokemonCollection = db.getCollection('_pokemon')
  pokemonCollection.data
    .filter(p => p.id)
    .forEach(p => {
      let pokemon = base(p)
      pokemon.forms = forms(db, p)
      pokemon.game_indices = gameIndices(db, p)
      pokemon.held_items = heldItems(db, p)
      pokemon.moves = moves(db, p)
      pokemon.species = species(db, p)
      pokemon.sprites = sprites(db, p)
      pokemon.stats = stats(db, p)
      pokemon.types = types(db, p)
      collection.insert(pokemon)
    })
  return collection
}
