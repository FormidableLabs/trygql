import Fastify from 'fastify';
import cors from 'fastify-cors';
import underPressure from 'under-pressure';

import basicPokedex from './basic-pokedex';
import intermittentColors from './intermittent-colors';
import relayNpm from './relay-npm';

const app = Fastify();

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 60 * 60 * 24,
});

app.register(underPressure, {
  maxEventLoopDelay: 1000,
});

app.get('/health', (_req, res) => {
  res.code(200).send({ statusCode: 200, status: 'ok' });
});

app.register(basicPokedex);
app.register(intermittentColors);
app.register(relayNpm);

(async () => {
  try {
    await app.listen(process.env.PORT || 8080, '0.0.0.0');
    app.log.info(`server listening on ${app.server.address()}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
