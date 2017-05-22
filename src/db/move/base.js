module.exports = (m) => {
  const effectChance = m.effect_chance || null
  return {
    id: m.id,
    name: m.identifier,
    power: m.power,
    pp: m.pp,
    accuracy: m.accuracy,
    priority: m.priority,
    effect_chance: effectChance
  }
}
