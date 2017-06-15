const matchJson = require('../../match-json')

matchJson('pokemon', 'pokemon', [1], 'pokemon-1')
matchJson('pokemon, with held items', 'pokemon', [12], 'pokemon-12')
