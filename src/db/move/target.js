module.exports = (db, m) => {
  const moveTargetsCollection = db.getCollection('_move_targets')
  const moveTarget = moveTargetsCollection.findOne({id: m.target_id})
  return {
    url: `http://pokeapi.co/api/v2/move-target/${m.target_id}/`,
    name: moveTarget.identifier
  }
}
