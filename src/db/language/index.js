const base = require('./base')
const names = require('./names')

module.exports = (db) => {
  const languagesCollection = db.getCollection('_languages')
  const collection = db.addCollection('language')

  languagesCollection
    .data
    .forEach(l => {
      let language = base(l)
      language.names = names(db, l)
      collection.insert(language)
    })

  return collection
}
