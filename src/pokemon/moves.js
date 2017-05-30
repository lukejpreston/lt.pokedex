module.exports = (db, p) => {
  const pokemonMovesCollection = db.getCollection('_pokemon_moves')
  const movesCollection = db.getCollection('_moves')
  const pokemonMoveMethodsCollection = db.getCollection('_pokemon_move_methods')
  const versionsCollection = db.getCollection('_versions')

  const pokemonMoves = pokemonMovesCollection.find({pokemon_id: p.id})
  let versionGroupDetails = {}
  pokemonMoves.forEach(pm => {
    versionGroupDetails[pm.move_id] = versionGroupDetails[pm.move_id] || []

    const pokemonMoveMethod = pokemonMoveMethodsCollection.findOne({id: pm.pokemon_move_method_id})
    const versions = versionsCollection.find({version_group_id: pm.version_group_id})
    const versionName = versions.sort((left, right) => {
      if (left.id < right.id) return -1
      if (left.id > right.id) return 1
      return 0
    }).map(vg => vg.identifier).join('-')

    versionGroupDetails[pm.move_id].push({
      level_learned_at: pm.level,
      move_learn_method: {
        url: `http://pokeapi.co/api/v2/move-learn-method/${pokemonMoveMethod.id}/`,
        name: pokemonMoveMethod.identifier
      },
      version_group: {
        id: pm.version_group_id,
        url: `http://pokeapi.co/api/v2/version-group/${pm.version_group_id}/`,
        name: versionName
      }
    })
  })

  return Object.keys(versionGroupDetails).map(moveId => {
    const versionGroupDetail = versionGroupDetails[moveId]
    versionGroupDetail.sort((left, right) => {
      if (left.version_group.id < right.version_group.id) return -1
      if (left.version_group.id > right.version_group.id) return 1
      return 0
    })
    versionGroupDetail.forEach(vgd => {
      delete vgd.version_group.id
    })

    return {
      version_group_details: versionGroupDetail,
      move: {
        url: `http://pokeapi.co/api/v2/move/${moveId}/`,
        name: movesCollection.findOne({id: parseInt(moveId, 10)}).identifier
      }
    }
  })
}
