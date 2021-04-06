import ms from 'ms';
import fp from 'fastify-plugin';
import QuickLRU from 'quick-lru';
import CacheableLookup from 'cacheable-lookup';
import { FastifyPluginCallback } from 'fastify';
import { Store } from 'keyv';
import { RedisStore } from './stores/redis';

export interface Context {
  store: Store<any> | undefined;
  lookup: CacheableLookup;
}

declare module 'fastify' {
  interface FastifyRequest {
    ctx: Context;
  }

  interface FastifyInstance {
    store: Store<any> | undefined;
  }
}

const redisURL = process.env.FLY_REDIS_CACHE_URL;
const MIN_TTL = ms('30m');

const contextPlugin: FastifyPluginCallback = (instance, _, next) => {
  const store = redisURL
    ? new RedisStore(instance, { uri: redisURL, minTtl: MIN_TTL })
    : undefined;

  const lookup = new CacheableLookup({
    cache: new QuickLRU({ maxSize: 1000 }) as any,
    maxTtl: ms('1h') / 1000,
  });

  instance.decorate('store', store);
  instance.decorateRequest('ctx', null);

  instance.addHook('preHandler', (request, _reply, done) => {
    request.ctx = { store, lookup };
    done();
  });

  return next();
};

export default fp(contextPlugin);
