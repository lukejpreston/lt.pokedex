module.exports = (db, m) => {
  const moveNamesCollection = db.getCollection('_move_names')
  const languagesCollection = db.getCollection('_languages')

  return moveNamesCollection
    .find({move_id: m.id})
    .map(mn => {
      const language = languagesCollection.findOne({id: mn.local_language_id})
      return {
        language: {
          url: `http://pokeapi.co/api/v2/language/${mn.local_language_id}/`,
          name: language.identifier
        },
        name: mn.name
      }
    })
}
