module.exports = (db, m) => {
  const moveDamageClasses = db.getCollection('_move_damage_classes')
  const moveDamageClass = moveDamageClasses.findOne({id: m.damage_class_id})
  return {
    name: moveDamageClass.identifier,
    url: `http://pokeapi.co/api/v2/move-damage-class/${moveDamageClass.id}/`
  }
}
