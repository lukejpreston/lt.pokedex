const api = require('./')

describe('languages', () => {
  test('using an id', () => {
    const language = api.languages(9)
    expect(language.id).toBe(9)
  })

  test('using a name', () => {
    const language = api.languages('English')
    expect(language.id).toBe(9)
  })
})
