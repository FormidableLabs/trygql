import got from 'got';
import * as semver from 'semver';

import { getCacheForPrefix } from './cache';

const REGISTRY_URL = 'https://registry.npmjs.org';
const cache = getCacheForPrefix('npm');

export interface NpmUser {
  name: string;
  email?: string;
  url?: string;
}

export interface NpmExternal {
  type?: string;
  url: string;
}

export interface NpmDistributable {
  shasum: string;
  tarball: string;
  integrity?: string;
  fileCount?: number;
  unpackedSize?: number;
  'npm-signature'?: string;
}

export interface NpmMetadata {
  _id: string;
  name: string;
  maintainers: NpmUser[];
  description?: string;
  license?: string;
  repository?: NpmExternal;
  bugs?: NpmExternal;
}

export interface NpmVersion extends NpmMetadata {
  _shasum: string;
  _npmUser: NpmUser;
  dist: NpmDistributable;
  version: string;
  licenseText?: string;
  peerDependencies?: Record<string, string>;
  devDependendencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  main?: string;
  module?: string;
}

export interface NpmPackage extends NpmMetadata {
  _rev: string;
  'dist-tags': Record<string, string>;
  readme: string;
  readmeFilename: string;
  time: { created: string; modified: string; [tag: string]: string };
  versions: Record<string, NpmVersion>;
}

export const getPackage = async (name: string): Promise<NpmPackage | null> => {
  try {
    return await got.get(`${REGISTRY_URL}/${name}`, { cache }).json();
  } catch (error) {
    if (error.response && error.response.statusCode === 404) return null;
    throw error;
  }
};

interface NpmSearchPackageEdge {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  date: string;
  publisher: NpmUser;
  maintainers: NpmUser[];
}

interface NpmSearchScore {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
}

interface NpmSearchResult {
  package: NpmSearchPackageEdge;
  score: NpmSearchScore;
  searchScore: number;
}

interface NpmSearchPage {
  objects: NpmSearchResult[];
  total: number;
}

export const searchPackage = async (args: {
  query: string;
  first: number;
  after?: string | null | undefined;
}): Promise<(NpmPackage | null)[]> => {
  const from = args.after ? parseInt(args.after, 10) : 0;

  const result: NpmSearchPage = await got
    .get(`${REGISTRY_URL}/-/v1/search`, {
      searchParams: {
        text: args.query,
        size: args.first,
        from,
      },
    })
    .json();

  return await Promise.all(
    result.objects.map((object) => getPackage(object.package.name))
  );
};

export const resolveVersion = (
  packument: NpmPackage,
  selector: string
): NpmVersion | null => {
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
