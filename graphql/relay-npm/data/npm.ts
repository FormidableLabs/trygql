import got from 'got';
import ms from 'ms';
import * as semver from 'semver';
import { Context } from '@trygql/api/context';

const npm = got.extend({
  prefixUrl: 'https://registry.npmjs.org',
  responseType: 'json',
  cacheOptions: {
    shared: false,
    cacheHeuristic: 1,
    immutableMinTimeToLive: ms('1h'),
    ignoreCargoCult: true,
  },
});

export interface User {
  name: string;
  email?: string;
  url?: string;
}

export interface External {
  type?: string;
  url: string;
}

export interface Distributable {
  shasum: string;
  tarball: string;
  integrity?: string;
  fileCount?: number;
  unpackedSize?: number;
  'npm-signature'?: string;
}

export interface Metadata {
  _id: string;
  name: string;
  maintainers: User[];
  description?: string;
  license?: string;
  repository?: External;
  bugs?: External;
}

export interface Version extends Metadata {
  _shasum: string;
  _npmUser: User;
  dist: Distributable;
  version: string;
  licenseText?: string;
  peerDependencies?: Record<string, string>;
  devDependendencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  main?: string;
  module?: string;
}

export interface Package extends Metadata {
  _rev: string;
  'dist-tags': Record<string, string>;
  readme: string;
  readmeFilename: string;
  time: { created: string; modified: string; [tag: string]: string };
  versions: Record<string, Version>;
}

export const getPackage = async (
  context: Context,
  name: string
): Promise<Package | null> => {
  try {
    const { store: cache } = context;
    return await npm.get(name, { cache }).json();
  } catch (error) {
    if (error.response && error.response.statusCode === 404) return null;
    throw error;
  }
};

interface SearchPackageEdge {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  date: string;
  publisher: User;
  maintainers: User[];
}

interface SearchScore {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
}

interface SearchResult {
  package: SearchPackageEdge;
  score: SearchScore;
  searchScore: number;
}

interface SearchPage {
  objects: SearchResult[];
  total: number;
}

export const searchPackage = async (context: Context, args: {
  query: string;
  first: number;
  after?: string | null | undefined;
}): Promise<(Package | null)[]> => {
  const { store: cache } = context;
  const from = args.after ? parseInt(args.after, 10) : 0;
  const result: SearchPage = await npm
    .get('/-/v1/search', {
      cache,
      searchParams: {
        text: args.query,
        size: args.first,
        from,
      },
    })
    .json();

  return await Promise.all(
    result.objects.map((object) => getPackage(context, object.package.name))
  );
};

export const resolveVersion = (
  packument: Package,
  selector: string
): Version | null => {
  let version: string | null = null;
  let range: string | null = null;
  if (!selector || selector === 'latest') {
    version = packument['dist-tags']['latest'];
  } else if ((version = semver.valid(selector, true))) {
    version = semver.clean(version, true);
  } else if ((range = semver.validRange(selector, true))) {
    version = null;
  } else if ((version = packument['dist-tags'][selector])) {
    range = null;
  }

  if (range && !version) {
    const versions = Object.keys(packument.versions).filter((v) =>
      semver.valid(v, true)
    );
    version = semver.maxSatisfying(versions, range, true);
  }

  if (!version || !packument.versions[version]) return null;
  return packument.versions[version];
};
