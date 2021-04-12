import { FastifyPluginCallback } from 'fastify';
import { connectionPlugin, declarativeWrappingPlugin, makeSchema } from 'nexus';
import mercurius from 'mercurius';
import * as path from 'path';

import { migrate } from '@trygql/api/utils/prisma-migrate';
import * as types from './schema';

const schema = makeSchema({
  types,
  plugins: [
    connectionPlugin({ includeNodesField: true }),
    declarativeWrappingPlugin(),
  ],
  prettierConfig: {
    singleQuote: true,
    trailingComma: 'es5',
  },
  sourceTypes: {
    modules: [
      {
        module: path.join(
          __dirname,
          '../../node_modules/@prisma/client__web-collections/index.d.ts'
        ),
        alias: 'prisma',
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

const plugin: FastifyPluginCallback = (instance, _, done) => {
  instance.register(migrate, {
    schemaPath: 'node_modules/@prisma/client__web-collections/schema.prisma',
    database: 'web-collections',
  });

  instance.register(mercurius, {
    context: (request) => request.ctx,
    prefix: '/graphql',
    path: '/web-collections',
    schema,
    jit: 10,
  });

  done();
};

export default plugin;
