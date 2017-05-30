module.exports = (db, vg) => {
  const verionsCollection = db.getCollection('_versions')
  return verionsCollection
    .find({version_group_id: vg.id})
    .map(v => {
      return {
        url: `http://pokeapi.co/api/v2/version/${v.id}/`,
        name: v.identifier
      }
    })
    .sort((left, right) => {
      if (left.url < right.url) return -1
      if (left.url > right.url) return 1
      return 0
    })
}
