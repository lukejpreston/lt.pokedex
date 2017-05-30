const changeCase = require('change-case')
const reg = /\[[a-zA-Z0-9_ :-]*]\{[a-zA-Z0-9_ -]*:[a-zA-Z0-9_ -]*\}/g
const id = (identifier, url) => {
  return parseInt(url.replace(`http://pokeapi.co/api/v2/${identifier}/`, '').replace('/', ''), 10)
}

const removeDoubles = (line) => {
  line = line.replace(/ {2}/g, ' ')
  if (line.includes('  ')) return removeDoubles(line)
  return line
}

const sort = (identifier, name, up, down) => {
  return (left, right) => {
    if (name && id(identifier, left[name].url) < id(identifier, right[name].url)) return up
    if (name && id(identifier, left[name].url) > id(identifier, right[name].url)) return down

    if (id(identifier, left.url) < id(identifier, right.url)) return up
    if (id(identifier, left.url) > id(identifier, right.url)) return down

    return 0
  }
}

module.exports = {
  clean (line) {
    if (typeof line !== 'string') line = String(line)

    line = removeDoubles(line).replace(/"/g, '').replace(/\n/g, '')
    const match = line.match(reg)
    if (match === null) return line
    match.forEach(m => {
      const first = m.split('{')[0].replace(/\[/g, '').replace(/\]/g, '')
      const second = m.split('{')[1].split(':')[1].replace(/}/g, '')

      let word = first
      if (word === '') word = second

      if (line.includes(`. ${m}`) || line.includes(`: ${m}`)) line = line.replace(m, changeCase.title(word))
      else line = line.replace(m, changeCase.title(word).toLowerCase())
    })

    if (line === 'Used in battle : Catches a wild Pokémon without fail.   If used in a trainer battle, nothing happens and the ball is lost.') console.log('here')
    return line
  },
  sortAsc (arr, identifier, name) {
    return arr.sort(sort(identifier, name, -1, 1))
  },
  sortDesc (arr, identifier, name) {
    return arr.sort(sort(identifier, name, 1, -1))
  }
}
