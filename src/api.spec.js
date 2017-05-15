const api = require('./api')

describe('languages', () => {
  test('using an id', () => {
    const language = api.languages(9)
    expect(language.id).toBe(9)
  })
})
