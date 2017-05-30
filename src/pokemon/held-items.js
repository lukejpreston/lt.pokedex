module.exports = (db, p) => {
  const itemsCollection = db.getCollection('_items')
  const pokemonItemsCollection = db.getCollection('_pokemon_items')
  const pokemonItems = pokemonItemsCollection.find({pokemon_id: p.id})
  const versionsCollection = db.getCollection('_versions')

  let versionDetails = {}
  pokemonItems.forEach(pi => {
    versionDetails[pi.item_id] = versionDetails[pi.item_id] || []
    const versions = versionsCollection.find({id: pi.version_id})
    const versionName = versions.sort((left, right) => {
      if (left.id < right.id) return -1
      if (left.id > right.id) return 1
      return 0
    }).map(vg => vg.identifier).join('-')

    versionDetails[pi.item_id].push({
      rarity: pi.rarity,
      version: {
        id: pi.version_id,
        url: `http://pokeapi.co/api/v2/version/${pi.version_id}/`,
        name: versionName
      }
    })
  })

  return Object.keys(versionDetails).map(itemId => {
    const item = itemsCollection.findOne({id: parseInt(itemId, 10)})
    versionDetails[itemId].forEach(vd => delete vd.version.id)
    return {
      item: {
        url: `http://pokeapi.co/api/v2/item/${itemId}/`,
        name: item.identifier
      },
      version_details: versionDetails[itemId]
    }
  })
}
