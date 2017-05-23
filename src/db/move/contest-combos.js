const sort = (data, use) => {
  if (data[use] !== null) {
    data[use].sort((left, right) => {
      if (left.url < right.url) return 1
      if (left.url > right.url) return -1
      return 0
    })
  }
}

const createUseMove = (m, movesCollection, contestCombo, order, data, use) => {
  if (contestCombo[`${order}_move_id`] !== m.id) {
    if (data[use] === null) data[use] = []
    const useMove = movesCollection.findOne({id: contestCombo[`${order}_move_id`]})
    data[use].push({
      name: useMove.identifier,
      url: `http://pokeapi.co/api/v2/move/${useMove.id}/`
    })
  }
}

const combos = (db, m, type) => {
  const data = {
    use_before: null,
    use_after: null
  }

  const movesCollection = db.getCollection('_moves')
  const contestCombosCollection = db.getCollection(`${type}_contest_combos`)
  const contestCombos = contestCombosCollection.where(scc => scc.first_move_id === m.id || scc.second_move_id === m.id)

  if (contestCombos.length > 0) {
    contestCombos.forEach(contestCombo => {
      createUseMove(m, movesCollection, contestCombo, 'second', data, 'use_before')
      createUseMove(m, movesCollection, contestCombo, 'first', data, 'use_after')
    })
  }

  sort(data, 'use_before')
  sort(data, 'use_after')

  return data
}

module.exports = (db, m) => {
  const data = {
    super: combos(db, m, '_super'),
    normal: combos(db, m, '')
  }

  if (data.super.use_after === null &&
    data.super.use_before === null &&
    data.normal.use_after === null &&
    data.normal.use_before === null) return null

  return data
}
