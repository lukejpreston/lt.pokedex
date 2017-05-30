const base = require('./base')
const attributes = require('./attributes')
const babyTriggerFor = require('./baby-trigger-for')
const category = require('./category')
const effectEntries = require('./effect-entries')
const flavorTextEntries = require('./flavor-text-entries')
const flingEffect = require('./fling-effect')
const gameIndices = require('./game-indices')
const heldByPokemon = require('./held-by-pokemon')
const machines = require('./machines')
const names = require('./names')
const sprites = require('./sprites')
const find = require('../find')

module.exports = (options) => {
  const db = options.db
  let i = find(Object.assign({}, options, {collectionName: '_items'}))

  let item = base(i)
  item.attributes = attributes(db, i)
  item.baby_trigger_for = babyTriggerFor(db, i)
  item.category = category(db, i)
  item.effect_entries = effectEntries(db, i)
  item.flavor_text_entries = flavorTextEntries(db, i)
  item.fling_effect = flingEffect(db, i)
  item.game_indices = gameIndices(db, i)
  item.held_by_pokemon = heldByPokemon(db, i)
  item.names = names(db, i)
  item.machines = machines(db, i)
  item.sprites = sprites(db, i)

  return item
}
