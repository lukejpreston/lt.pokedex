module.exports = (db, p) => {
  return {
    back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${p.id}.png`,
    back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${p.id}.png`,
    front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
    front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${p.id}.png`,
    back_female: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/${p.id}.png`,
    back_shiny_female: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/${p.id}.png`,
    front_female: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/${p.id}.png`,
    front_shiny_female: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/${p.id}.png`
  }
}
