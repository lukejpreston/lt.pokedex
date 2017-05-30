module.exports = ({db, id = null, name = null, collectionName}) => {
  const collection = db.getCollection(collectionName)
  let x = null
  if (id !== null) x = collection.findOne({id})
  if (name !== null) x = collection.findOne({identifier: name})
  return x
}
