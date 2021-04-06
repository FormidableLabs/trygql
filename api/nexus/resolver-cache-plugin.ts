import { plugin } from 'nexus';
import Keyv, { Store } from 'keyv';
import murmurhash from 'murmurhash';

const seen = new Set();
const cache = new WeakMap();

const stringify = (x: any): string => {
  if (x === null || seen.has(x)) {
    return 'null';
  } else if (typeof x !== 'object') {
    return JSON.stringify(x) || '';
  } else if (x.toJSON) {
    return stringify(x.toJSON());
  } else if (Array.isArray(x)) {
    let out = '[';
    for (let i = 0, l = x.length; i < l; i++) {
      if (i > 0) out += ',';
      const value = stringify(x[i]);
      out += value.length > 0 ? value : 'null';
    }

    out += ']';
    return out;
  }

  const keys = Object.keys(x).sort();
  if (!keys.length && x.constructor && x.constructor !== Object) {
    const key = cache.get(x) || Math.random().toString(36).slice(2);
    cache.set(x, key);
    return `{"__key":"${key}"}`;
  }

  seen.add(x);
  let out = '{';
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const value = stringify(x[key]);
    if (value) {
      if (out.length > 1) out += ',';
      out += stringify(key) + ':' + value;
    }
  }

  seen.delete(x);
  out += '}';
  return out;
};

const hash = (x: any): number => {
  const json = stringify(x);
  seen.clear();
  return murmurhash(json);
};

interface ResolverCachePluginApi {
  ttl?: number;
}

export interface ResolverCachePluginConfig {
  cache?: Store<any>;
}

export const resolverCachePlugin = (config: ResolverCachePluginConfig) => {
  const store = new Keyv({
    namespace: 'nexus_resolver_cache',
    store: config.cache,
  });

  return plugin({
    name: 'resolverCachePlugin',
    description: 'Caching for individual field resolvers.',
    fieldDefTypes: [
      '/**\nThe TTL (time to live) for the given field’s cached results.\n */\n'
        + 'ttl?: number',
    ],
    onCreateFieldResolver(config) {
      const options = config.fieldConfig.extensions?.nexus?.config as ResolverCachePluginApi;
      if (!options || typeof options.ttl !== 'number') return;

      const { ttl } = options;

      const parentTypeName = config.parentTypeConfig.name;
      const fieldName = config.fieldConfig.name;
      const resolverName = `${parentTypeName}.${fieldName}`;

      return async (root, args, ctx, info, next) => {
        const rootKey = hash(root);
        const argsKey = hash(args);
        const cacheKey = `${resolverName}.${rootKey}.${argsKey}`;
        const cacheEntry = await store.get(cacheKey);
        if (cacheEntry != null) {
          return cacheEntry;
        }

        const value = await next(root, args, ctx, info);
        await store.set(cacheKey, value, ttl);
        return value;
      };
    },
  });
};
