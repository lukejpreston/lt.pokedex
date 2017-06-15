const api = require('./')
const jsondiffpatch = require('jsondiffpatch')
const consoleFormatters = require(require.resolve('jsondiffpatch').replace('main.js', 'formatters/console.js'))

expect.extend({
  toEqualJSON (actual, expected) {
    actual = JSON.parse(JSON.stringify(actual))
    expected = JSON.parse(JSON.stringify(expected))

    const diff = jsondiffpatch.diff(actual, expected)

    return {
      message: () => consoleFormatters.format(diff),
      pass: typeof diff === 'undefined'
    }
  }
})

module.exports = (desc, action, args, file, skip = false) => {
  let func = skip ? test.skip : test
  func(desc, () => {
    const result = api[action].apply(null, args)

    const expected = require(`./test-data/${file}.json`)

    expect(result).toEqualJSON(expected)
  })
}
