import { FastifyPluginCallback } from 'fastify';
import { declarativeWrappingPlugin, makeSchema } from 'nexus';
import upload from 'mercurius-upload';
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
    schema: path.join(__dirname, '__generated/schema.gen.graphql'),
    typegen: path.join(__dirname, '__generated/nexus.gen.ts'),
  },
});

const plugin: FastifyPluginCallback = (instance, _opts, next) => {
  instance.register(upload, {
    maxFileSize: 100 * 1024, // 100kB
    maxFiles: 1,
  });

  instance.register(mercurius, {
    prefix: '/graphql',
    path: '/uploads-mock',
    schema,
    jit: 10,
  });

  next();
};

export default plugin;
