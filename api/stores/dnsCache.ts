import ms from 'ms';
import CacheableLookup from 'cacheable-lookup';
import QuickLRU from 'quick-lru';

export const dnsCache = new CacheableLookup({
  cache: new QuickLRU({ maxSize: 1000 }) as any,
  maxTtl: ms('1h') / 1000,
});
