const base = require('./base')
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
      pokemon.species = species(db, p)
      pokemon.sprites = sprites(db, p)
      pokemon.stats = stats(db, p)
      pokemon.types = types(db, p)
      collection.insert(pokemon)
    })
  return collection
}
