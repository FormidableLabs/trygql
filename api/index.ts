import Fastify from 'fastify';
import * as path from 'path';
import * as fs from 'fs';
import serve from 'fastify-static';
import ms from 'ms';

import underPressure from 'under-pressure';
import headers from './headers';
import context from './context';

import basicPokedex from '@trygql/basic-pokedex';
import intermittentColors from '@trygql/intermittent-colors';
import relayNpm from '@trygql/relay-npm';
import apqWeather from '@trygql/apq-weather';
import uploadsMock from '@trygql/uploads-mock';
import webCollections from '@trygql/web-collections';

const indexPath = path.join(process.cwd(), 'page/dist/index.html');
const indexFile = fs.promises.readFile(indexPath);

const app = Fastify({
  logger: {
    level: 'warn',
  }
});

app.register(headers);
app.register(context);
app.register(underPressure, { maxEventLoopDelay: 1000 });

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
  res.code(200).type('text/html').send(await indexFile);
});

app.register(serve, {
  root: path.join(process.cwd(), 'page/dist/assets/'),
  prefix: '/assets/',
  immutable: true,
  maxAge: ms('7d'),
});

app.listen(process.env.PORT || 8080, '0.0.0.0')
  .catch(error => {
    if (error.errors) {
      error.errors.forEach((error: Error) => console.error(error.toString()));
    } else {
      console.error(error.toString());
    }

    process.exit(1);
  });
