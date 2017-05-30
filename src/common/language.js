const language = require('../language')

module.exports = ({db, id}) => {
  const l = language({db, id})
  return {
    name: l.name,
    url: `http://pokeapi.co/api/v2/language/${l.id}/`
  }
}
