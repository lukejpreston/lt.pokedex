const Lokijs = require('lokijs')
const list = require('./data/db.json')

const db = new Lokijs('lt.pokedex')

const deLokiClone = (data) => {
  if (data !== null) {
    data = Object.assign({}, data)
    delete data.meta
    delete data['$loki']
  }
  return data
}

let collections = {}

list.forEach(item => {
  const name = item.replace('.json', '')
  const data = require(`./data/${item}`)
  collections[`_${name}`] = db.addCollection(name)
  collections[`_${name}`].insert(data)
})

let createViews = {
  abilities () {},
	berries (idName, language) {
    collections.berries
  },
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
	items () {},
	itemCategories () {},
	itemAttributes () {},
	itemFlingEffects () {},
	itemPockets () {},
	languages () {
    collections.languages = db.addCollection('languages')
    collections._languages.data.forEach(language => {

      let newLanguage = deLokiClone(language)

      newLanguage.id = parseInt(newLanguage.id, 10)
      newLanguage.official = newLanguage.official === '1'
      delete newLanguage.order

      let names = collections._language_names.findOne({
        language_id: language.id
      })
      if (names !== null) {
        newLanguage.names = {
          name: names.name,
          language: {
            name: newLanguage.identifier,
            url: `http"//pokeapi.co/api/v2/language/${newLanguage.id}`,
            query: `pokedex.language(${newLanguage.id})`
          }
        }
      }

      collections.languages.insert(newLanguage)
    })
  },
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
	pokemon () {},
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

Object.keys(createViews).forEach(key => {
  createViews[key]()
})

const api = {
  languages (idName) {
    const byName = collections.languages.findOne({
      name: idName
    })

    const byId = collections.languages.findOne({
      id: parseInt(idName, 10)
    })

    return deLokiClone(byName) || deLokiClone(byId) || null
  }
}
//
// module.exports = {
//   db, collections, api
// }


console.log(api.languages(9))
