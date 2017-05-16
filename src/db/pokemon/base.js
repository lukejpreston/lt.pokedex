module.exports = (p) => {
  return {
    id: p.id,
    weight: p.weight,
    height: p.height,
    name: p.identifier,
    base_experience: p.base_experience,
    order: p.order,
    is_default: p.is_default
  }
}
