import fp from 'fastify-plugin';
import { FastifyPluginCallback } from 'fastify';
import { Store } from 'keyv';
import { RedisStore } from './stores/redis';

export interface Context {
  store: Store<any> | undefined;
}

declare module 'fastify' {
  interface FastifyRequest {
    ctx: Context;
  }
}

const redisURL = process.env.FLY_REDIS_CACHE_URL;

const contextPlugin: FastifyPluginCallback = (instance, _, next) => {
  const store = redisURL
    ? new RedisStore(instance, redisURL)
    : undefined;

  instance.decorateRequest('ctx', null);
  instance.addHook('preHandler', (request, _reply, done) => {
    request.ctx = { store };
    done();
  });

  return next();
};

export default fp(contextPlugin);
