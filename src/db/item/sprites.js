module.exports = (db, i) => {
  return {
    default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${i.identifier}.png`
  }
}
