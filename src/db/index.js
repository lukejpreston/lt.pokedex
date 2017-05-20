const Lokijs = require('lokijs')
const list = require('../../data/db.json')
const db = new Lokijs('lt.pokedex')

const ability = require('./ability')
const berry = require('./berry')
const pokemon = require('./pokemon')
const item = require('./item')
const language = require('./language')

module.exports = () => {
  let collections = {}

  list.forEach(item => {
    const name = item.replace('.json', '')
    const data = require(`../../data/${item}`)
    collections[`_${name}`] = db.addCollection(`_${name}`)
    collections[`_${name}`].insert(data)
  })

  let createCollections = {
    ability,
    berry,
    berryFirmnesses () {},
    berryFlavors () {},
    characteristics () {},
    contestTypes () {},
    contestEffects () {},
    eggGroups () {},
    encounterMethods () {},
    encounterConditions () {},
    encounterConditionValues () {},
    evolutionChains () {},
    evolutionTriggers () {},
    generations () {},
    genders () {},
    growthRates () {},
    item,
    itemCategories () {},
    itemAttributes () {},
    itemFlingEffects () {},
    itemPockets () {},
    language,
    locations () {},
    locationAreas () {},
    moves () {},
    moveAilments () {},
    moveBattleStyles () {},
    moveCategories () {},
    moveDamageClasses () {},
    moveLearnMethods () {},
    moveTargets () {},
    natures () {},
    palParkAreas () {},
    pokedexes () {},
    pokemon,
    pokemonColors () {},
    pokemonForms () {},
    pokemonHabitats () {},
    pokemonShapes () {},
    pokemonSpecies () {},
    pokeathlonStats () {},
    regions () {},
    stats () {},
    superContestEffects () {},
    types () {},
    version () {},
    versionGroups () {}
  }

  Object.keys(createCollections).forEach(key => {
    createCollections[key](db)
  })

  return db
}
