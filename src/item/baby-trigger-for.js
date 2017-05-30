module.exports = (db, i) => {
  const evolutionChainsCollection = db.getCollection('_evolution_chains')
  const evolutionChain = evolutionChainsCollection.findOne({baby_trigger_item_id: i.id})
  if (evolutionChain === null) return null
  return {
    url: `http://pokeapi.co/api/v2/evolution-chain/${evolutionChain.id}/`
  }
}
