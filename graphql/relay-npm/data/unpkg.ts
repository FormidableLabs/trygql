import got from 'got';
import { dnsCache } from '@trygql/api/stores/dnsCache';

const BASE_URL = 'https://unpkg.com';

const unpkg = got.extend({
  prefixUrl: BASE_URL,
  responseType: 'json',
  dnsCache,
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
  name: string,
  version: string
): Promise<UnpkgFile[]> => {
  try {
    const path = `${name}@${version}`;
    const meta: UnpkgDirectory = await unpkg
      .get(`${path}/?meta`)
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
