const base = (a) => {
  return {
    name: a.identifier,
    id: parseInt(a.id, 10),
    is_main_series: a.is_main_series === '1'
  }
}

const generation = (db, a) => {
  const generationsCollection = db.getCollection('_generations')
  const generation = generationsCollection.findOne({
    id: String(a.generation_id)
  })
  return {
    name: generation.identifier,
    url: `http://pokeapi.co/api/v2/generation/${generation.id}`
  }
}

const names = (db, a) => {
  const abilityNamesCollection = db.getCollection('_ability_names')
  const abilityNames = abilityNamesCollection.where(an => an.ability_id === a.id && an.local_language_id === '9')
  return [{
    name: abilityNames[0].name,
    language: {
      name: 'en',
      url: `http://pokeapi.co/api/v2/language/9`
    }
  }]
}

const effectEntries = (db, a) => {
  const abilityProseCollection = db.getCollection('_ability_prose')
  const abilityProses = abilityProseCollection.where(an => an.ability_id === a.id && an.local_language_id === '9')
  if (abilityProses.length > 0) {
    return [{
      effect: abilityProses[0].effect,
      short_effect: abilityProses[0].short_effect,
      language: {
        name: 'en',
        url: 'http://pokeapi.co/api/v2/language/9'
      }
    }]
  }
}

const effectChanges = (db, a) => {
  const abilityChangelogCollection = db.getCollection('_ability_changelog')
  const abilityChangelog = abilityChangelogCollection.findOne({ id: a.id })
  if (abilityChangelog === null) return {}

  const versionGroupsCollection = db.getCollection('_version_groups')
  const versionGroup = versionGroupsCollection.findOne({
    id: abilityChangelog.changed_in_version_group_id
  })

  const abilityChangelogProseCollection = db.getCollection('_ability_changelog_prose')
  const abilityChangelogProse = abilityChangelogProseCollection.where(acp => acp.local_language_id === '9' && acp.ability_changelog_id === abilityChangelog.id)
  const effectEntries = abilityChangelogProse.map(acp => {
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
    effect_entries: effectEntries
  }]
}

const flavorTextEntries = (db, a) => {
  const abilityFlavorTextCollection = db.getCollection('_ability_flavor_text')
  const versionGroupsCollection = db.getCollection('_versions')

  const abilityFlavorText = abilityFlavorTextCollection.where(aft => aft.language_id === '9' && aft.ability_id === a.id)
  return abilityFlavorText.map(aft => {
    const versionGroups = versionGroupsCollection.findOne({
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
  const pokemonAbilitiesCollection = db.getCollection('_pokemon_abilities')
  const pokemonAbilities = pokemonAbilitiesCollection.find({ability_id: String(a.id)})

  const pokemonCollection = db.getCollection('_pokemon')

  return pokemonAbilities.map(pa => {
    const pokemon = pokemonCollection.findOne({
      id: pa.pokemon_id
    })

    return {
      is_hidden: pa.is_hidden === '1',
      slot: parseInt(pa.slot, 10),
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
