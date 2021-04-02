import { nonNull, idArg, intArg, objectType, enumType } from 'nexus';
import { RawType, RawPokemon, pokemonList, pokemonById } from './data/pokemons';

export { RawType, RawPokemon };

export const PokemonType = enumType({
  name: 'PokemonType',
  description:
    'Elemental property associated with either a Pokémon or one of their moves.',
  sourceType: {
    module: __filename,
    export: 'RawType',
  },
  members: [
    'Grass',
    'Poison',
    'Fire',
    'Flying',
    'Water',
    'Bug',
    'Normal',
    'Electric',
    'Ground',
    'Fairy',
    'Fighting',
    'Psychic',
    'Rock',
    'Steel',
    'Ice',
    'Ghost',
    'Dragon',
    'Dark',
  ],
});

export const PokemonAttack = objectType({
  name: 'Attack',
  description:
    'Move a Pokémon can perform with the associated damage and type.',
  definition(t) {
    t.string('name');
    t.field('type', { type: PokemonType });
    t.int('damage');
  },
});

export const PokemonEvolutionRequirement = objectType({
  name: 'EvolutionRequirement',
  description:
    'Requirement that prevents an evolution through regular means of levelling up.',
  definition(t) {
    t.int('amount');
    t.string('name');
  },
});

export const PokemonDimension = objectType({
  name: 'PokemonDimension',
  definition(t) {
    t.string('minimum');
    t.string('maximum');
  },
});

export const PokemonAttackConnection = objectType({
  name: 'AttacksConnection',
  definition(t) {
    t.list.field('fast', { type: PokemonAttack });
    t.list.field('special', { type: PokemonAttack });
  },
});

export const Pokemon = objectType({
  name: 'Pokemon',
  sourceType: {
    module: __filename,
    export: 'RawPokemon',
  },
  definition(t) {
    t.id('id', { nullable: false });
    t.string('name', { nullable: false });
    t.string('classification');
    t.list.field('types', { type: PokemonType });
    t.list.field('resistant', { type: PokemonType });
    t.list.field('weaknesses', { type: PokemonType });
    t.list.field('evolutionRequirements', {
      type: PokemonEvolutionRequirement,
    });
    t.field('weight', { type: PokemonDimension });
    t.field('height', { type: PokemonDimension });
    t.field('attacks', { type: PokemonAttackConnection });

    t.float('fleeRate', {
      description: 'Likelihood of an attempt to catch a Pokémon to fail.',
    });
    t.int('maxCP', {
      description: 'Maximum combat power a Pokémon may achieve at max level.',
    });
    t.int('maxHP', {
      description: 'Maximum health points a Pokémon may achieve at max level.',
    });

    t.list.field('evolutions', {
      type: Pokemon,
      resolve(parent) {
        const evolutions = pokemonById.get(parent.id)?.evolutions;
        if (!evolutions) return null;

        return evolutions
          .map((evolution) => {
            const id = `${evolution.id}`.padStart(3, '0');
            return pokemonById.get(id)!;
          })
          .filter((evolution) => evolution != null);
      },
    });
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('pokemons', {
      type: Pokemon,
      description: 'List out all Pokémon, optionally in pages',
      args: {
        limit: intArg(),
        skip: intArg(),
      },
      resolve(_, { limit, skip }) {
        let list = pokemonList;
        if (skip != null) list = list.slice(skip);
        if (limit != null) list = list.slice(0, limit);
        return list;
      },
    });

    t.field('pokemon', {
      type: Pokemon,
      description:
        'Get a single Pokémon by its ID, a three character long identifier padded with zeroes',
      args: {
        id: nonNull(idArg()),
      },
      resolve(_, { id }) {
        return pokemonById.get(id) || null;
      },
    });
  },
});
