const flavorNames = ['spicy', 'dry', 'sweet', 'bitter', 'sour']

module.exports = (db, b) => {
  const berryFlavorsCollection = db.getCollection('_berry_flavors')
  const flavors = berryFlavorsCollection.find({berry_id: b.id})
  return flavors.map((f, index) => {
    return {
      potency: 0,
      flavor: {
        name: flavorNames[index],
        url: `http://pokeapi.co/api/v2/berry-flavor/${index + 1}/`
      }
    }
  })
}
