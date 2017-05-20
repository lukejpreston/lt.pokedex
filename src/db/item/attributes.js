module.exports = (db, i) => {
  const itemFlagMapCollection = db.getCollection('_item_flag_map')
  const itemFlagsCollection = db.getCollection('_item_flags')

  return itemFlagMapCollection
    .find({item_id: i.id})
    .map(ifm => {
      const itemFlag = itemFlagsCollection.findOne({id: ifm.item_flag_id})
      return {
        url: `http://pokeapi.co/api/v2/item-attribute/${itemFlag.id}/`,
        name: itemFlag.identifier
      }
    })
    .sort((left, right) => {
      if (left.url < right.url) return -1
      if (left.url > right.url) return 1
      return 0
    })
}
