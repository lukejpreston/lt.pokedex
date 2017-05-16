const base = require('./base')
const names = require('./names')

module.exports = (db) => {
  const languagesCollection = db.getCollection('_languages')
  const language = db.addCollection('language')

  languagesCollection
    .data
    .forEach(l => {
      let newL = base(l)
      newL.names = names(db, l)
      language.insert(newL)
    })

  return language
}
