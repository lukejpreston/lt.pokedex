module.exports = (l) => {
  return {
    id: l.id,
    official: l.official === 1,
    iso3166: l.iso3166,
    iso639: l.iso639,
    name: l.identifier
  }
}
