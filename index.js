const Lokijs = require('lokijs')
const list = require('./data/db.json')

const db = new Lokijs('lt.pokedex')

let collections = {}

list.forEach(item => {
  const name = item.replace('.json', '')
  const data = require(`./data/${item}`)
  collections[name] = db.addCollection(name)
  collections[name].insert(data)
})

module.exports = {
  db, collections
}
