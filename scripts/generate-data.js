const csvtojson = require('./csvtojson')
const fs = require('fs')
const path = require('path')

const location = './pokeapi/data/v2/csv'
const output = path.join(process.cwd(), '/data')

try {
  fs.mkdirSync(output)
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error(err)
    process.exit(1)
  }
}

const db = []

fs.readdirSync(location)
  .forEach(fileName => {
    console.log('read <==', fileName)
    const fullName = path.resolve(process.cwd(), location, fileName)
    const data = fs.readFileSync(fullName).toString()
    fileName = fileName.replace('.csv', '.json')
    db.push(fileName)
    fileName = path.join(output, fileName)

    const json = csvtojson(data)
    fs.writeFileSync(fileName, JSON.stringify(json, null, 4))
    console.log('wrote ==>', fileName)
    console.log()
  })

fs.writeFileSync(path.join(output, 'db.json'), JSON.stringify(db, null, 4))
