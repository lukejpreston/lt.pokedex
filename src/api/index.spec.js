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

  let language = null

  beforeEach(() => {
    language = api.languages(9)
  })

  test('has id', () => {
    expect(language.id).toBe(9)
  })

  test('has iso639', () => {
    expect(language.iso639).toBe('en')
  })

  test('has iso3166', () => {
    expect(language.iso3166).toBe('us')
  })

  test('has official', () => {
    expect(language.official).toBe(true)
  })

  test('has names, name', () => {
    expect(language.names.name).toBe('English')
  })

  test('has names, language name', () => {
    expect(language.names.language.name).toBe('en')
  })
})

describe('ability', () => {
  test('using id', () => {
    const ability = api.ability(1)

    console.log(JSON.stringify(ability, null, 4))

    expect(ability.id).toBe(1)
  })
})
