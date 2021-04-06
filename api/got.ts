import HttpAgent from 'agentkeepalive';
import CacheableLookup from 'cacheable-lookup';
import QuickLRU from 'quick-lru';
import ms from 'ms';
import gotBase from 'got';

export const dnsCache = new CacheableLookup({
  cache: new QuickLRU({ maxSize: 1000 }) as any,
  maxTtl: ms('1h') / 1000,
});

const { HttpsAgent } = HttpAgent;

export const got = gotBase.extend({
  responseType: 'json',
  dnsCache,
  headers: {
    accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*',
  },
  agent: {
		http: new HttpAgent(),
		https: new HttpsAgent()
	},
});


