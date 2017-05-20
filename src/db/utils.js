const changeCase = require('change-case')
const reg = /\[[a-zA-Z0-9_ :-]*]\{[a-zA-Z0-9_ -]*:[a-zA-Z0-9_ -]*\}/g

const removeDoubles = (line) => {
  line = line.replace(/ {2}/g, ' ')
  if (line.includes('  ')) return removeDoubles(line)
  return line
}

module.exports = {
  clean (line) {
    if (typeof line !== 'string') line = String(line)

    line = removeDoubles(line).replace(/"/g, '')
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
  }
}
