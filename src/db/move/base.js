module.exports = (m) => {
  const effectChance = m.effect_chance || null
  const power = m.power || null
  const accuracy = m.accuracy || null

  return {
    id: m.id,
    name: m.identifier,
    power: power,
    pp: m.pp,
    accuracy: accuracy,
    priority: m.priority,
    effect_chance: effectChance
  }
}
