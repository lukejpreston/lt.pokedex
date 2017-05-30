module.exports = (db, b) => {
  const itemsCollection = db.getCollection('_items')
  const item = itemsCollection.findOne({id: b.item_id})
  return {
    name: item.identifier,
    url: `http://pokeapi.co/api/v2/item/${item.id}/`
  }
}
