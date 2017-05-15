const base = (a) => {
  return {
    name: a.identifier,
    id: parseInt(a.id, 10),
    is_main_series: a.is_main_series === '1'
  }
}

const generation = (db, a) => {
  const _generations = db.getCollection('_generations')
  const generation = _generations.findOne({
    id: String(a.generation_id)
  })
  return {
    name: generation.identifier,
    url: `http://pokeapi.co/api/v2/generation/${generation.id}`
  }
}

const names = (db, a) => {
  const abilityNames = db.getCollection('_ability_names')
  const abilityName = abilityNames.where(an => an.ability_id === a.id && an.local_language_id === '9')
  return [{
    name: abilityName[0].name,
    language: {
      name: 'en',
      url: `http://pokeapi.co/api/v2/language/9`
    }
  }]
}

const effectEntries = (db, a) => {
  const abilityProseCollection = db.getCollection('_ability_prose')
  const abilityProse = abilityProseCollection.where(an => an.ability_id === a.id && an.local_language_id === '9')[0]
  if (abilityProse) {
    return [{
      effect: abilityProse.effect,
      short_effect: abilityProse.short_effect,
      language: {
        name: 'en',
        url: 'http://pokeapi.co/api/v2/language/9'
      }
    }]
  }
}

const effectChanges = (db, a) => {
  const _ability_changelog = db.getCollection('_ability_changelog')
  const abilityChangelog = _ability_changelog.findOne({ id: a.id })
  if (abilityChangelog === null) return {}

  const _version_groups = db.getCollection('_version_groups')
  const versionGroup = _version_groups.findOne({
    id: abilityChangelog.changed_in_version_group_id
  })

  const _ability_changelog_prose = db.getCollection('_ability_changelog_prose')
  const abilityChangelogProse = _ability_changelog_prose.where(acp => acp.local_language_id === '9' && acp.ability_changelog_id === abilityChangelog.id)
  const effect_entries = abilityChangelogProse.map(acp => {
    return {
      effect: acp.effect,
      language: {
        name: 'en',
        url: 'http://pokeapi.co/api/v2/language/9/'
      }
    }
  })

  return [{
    version_group: {
      name: versionGroup.identifier,
      url: `http://pokeapi.co/api/v2/version-group/${versionGroup.id}/`
    },
    effect_entries
  }]
}

const flavorTextEntries = (db, a) => {
  const _ability_flavor_text = db.getCollection('_ability_flavor_text')
  const _version_groups = db.getCollection('_versions')

  const abilityFlavorText = _ability_flavor_text.where(aft => aft.language_id === '9' && aft.ability_id === a.id)
  return abilityFlavorText.map(aft => {
    const versionGroups = _version_groups.findOne({
      id: aft.version_group_id
    })
    return {
      flavor_text: aft.flavor_text,
      language: {
        name: 'en',
        url: 'http://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: versionGroups.identifier,
        url: `http://pokeapi.co/api/v2/version-group/${versionGroups.id}/`
      }
    }
  })
}

const pokemon = (db, a) => {
  const _pokemon_abilities = db.getCollection('_pokemon_abilities')
  const pokemonAbilities = _pokemon_abilities.find({ability_id: String(a.id)})

  const _pokemon = db.getCollection('_pokemon')

  return pokemonAbilities.map(p => {
    const pokemon = _pokemon.findOne({
      id: p.pokemon_id
    })

    return {
      is_hidden: p.is_hidden === '1',
      slot: parseInt(p.slot, 10),
      pokemon: {
        name: pokemon.identifier,
        url: `http://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
      }
    }
  })
}

module.exports = (db) => {
  const collection = db.addCollection('ability')

  db.getCollection('_abilities').data
    .filter(a => a.id)
    .forEach(a => {
      let ability = base(a)
      ability.generation = generation(db, a)
      ability.names = names(db, a)
      ability.effect_entries = effectEntries(db, a)
      ability.effect_changes = effectChanges(db, a)
      ability.flavor_text_entries = flavorTextEntries(db, a)
      ability.pokemon = pokemon(db, a)
      collection.insert(ability)
    })

  return collection
}
