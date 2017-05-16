module.exports = (db) => {
  const collection = db.addCollection('pokemon')
  return collection
}
