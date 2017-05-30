module.exports = (i) => {
  return {
    id: i.id,
    name: i.identifier,
    cost: i.cost,
    fling_power: i.fling_power === '' ? null : i.fling_power
  }
}
