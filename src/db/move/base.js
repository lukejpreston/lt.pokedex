module.exports = (m) => {
  const effectChance = m.effect_chance || null
  const power = m.power || null
  const accuracy = m.accuracy || null
  const pp = m.pp || null

  return {
    id: m.id,
    name: m.identifier,
    power: power,
    pp: pp,
    accuracy: accuracy,
    priority: m.priority,
    effect_chance: effectChance
  }
}
