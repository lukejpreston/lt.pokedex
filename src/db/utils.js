module.exports = {
  stripQuotesAndDoubleSpace (value) {
    return value.replace(/"/g, '').replace(/ {2}/g, ' ')
  },
  stripMechanic (value) {
    return value.replace('[flinch]{mechanic:flinch}', 'flinch')
  }
}
