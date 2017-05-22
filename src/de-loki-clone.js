module.exports = (data) => {
  if (data !== null) {
    data = Object.assign({}, data)
    delete data.meta
    delete data['$loki']
    if (data._meta) data.meta = data._meta
    delete data._meta
  }
  return data
}
