import { FastifyPluginCallback } from 'fastify';
import execa from 'execa';

export interface Options {
  database: string;
  schemaPath: string;
}

export const migrate: FastifyPluginCallback<Options> = (
  instance,
  opts,
  next
) => {
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    instance.addHook('onReady', async () => {
      try {
        instance.log.warn(`Migrating Prisma database: ${opts.database}`);

        await execa.node(
          require.resolve('prisma'),
          [
            'db',
            'push',
            '--preview-feature',
            '--skip-generate',
            `--schema=${opts.schemaPath}`,
          ],
          {
            env: {
              ...process.env,
              DATABASE_URL: `${process.env.DATABASE_URL}/${opts.database}`,
            },
          }
        );
      } catch (error) {
        instance.log.error(error.shortMessage);
        instance.log.error(error.stderr);
      }
    });
  } else {
    instance.log.info('Prisma Migration skipped.');
  }

  return next();
};
