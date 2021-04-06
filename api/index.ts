import Fastify from 'fastify';

import underPressure from 'under-pressure';
import headers from './headers';
import context from './context';

import basicPokedex from '@trygql/basic-pokedex';
import intermittentColors from '@trygql/intermittent-colors';
import relayNpm from '@trygql/relay-npm';
import apqWeather from '@trygql/apq-weather';

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

app.get('/health', (_req, res) => {
  res.code(200).send({ statusCode: 200, status: 'ok' });
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
