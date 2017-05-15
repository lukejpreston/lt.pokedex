const Lokijs = require('lokijs')
const list = require('./data/db.json')

const db = new Lokijs('lt.pokedex')

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
      let newLanguage = Object.assign({}, language)
      delete newLanguage.meta
      delete newLanguage['$loki']
      let names = collections._language_names.findOne({
        language_id: language.id
      })
      if (names !== null) Object.keys(names).forEach(key => {
        if (key !== 'meta' && key !== '$loki') {
          newLanguage[key] = names[key]
        }
      })
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
      id: String(idName)
    })

    return byName || byId || null
  }
}

module.exports = {
  db, collections, api
}
