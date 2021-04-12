import { FastifyPluginCallback } from 'fastify';
import { declarativeWrappingPlugin, makeSchema } from 'nexus';
import mercurius from 'mercurius';
import * as path from 'path';

import * as types from './schema';

const schema = makeSchema({
  types,
  plugins: [declarativeWrappingPlugin()],
  prettierConfig: {
    singleQuote: true,
    trailingComma: 'es5',
  },
  sourceTypes: {
    modules: [
      {
        module: path.join(__dirname, 'data/pokemons.ts'),
        alias: 'pokemons',
      },
    ],
  },
  outputs: {
    schema: path.join(__dirname, '__generated/schema.gen.graphql'),
    typegen: path.join(__dirname, '__generated/nexus.gen.ts'),
  },
});

const plugin: FastifyPluginCallback = (instance) =>
  mercurius(instance, {
    prefix: '/graphql',
    path: '/basic-pokedex',
    schema,
    jit: 10,
  });

export default plugin;
