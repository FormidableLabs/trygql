import { FastifyPluginCallback } from 'fastify';
import { declarativeWrappingPlugin, makeSchema } from 'nexus';
import { resolverCachePlugin } from '@trygql/api/nexus';
import mercurius from 'mercurius';
import * as path from 'path';
import Keyv from 'keyv';

import * as types from './schema';

const plugin: FastifyPluginCallback = (instance) => {
  const schema = makeSchema({
    types,
    plugins: [
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
          module: path.join(__dirname, 'data/metaweather.ts'),
          alias: 'metaweather',
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

  const cache = new Keyv<string>({
    store: instance.store,
    namespace: 'persisted-query',
  });

  const persistedQueryProvider: mercurius.PersistedQueryProvider = {
    ...mercurius.persistedQueryDefaults.automatic(),
    getQueryFromHash: async (hash: string) => {
      return (await cache.get(hash))!;
    },
    saveQuery: async (hash: string, query: string) => {
      await cache.set(hash, query);
    },
  };

  return mercurius(instance, {
    persistedQueryProvider,
    context: request => request.ctx,
    prefix: '/graphql',
    path: '/apq-weather',
    schema,
    jit: 10,
  });
};

export default plugin;
