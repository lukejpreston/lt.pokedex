module.exports = (db) => {
  const languages = db.getCollection('languages')

  const byName = languages.findOne({
    name: idName
  })

  if (byName) return deLokiClone(byName)

  const byId = languages.findOne({
    id: parseInt(idName, 10)
  })

  if (byId) return deLokiClone(byId)

  return null
}
