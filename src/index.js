const Lokijs = require('lokijs')
const list = require('../data/db.json')
const db = new Lokijs('lt.pokedex')

const get = require('./get')

const ability = require('./ability')
const berry = require('./berry')
const item = require('./item')
const language = require('./language')
const move = require('./move')
const pokemon = require('./pokemon')
const type = require('./type')
const version = require('./version')
const versionGroup = require('./version-group')

module.exports = () => {
  let collections = {}

  list.forEach(item => {
    const name = item.replace('.json', '')
    const data = require(`../data/${item}`)
    collections[`_${name}`] = db.addCollection(`_${name}`)
    collections[`_${name}`].insert(data)
  })

  const machinesCollection = db.getCollection('_machines')
  machinesCollection.data.forEach((m, index) => {
    m.index = index + 1
    machinesCollection.update(m)
  })

  return {
    ability: get(db, ability, 'ability'),
    berry: get(db, berry, 'berry'),
    // berryFirmness: 'berryFirmness',
    // berryFlavor: 'berryFlavor',
    // characteristic: 'characteristic',
    // contestEffect: 'contestEffect',
    // contestType: 'contestType',
    // eggGroup: 'eggGroup',
    // encounterCondition: 'encounterCondition',
    // encounterConditionValue: 'encounterConditionValue',
    // encounterMethod: 'encounterMethod',
    // evolutionChain: 'evolutionChain',
    // evolutionTrigger: 'evolutionTrigger',
    // gender: 'gender',
    // generation: 'generation',
    // growthRate: 'growthRate',
    item: get(db, item, 'item'),
    // itemAttribute: 'itemAttribute',
    // itemCategory: 'itemCategory',
    // itemFlingEffect: 'itemFlingEffect',
    // itemPocket: 'itemPocket',
    language: get(db, language, 'language'),
    // location: 'location',
    // locationArea: 'locationArea',
    // machine: 'machine',
    move: get(db, move, 'move'),
    // moveAilment: 'moveAilment',
    // moveBattleStyle: 'moveBattleStyle',
    // moveCategory: 'moveCategory',
    // moveDamageClass: 'moveDamageClass',
    // moveLearnMethod: 'moveLearnMethod',
    // moveTarget: 'moveTarget',
    // nature: 'nature',
    // palParkArea: 'palParkArea',
    // pokeathlonStat: 'pokeathlonStat',
    // pokedex: 'pokedex',
    pokemon: get(db, pokemon, 'pokemon'),
    // pokemonColor: 'pokemonColor',
    // pokemonForm: 'pokemonForm',
    // pokemonHabitat: 'pokemonHabitat',
    // pokemonShape: 'pokemonShape',
    // pokemonSpecies: 'pokemonSpecies',
    // region: 'region',
    // stat: 'stat',
    // superContestEffect: 'superContestEffect',
    type: get(db, type, 'type'),
    version: get(db, version, 'version'),
    versionGroup: get(db, versionGroup, 'versionGroup')
  }
}
