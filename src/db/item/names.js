module.exports = (db, i) => {
  const itemNamesCollection = db.getCollection('_item_names')
  const languagesCollection = db.getCollection('_languages')

  return itemNamesCollection
    .find({item_id: i.id})
    .map(ina => {
      const language = languagesCollection.findOne({id: ina.local_language_id})

      return {
        name: ina.name,
        language: {
          url: `http://pokeapi.co/api/v2/language/${language.id}/`,
          name: language.identifier
        }
      }
    })
}
