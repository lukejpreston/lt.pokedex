module.exports = (db, b) => {
  const berryFirmness = db.getCollection('_berry_firmness')
  berryFirmness.findOne({id: b.firmness_id})
  const bf = berryFirmness.findOne({id: b.firmness_id})

  return {
    name: bf.identifier,
    url: `http://pokeapi.co/api/v2/berry-firmness/${bf.id}/`
  }
}
