# lt.pokedex

In-memory version of [pokeapi](http://pokeapi.co/), using [Lokijs](http://lokijs.org)

## Installation

```
npm i -S lt.pokedex
```

## Usage

### Directly

```js
const pokedex = require('lt.pokedex')

pokedex.pokemon('voltorb')
pokedex.pokemon(100)
```

### API

```js
const pokedexApi = require('lt.pokedex/api')

pokedex.pokemon('voltorb')
pokedex.pokemon(100)
```

### Lokijs Database

```js
const pokedexDb = require('lt.pokedex/db')

const pokemonShapesCollection = pokedexDb.getCollection('_pokemon_shapes')
pokemonShapesCollection.findOne({pokemon_id: 100})

const pokemonCollection = pokedexDb.getCollection('pokemon')
pokemonCollection.findOne({id: 100})
```

All of the csv files in the pokeapi are available, they have the same name as the file but start with `_` and have the same data but in JSON.

all the functions in the API have their own collection without `_`

### Browser

Works in the browser, and it is quick

```js
const pokedex = require('lt.pokedex/dist')

pokedex.pokemon('voltorb')
pokedex.pokemon(100)
```

```html
<script src=`some-cdn` />
<script>
    pokedex.pokemon('voltorb')
    pokedex.pokemon(100)
</script>
```

## API

The API follows the pokeapi but instead of a http request it is just a function call as in the example above. I am just going to give their documentation

## Development

If you want to work on then use `docker-compose`

```bash
docker-compose build
docker-compose run test
docker-compose run lint
docker-compose run ci
docker-compose run dist
```

if you don't have `docker-compose` use node `6+`

```bash
npm install

npm run test
npm run test -- --watch

npm run lint
npm run lint -- --watch

npm run ci
npm run dist
```

### Test

this will start the [jest](https://facebook.github.io/jest/) tests and a watch

*WARNING* be careful about logging, there are loads of pokemon and if you want to log each pokemon and each of their moves you will be logging a huge amount of data. I would suggest you always log against a single id e.g.

```js
if (pokemon.id === 100) console.log(pokemon.moves)
```

I have had to reboot my mac before :blush: and reset it's PRAM because of this, which is a nightmare I wouldn't want to wish on anyone

There is only one test which acts like an integration test `src/api/index.spec.js` and simply matches JSON

### Lint

using eslint, but this starts eslint-watch

### CI

this runs all the tests once and then does linting, this is what travis does as well

### Convention

I created a convention because trying to keep track of everything is difficult.

the `test-data` is taken from the pokeapi, bar order of moves and `pokemon.sprites` I have yet to change it (they are wrong imo).

When you use `getCollection('name')` always assign the variable to `nameCollection` also when itteration over a collection abbreviate the collection name

```js
const pokemonAbilitiesCollection = db.getCollection('_abilities')

pokemonAbilitiesCollection
    .find({pokemon_id: 100})
    .map(pa => {
    })
```

it frees up the ability to use named variables you would actually want to use

## TODO

* make the API the same as pokeapi
* re-use my collections in order to make things simpler and quicker
* make it so you can make your own db
