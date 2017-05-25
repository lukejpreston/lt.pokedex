module.exports = (db, vg) => {
  const versionGroupRegionsCollection = db.getCollection('_version_group_regions')
  const regionsCollection = db.getCollection('_regions')
  return versionGroupRegionsCollection
    .find({version_group_id: vg.id})
    .map(vgr => {
      const region = regionsCollection.findOne({id: vgr.region_id})
      return {
        url: `http://pokeapi.co/api/v2/region/${region.id}/`,
        name: region.identifier
      }
    })
}
