FROM node:alpine

RUN mkdir -p /usr/src/lt.pokedex
WORKDIR /usr/src/lt.pokedex

RUN git clone git@github.com:PokeAPI/pokeapi.git /usr/src/lt.pokedex/pokeapi
ADD package.json /usr/src/lt.pokedex
ADD yarn.lock /usr/src/lt.pokedex
RUN yarn

ADD scripts /usr/src/lt.pokedex/scripts
ADD src /usr/src/lt.pokedex/src

CMD yarn start
EXPOSE 3000
