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

const matchJson = (action, args, file) => {
  test(action, () => {
    const result = api[action].apply(null, args)

    const expected = require(`./test-data/${file}.json`)

    expect(result).toEqualJSON(expected)
  })
}

matchJson('ability', [1], 'ability-1')
matchJson('language', [9], 'language-9')
matchJson('berry', [1], 'berry-1')
matchJson('pokemon', [1], 'pokemon-1')
