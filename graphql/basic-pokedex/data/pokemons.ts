import data from './pokemon-data.json';

export type PokemonType =
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

export type Pokemon = typeof data[0];

export const pokemonList: Pokemon[] = data;

export const pokemonById: Map<string, Pokemon> = pokemonList.reduce(
  (map, pokemon) => {
    if (pokemon.id) map.set(pokemon.id, pokemon);
    return map;
  },
  new Map()
);
