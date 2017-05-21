module.exports = (db, i) => {
  let name = i.identifier
  if (name.includes('data-card')) name = 'data-card'
  if (name.match(/^tm[0-9]*/g)) name = 'tm-normal'
  if (name.match(/^hm[0-9]*/g)) name = 'hm-normal'

  return {
    default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`
  }
}
