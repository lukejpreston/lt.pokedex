module.exports = (a) => {
  return {
    name: a.identifier,
    id: parseInt(a.id, 10),
    is_main_series: a.is_main_series
  }
}
