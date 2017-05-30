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
matchJson('item, with fling effect', 'item', [213], 'item-213')
matchJson('item, with held items', 'item', [222], 'item-222')
matchJson('item, with baby trigger for', 'item', [231], 'item-231')
matchJson('item, with machines', 'item', [397], 'item-397')
matchJson('move', 'move', [1], 'move-1')
matchJson('move, with stat changes and machines', 'move', [14], 'move-14')
matchJson('move, with past values and effect changes', 'move', [16], 'move-16')
matchJson('version', 'version', [1], 'version-1')
matchJson('version group', 'versionGroup', [1], 'version-group-1')
// matchJson('type', 'type', [8], 'type-8')
