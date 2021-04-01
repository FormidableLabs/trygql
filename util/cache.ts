import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

const isProduction = process.env.NODE_ENV === 'production';
const redisUrl = process.env.FLY_REDIS_CACHE_URL;

let redis: KeyvRedis;
if (isProduction && redisUrl) {
  redis = new KeyvRedis(redisUrl);
}

const stores = new Map<string, Keyv>();

export function getCacheForPrefix<T>(namespace: string): Keyv<T> {
  if (stores.has(namespace)) {
    return stores.get(namespace)!;
  }

  const store = new Keyv({ store: redis, namespace }) as Keyv<any>;
  stores.set(namespace, store);
  return store;
}
