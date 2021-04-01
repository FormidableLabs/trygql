import fp from 'fastify-plugin';
import { FastifyPluginCallback, FastifyReply } from 'fastify';
import { append } from 'vary';

// https://github.com/fastify/fastify-sensible/blob/master/lib/vary.js
const vary = (reply: FastifyReply, field: string) => {
  let value = reply.getHeader('Vary') || '';
  const header = Array.isArray(value) ? value.join(', ') : `${value}`;
  if ((value = append(header, field))) {
    reply.header('Vary', value);
  }
};

const headersPlugin: FastifyPluginCallback = (instance, _, next) => {
  instance.addHook('onRequest', (_req, reply, next) => {
    reply
      .header('referrer-policy', 'origin')
      .header('strict-transport-security', 'max-age=15552000')
      .header('fly-region', process.env.FLY_REGION || 'local')
      .header('access-control-allow-origin', '*');

    return next();
  });

  instance.options('*', (req, reply) => {
    vary(reply, 'Access-Control-Request-Headers');

    const reqAllowedHeaders = req.headers['access-control-request-headers'];
    if (reqAllowedHeaders) {
      reply.header('Access-Control-Allow-Headers', reqAllowedHeaders);
    }

    reply
      .status(204)
      .header('Access-Control-Allow-Credentials', 'true')
      .header('Access-Control-Allow-Methods', 'GET,POST')
      .header('Access-Control-Max-Age', '15552000')
      .header('Content-Length', '0')
      .send();
  });

  return next();
};

export default fp(headersPlugin);
