module.exports = (b) => {
  return {
    id: parseInt(b.id, 10),
    natural_gift_power: parseInt(b.natural_gift_power, 10),
    size: parseInt(b.size, 10),
    max_harvest: parseInt(b.max_harvest, 10),
    growth_time: parseInt(b.growth_time, 10),
    soil_dryness: parseInt(b.soil_dryness, 10),
    smoothness: parseInt(b.smoothness, 10)
  }
}
