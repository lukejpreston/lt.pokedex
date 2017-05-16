const api = require('./')

describe('languages', () => {
  describe('get', () => {
    test('using an id', () => {
      const language = api.languages(9)
      expect(language.id).toBe(9)
    })

    test('using a name', () => {
      const language = api.languages('English')
      expect(language.id).toBe(9)
    })
  })

  describe('has', () => {
    let language = null
    beforeEach(() => {
      language = api.languages(9)
    })

    test('id', () => {
      expect(language.id).toBe(9)
    })

    test('iso639', () => {
      expect(language.iso639).toBe('en')
    })

    test('iso3166', () => {
      expect(language.iso3166).toBe('us')
    })

    test('official', () => {
      expect(language.official).toBe(true)
    })

    describe('names', () => {
      test('name', () => {
        expect(language.names[0].name).toBe('English')
      })

      test('language, name', () => {
        expect(language.names[0].language.name).toBe('en')
      })
    })
  })
})

describe('ability', () => {
  describe('get', () => {
    test('using id', () => {
      const ability = api.ability(1)
      expect(ability.id).toBe(1)
    })

    test('using name', () => {
      const ability = api.ability('stench')
      expect(ability.id).toBe(1)
    })
  })

  describe('has', () => {
    let ability = null
    beforeEach(() => {
      ability = api.ability(1)
    })

    test('id', () => {
      expect(ability.id).toBe(1)
    })

    test('name', () => {
      expect(ability.name).toBe('stench')
    })

    test('is main series', () => {
      expect(ability.is_main_series).toBe(true)
    })

    describe('generation', () => {
      test('name', () => {
        expect(ability.generation.name).toBe('generation-iii')
      })
    })

    describe('names', () => {
      test('name', () => {
        expect(ability.names[0].name).toBe('Stench')
      })

      test('language, name', () => {
        expect(ability.names[0].language.name).toBe('en')
      })
    })

    describe('effect entries', () => {
      test('effect', () => {
        expect(typeof ability.effect_entries[0].effect).toBe('string')
      })

      test('short effect', () => {
        expect(typeof ability.effect_entries[0].short_effect).toBe('string')
      })

      test('language, name', () => {
        expect(ability.effect_entries[0].language.name).toBe('en')
      })
    })

    describe('effect changes', () => {
      test('version group, name', () => {
        expect(ability.effect_changes[0].version_group.name).toBe('black-white')
      })

      describe('effect entries', () => {
        test('effect', () => {
          expect(typeof ability.effect_changes[0].effect_entries[0].effect).toBe('string')
        })

        test('language, name', () => {
          expect(ability.effect_changes[0].effect_entries[0].language.name).toBe('en')
        })
      })
    })

    describe('flavour text entries', () => {
      test('flavour text', () => {
        expect(typeof ability.flavor_text_entries[0].flavor_text).toBe('string')
      })

      test('language, name', () => {
        expect(ability.flavor_text_entries[0].language.name).toBe('en')
      })

      test('version group, name', () => {
        expect(ability.flavor_text_entries[0].version_group.name).toBe('soulsilver')
      })
    })

    describe('pokemon', () => {
      test('is hidden', () => {
        expect(ability.pokemon[0].is_hidden).toBe(false)
      })

      test('slot', () => {
        expect(ability.pokemon[0].slot).toBe(1)
      })

      test('pokemon, name', () => {
        expect(ability.pokemon[0].pokemon.name).toBe('garbodor')
      })
    })
  })
})

describe('berry', () => {
  describe('get', () => {
    test('using an id', () => {
      const berry = api.berry(1)
      expect(berry.id).toBe(1)
    })

    test('using a name', () => {
      const berry = api.berry('cheri')
      expect(berry.id).toBe(1)
    })
  })

  describe('has', () => {
    let berry = null
    beforeEach(() => {
      berry = api.berry(1)
    })

    test('id', () => {
      expect(berry.id).toBe(1)
    })

    test('name', () => {
      expect(berry.name).toBe('cheri')
    })

    test('growth time', () => {
      expect(berry.growth_time).toBe(3)
    })

    test('max harvest', () => {
      expect(berry.max_harvest).toBe(5)
    })

    test('natural gift power', () => {
      expect(berry.natural_gift_power).toBe(60)
    })

    test('size', () => {
      expect(berry.size).toBe(20)
    })

    test('smoothness', () => {
      expect(berry.smoothness).toBe(25)
    })

    test('soil dryness', () => {
      expect(berry.soil_dryness).toBe(15)
    })
  })
})
