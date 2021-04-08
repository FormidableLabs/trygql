import ms from 'ms';
import fp from 'fastify-plugin';
import * as jwt from 'jsonwebtoken';
import { FastifyPluginCallback } from 'fastify';
import { Store } from 'keyv';
import { RedisStore } from './stores/redis';

export interface TokenClaims {
  exp?: number;
  sub: string;
}

export interface Context {
  store: Store<any> | undefined;
  verifyClaims(ignoreExpiration?: boolean): TokenClaims | null;
  createToken(claims: TokenClaims): string;
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
const secretToken = process.env.JWT_SECRET || 'secret:trygql.dev';
const MIN_TTL = ms('30m');

export const createToken = (claims: TokenClaims): string => {
  const payload: TokenClaims = {
    exp: Math.floor((Date.now() + ms('1h')) / 1000),
    ...claims,
  };

  return jwt.sign(payload, secretToken);
};

const verifyToken = (token: string | undefined, ignoreExpiration?: boolean): TokenClaims | null => {
  try {
    return token
      ? jwt.verify(token.replace(/^Bearer\s+/g, ''), secretToken, { ignoreExpiration }) as TokenClaims
      : null;
  } catch (_error) {
    return null;
  }
};

const contextPlugin: FastifyPluginCallback = (instance, _, next) => {
  const store = redisURL
    ? new RedisStore(instance, { uri: redisURL, minTtl: MIN_TTL })
    : undefined;

  instance.decorate('store', store);
  instance.decorateRequest('ctx', null);

  instance.addHook('preHandler', (request, _response, done) => {
    let claims: TokenClaims | null | void;

    request.ctx = {
      store,
      createToken,
      verifyClaims: (ignoreExpiration?: boolean) => {
        return claims === undefined
          ? (claims = verifyToken(request.headers['authorization'], ignoreExpiration))
          : claims;
      },
    };

    done();
  });

  return next();
};

export default fp(contextPlugin);
