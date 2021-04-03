import got from 'got';
import ms from 'ms';
import { Context } from '@trygql/api/context';

const BASE_URL = 'https://unpkg.com';

const unpkg = got.extend({
  prefixUrl: BASE_URL,
  responseType: 'json',
  cacheOptions: {
    shared: false,
    cacheHeuristic: 1,
    immutableMinTimeToLive: ms('1h'),
    ignoreCargoCult: true,
  },
});

export interface UnpkgFile {
  path: string;
  url?: string;
  type: 'file';
  contentType: string;
  integrity: string;
  lastModified: string;
  size: number;
}

export interface UnpkgDirectory {
  path: string;
  type: 'directory';
  files: Array<UnpkgFile | UnpkgDirectory>;
}

const collectFiles = (directory: UnpkgDirectory, files: UnpkgFile[] = []) => {
  for (let i = 0, l = directory.files.length; i < l; i++) {
    const item = directory.files[i];
    if (item.type === 'directory') {
      collectFiles(item, files);
    } else {
      files.push(item);
    }
  }

  return files;
};

export const getFiles = async (
  context: Context,
  name: string,
  version: string
): Promise<UnpkgFile[]> => {
  try {
    const { store: cache } = context;
    const path = `/${name}@${version}`;
    const meta: UnpkgDirectory = await unpkg
      .get(`${path}/?meta`, { cache })
      .json();
    const files = collectFiles(meta);

    return files.map((file) => {
      file.url = `${BASE_URL}${path}${file.path}`;
      return file;
    });
  } catch (error) {
    if (error.response && error.response.statusCode === 404) return [];
    throw error;
  }
};
