FROM node:7

RUN mkdir -p /usr/src/lt.pokedex
WORKDIR /usr/src/lt.pokedex

RUN git clone https://github.com/PokeAPI/pokeapi.git
ADD package.json /usr/src/lt.pokedex
ADD yarn.lock /usr/src/lt.pokedex
RUN yarn

ADD scripts /usr/src/lt.pokedex/scripts
RUN yarn generate

ADD src /usr/src/lt.pokedex/src
