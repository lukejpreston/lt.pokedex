module.exports = (db, b) => {
  const itemCollecton = db.getCollection('_items')
  const item = itemCollecton.findOne({id: b.item_id})
  return item.identifier.replace('-berry', '')
}
