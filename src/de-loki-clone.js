module.exports = (data) => {
  if (data !== null) {
    data = Object.assign({}, data)
    delete data.meta
    delete data['$loki']
  }
  return data
}
