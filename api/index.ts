import Fastify from 'fastify';

import underPressure from 'under-pressure';
import headers from './headers';
import context from './context';

import basicPokedex from '@trygql/basic-pokedex';
import intermittentColors from '@trygql/intermittent-colors';
import relayNpm from '@trygql/relay-npm';

const app = Fastify();

app.register(headers);
app.register(context);
app.register(underPressure, { maxEventLoopDelay: 1000 });

app.register(basicPokedex);
app.register(intermittentColors);
app.register(relayNpm);

app.get('/health', (_req, res) => {
  res.code(200).send({ statusCode: 200, status: 'ok' });
});

app.listen(process.env.PORT || 8080, '0.0.0.0');
