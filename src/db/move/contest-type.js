module.exports = (db, m) => {
  const contestTypesCollection = db.getCollection('_contest_types')
  const contestType = contestTypesCollection.findOne({id: m.contest_type_id})
  return {
    url: `http://pokeapi.co/api/v2/contest-type/${contestType.id}/`,
    name: contestType.identifier
  }
}
