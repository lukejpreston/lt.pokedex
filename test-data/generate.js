const fs = require('fs')
const path = require('path')

module.exports = (name, data) => {
  fs.writeFileSync(path.resolve(__dirname, `${name}.json`), JSON.stringify(data, null, 2))
}
