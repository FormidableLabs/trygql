import data from './pokemon-data.json';

export type RawType =
  | 'Grass'
  | 'Poison'
  | 'Fire'
  | 'Flying'
  | 'Water'
  | 'Bug'
  | 'Normal'
  | 'Electric'
  | 'Ground'
  | 'Fairy'
  | 'Fighting'
  | 'Psychic'
  | 'Rock'
  | 'Steel'
  | 'Ice'
  | 'Ghost'
  | 'Dragon'
  | 'Dark';

export type RawPokemon = typeof data[0];

export const pokemonList: RawPokemon[] = data;

export const pokemonById: Map<string, RawPokemon> = pokemonList.reduce(
  (map, pokemon) => {
    if (pokemon.id) map.set(pokemon.id, pokemon);
    return map;
  },
  new Map()
);
