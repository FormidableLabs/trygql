import { FastifyPluginCallback } from 'fastify';
import { connectionPlugin, declarativeWrappingPlugin, makeSchema } from 'nexus';
import mercurius from 'mercurius';
import * as path from 'path';

import * as types from './schema';

const schema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  plugins: [
    connectionPlugin({ includeNodesField: true }),
    declarativeWrappingPlugin(),
  ],
  prettierConfig: {
    singleQuote: true,
    trailingComma: 'es5',
  },
  outputs: {
    schema: path.join(__dirname, 'schema.gen.graphql'),
    typegen: path.join(__dirname, 'nexus.gen.ts'),
  },
});

const plugin: FastifyPluginCallback = (instance) =>
  mercurius(instance, {
    prefix: '/graphql',
    path: '/relay-npm',
    schema,
    jit: 10,
  });

export default plugin;
