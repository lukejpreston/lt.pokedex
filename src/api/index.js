const deLokiClone = require('../de-loki-clone')
const db = require('../db')()

const languages = require('./languages')

module.exports = {
  languages: languages(db)
}
