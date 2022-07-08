import Fastify from 'fastify';
import * as path from 'path';
import * as fs from 'fs';
import serve from 'fastify-static';
import ms from 'ms';

import underPressure, {
  TYPE_EVENT_LOOP_DELAY,
  TYPE_EVENT_LOOP_UTILIZATION,
  TYPE_HEALTH_CHECK,
  TYPE_HEAP_USED_BYTES,
  TYPE_RSS_BYTES,
} from 'under-pressure';
import headers from './headers';
import context from './context';

import basicPokedex from '@trygql/basic-pokedex';
import intermittentColors from '@trygql/intermittent-colors';
import relayNpm from '@trygql/relay-npm';
import apqWeather from '@trygql/apq-weather';
import uploadsMock from '@trygql/uploads-mock';
import webCollections from '@trygql/web-collections';

const bootApp = async () => {
  const indexPath = path.join(process.cwd(), 'page/dist/index.html');
  const indexFile = await fs.promises.readFile(indexPath);

  const app = Fastify({
    logger: {
      level: 'warn',
    },
    pluginTimeout: 2 * 60 * 1000, // 2 minutes
  });

  app.register(headers);
  app.register(context);
  app.register(underPressure, {
    maxEventLoopDelay: 1000,
    pressureHandler: (req, rep, type, value) => {
      switch (type) {
        case TYPE_HEAP_USED_BYTES:
          app.log.warn(`too many heap bytes used: ${value}`);
          break;
        case TYPE_RSS_BYTES:
          app.log.warn(`too many rss bytes used: ${value}`);
          break;
        case TYPE_EVENT_LOOP_UTILIZATION:
          app.log.warn(`too much event loop utilization: ${value}`);
          break;
        case TYPE_EVENT_LOOP_DELAY:
          app.log.warn(`event loop delay exceeded threshold: ${value}`);
          break;
        case TYPE_HEALTH_CHECK:
          app.log.warn(`failed health check`);
          break;
      }

      rep.send('Whoops, out of memory');
    },
  });

  app.register(basicPokedex);
  app.register(intermittentColors);
  app.register(relayNpm);
  app.register(apqWeather);
  app.register(uploadsMock);
  app.register(webCollections);

  app.get('/health', (_req, res) => {
    res.code(200).send({ statusCode: 200, status: 'ok' });
  });

  app.get('/favicon.ico', (_req, res) => {
    res.code(404).header('cache-control', 'max-age=604800').send();
  });

  app.get('/', async (_req, res) => {
    res.code(200).type('text/html').send(indexFile);
  });

  app.register(serve, {
    root: path.join(process.cwd(), 'page/dist/assets/'),
    prefix: '/assets/',
    immutable: true,
    maxAge: ms('7d'),
  });

  app
    .listen(process.env.PORT || 8080, '0.0.0.0')
    .then(() => {
      app.log.info(`App listening on port ${process.env.PORT || 8080}`);
    })
    .catch((error) => {
      if (error.errors) {
        error.errors.forEach((error: Error) => app.log.error(error.toString()));
      } else {
        app.log.error(error.toString());
      }

      process.exit(1);
    });
};

bootApp().catch((err) => {
  console.error(`App failed to start ${err}`);
});
