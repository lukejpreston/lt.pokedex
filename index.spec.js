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

const matchJson = (desc, action, args, file) => {
  test(desc, () => {
    const result = api[action].apply(null, args)

    const expected = require(`./test-data/${file}.json`)

    expect(result).toEqualJSON(expected)
  })
}

matchJson('ability', 'ability', [1], 'ability-1')
matchJson('language', 'language', [9], 'language-9')
matchJson('berry', 'berry', [1], 'berry-1')
matchJson('pokemon', 'pokemon', [1], 'pokemon-1')
matchJson('pokemon, with held items', 'pokemon', [12], 'pokemon-12')
matchJson('item', 'item', [1], 'item-1')
matchJson('item', 'item', [213], 'item-213')
