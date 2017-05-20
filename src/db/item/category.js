module.exports = (db, i) => {
  const itemCategorisCollection = db.getCollection('_item_categories')
  const category = itemCategorisCollection.findOne({id: i.category_id})
  return {
    url: `http://pokeapi.co/api/v2/item-category/${category.id}/`,
    name: category.identifier
  }
}
