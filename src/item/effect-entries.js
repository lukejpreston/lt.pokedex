const utils = require('../utils')

module.exports = (db, i) => {
  const iemProseCollection = db.getCollection('_item_prose')
  const languagesCollection = db.getCollection('_languages')
  const itemProse = iemProseCollection.find({item_id: i.id})
  return itemProse.map(ip => {
    const language = languagesCollection.findOne({id: ip.local_language_id})
    return {
      short_effect: utils.clean(ip.short_effect),
      effect: utils.clean(ip.effect),
      language: {
        name: language.identifier,
        url: `http://pokeapi.co/api/v2/language/${language.id}/`
      }
    }
  })
}
