const db = require('../db')()

const language = require('./language')
const ability = require('./ability')
const berry = require('./berry')
const pokemon = require('./pokemon')
const item = require('./item')

module.exports = {
  ability: ability(db),
  berry: berry(db),
  berryFirmness () {},
  berryFlavor () {},
  characteristic () {},
  contestEffect () {},
  contestType () {},
  eggGroup () {},
  encounterCondition () {},
  encounterConditionValue () {},
  encounterMethod () {},
  evolutionChain () {},
  evolutionTrigger () {},
  gender () {},
  generation () {},
  growthRate () {},
  item: item(db),
  itemAttribute () {},
  itemCategory () {},
  itemFlingEffect () {},
  itemPocket () {},
  language: language(db),
  location () {},
  locationArea () {},
  machine () {},
  move () {},
  moveAilment () {},
  moveBattleStyle () {},
  moveCategory () {},
  moveDamageClass () {},
  moveLearnMethod () {},
  moveTarget () {},
  nature () {},
  palParkArea () {},
  pokeathlonStat () {},
  pokedex () {},
  pokemon: pokemon(db),
  pokemonColor () {},
  pokemonForm () {},
  pokemonHabitat () {},
  pokemonShape () {},
  pokemonSpecies () {},
  region () {},
  stat () {},
  superContestEffect () {},
  type () {},
  version () {},
  versionGroup () {}
}
