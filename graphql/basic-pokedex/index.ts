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
  outputs: {
    schema: path.join(__dirname, '__generated/schema.graphql'),
    typegen: path.join(__dirname, '__generated/nexus.ts'),
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
