import { promisify } from 'util';
import { CookieJar } from 'tough-cookie';
import { WritableStream as Parser } from 'htmlparser2/lib/WritableStream';
import normalizeURL from 'normalize-url';
import isAbsoluteURL from 'is-absolute-url';
import * as stream from 'stream';
import ms from 'ms';

import { got } from '@trygql/api/got';
import { NoMetaError } from './errors';

const pipeline = promisify(stream.pipeline);

const fetch = got.extend({
  headers: {
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
    'accept-language': 'en-US,en;q=0.5',
    'cache-control': 'max-age=0',
  },
  timeout: {
    socket: ms('500ms'),
    request: ms('2s'),
  },
  http2: false,
  decompress: true,
  dnsLookupIpVersion: 'ipv4',
  ignoreInvalidCookies: true,
  https: {
    rejectUnauthorized: false,
  },
  retry: {
    limit: 2,
  },
});

interface Meta {
  canonical: string;
  icon?: string;
  description?: string;
  'theme-color'?: string;
  'og:title'?: string;
  'og:description'?: string;
  'og:type'?: string;
  'og:image'?: string;
  'og:image:alt'?: string;
  'og:image:width'?: string;
  'og:image:height'?: string;
  'og:site_name'?: string;
  'twitter:card'?: string;
  'twitter:creator'?: string;
  'twitter:title'?: string;
  'twitter:description'?: string;
  'twitter:image'?: string;
  'twitter:image:src'?: string;
}

const constructURL = (baseUrl: string, pathOrUrl: string) =>
  normalizeURL(isAbsoluteURL(pathOrUrl) ? pathOrUrl : `${baseUrl}/${pathOrUrl}`);

const fetchMeta = async (url: string, canonical?: string): Promise<Meta | null> => {
  let baseUrl = (url = normalizeURL(url));

  const request = fetch.stream(url, { cookieJar: new CookieJar() });
  request.on('response', event => {
    if (event.url) baseUrl = normalizeURL(event.url);
  });

  const meta: Record<string, string> = {};

  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === 'body') {
        parser.end();
      } else if (name === 'meta' && attributes.content && (attributes.property || attributes.name)) {
        let content = `${attributes.content}`.trim();
        const prop = `${attributes.property || attributes.name}`.trim().toLowerCase();
        if (prop === 'og:image' || prop === 'twitter:image' || prop === 'twitter:image:src')
          content = constructURL(baseUrl, content);
        meta[prop] = content;
      } else if (name === 'link' && attributes.rel === 'icon') {
        meta.icon = constructURL(baseUrl, attributes.href);
      } else if (name === 'link' && attributes.rel === 'canonical') {
        meta.canonical = constructURL(baseUrl, attributes.href);
      }
    },
    onclosetag(name) {
      if (name === 'head') parser.end();
    },
  });

  try {
    await pipeline(request, parser);
  } catch (error) {
    if (/^https/.test(url) && /ECONNREFUSED|ETIMEDOUT/.test(error.message)) {
      return fetchMeta(url.replace(/^https/g, 'http'));
    } else if (!Object.keys(meta).length) {
      throw error;
    }
  }

  if (
    meta.canonical !== baseUrl &&
    meta.canonical !== url &&
    meta.canonical !== canonical
  ) {
    return fetchMeta(meta.canonical, baseUrl);
  }

  return Object.keys(meta).length
    ? { ...meta, canonical: baseUrl }
    : null;
};

export interface NormalizedMeta {
  canonicalUrl: string;
  title: string | undefined;
  description: string | undefined;
  image: string | undefined;
}

export const getMeta = async (url: string): Promise<NormalizedMeta> => {
  const meta = await fetchMeta(url);
  if (!meta) throw new NoMetaError(url);

  const title = meta['twitter:title'] || meta['og:title'] || undefined;
  const description = meta['twitter:description'] || meta['og:description'] || undefined;
  const image = meta['twitter:image'] || meta['twitter:image:src'] || meta['og:image'] || undefined;
  if (!title && !description && !image) throw new NoMetaError(url);

  return {
    canonicalUrl: meta.canonical,
    title,
    description,
    image,
  };
};
