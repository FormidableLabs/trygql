import { FastifyPluginCallback } from 'fastify';
import { connectionPlugin, declarativeWrappingPlugin, makeSchema } from 'nexus';
import { resolverCachePlugin } from '@trygql/api/nexus';
import mercurius from 'mercurius';
import * as path from 'path';

import * as types from './schema';

const plugin: FastifyPluginCallback = (instance) => {
  const schema = makeSchema({
    types,
    plugins: [
      connectionPlugin({ includeNodesField: true }),
      declarativeWrappingPlugin(),
      resolverCachePlugin({ cache: instance.store }),
    ],
    prettierConfig: {
      singleQuote: true,
      trailingComma: 'es5',
    },
    sourceTypes: {
      modules: [
        {
          module: path.join(__dirname, 'data/npm.ts'),
          alias: 'npm',
        },
        {
          module: path.join(__dirname, 'data/unpkg.ts'),
          alias: 'unpkg',
        },
      ],
    },
    contextType: {
      module: '@trygql/api/context',
      export: 'Context',
    },
    outputs: {
      schema: path.join(__dirname, '__generated/schema.gen.graphql'),
      typegen: path.join(__dirname, '__generated/nexus.gen.ts'),
    },
  });

  return mercurius(instance, {
    context: request => request.ctx,
    prefix: '/graphql',
    path: '/relay-npm',
    schema,
    jit: 10,
  });
};

export default plugin;
