const api = require('./')

describe('languages', () => {
  test('using an id', () => {
    const language = api.languages(9)
    expect(language.id).toBe(9)
  })
})
