const db = require('../db')()

const languages = require('./languages')

module.exports = {
  languages: languages(db)
}
