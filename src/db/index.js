const Lokijs = require('lokijs')
const list = require('../../data/db.json')
const db = new Lokijs('lt.pokedex')

const ability = require('./ability')
const berry = require('./berry')
const item = require('./item')
const language = require('./language')
const move = require('./move')
const pokemon = require('./pokemon')
const version = require('./version')
const versionGroup = require('./version-group')

module.exports = () => {
  let collections = {}

  list.forEach(item => {
    const name = item.replace('.json', '')
    const data = require(`../../data/${item}`)
    collections[`_${name}`] = db.addCollection(`_${name}`)
    collections[`_${name}`].insert(data)
  })

  const machinesCollection = db.getCollection('_machines')
  machinesCollection.data.forEach((m, index) => {
    m.index = index + 1
    machinesCollection.update(m)
  })

  let createCollections = [
    ability,
    berry,
    'berryFirmness',
    'berryFlavor',
    'characteristic',
    'contestEffect',
    'contestType',
    'eggGroup',
    'encounterCondition',
    'encounterConditionValue',
    'encounterMethod',
    'evolutionChain',
    'evolutionTrigger',
    'gender',
    'generation',
    'growthRate',
    item,
    'itemAttribute',
    'itemCategory',
    'itemFlingEffect',
    'itemPocket',
    language,
    'location',
    'locationArea',
    'machine',
    move,
    'moveAilment',
    'moveBattleStyle',
    'moveCategory',
    'moveDamageClass',
    'moveLearnMethod',
    'moveTarget',
    'nature',
    'palParkArea',
    'pokeathlonStat',
    'pokedex',
    // pokemon, DONE
    'pokemonColor',
    'pokemonForm',
    'pokemonHabitat',
    'pokemonShape',
    'pokemonSpecies',
    'region',
    'stat',
    'superContestEffect',
    'type',
    version,
    versionGroup
  ]

  createCollections.forEach(collection => {
    if (typeof collection !== 'string') collection(db)
  })

  return db
}
