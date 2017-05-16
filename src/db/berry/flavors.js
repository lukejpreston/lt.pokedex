const flavorNames = ['spicy', 'dry', 'sweet', 'bitter', 'sour']

module.exports = (db, b) => {
  const berryFlavorsCollection = db.getCollection('_berry_flavors')
  const flavors = berryFlavorsCollection.find({berry_id: b.id})
  return flavorNames.map((f, i) => {
    return {
      flavor: {
        url: `http://pokeapi.co/api/v2/berry-flavor/${i + 1}/`,
        name: f
      },
      potency: flavors[flavorNames.length - i - 1].flavor
    }
  })
}
