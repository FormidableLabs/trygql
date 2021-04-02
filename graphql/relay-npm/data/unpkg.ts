import got from 'got';
import { getCacheForPrefix } from './cache';

const PKG_URL = 'https://unpkg.com';
const cache = getCacheForPrefix('npm');

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
    const url = `${PKG_URL}/${name}@${version}`;
    const meta: UnpkgDirectory = await got
      .get(`${url}/?meta`, { cache })
      .json();
    const files = collectFiles(meta);

    return files.map((file) => {
      file.url = `${url}${file.path}`;
      return file;
    });
  } catch (error) {
    if (error.response && error.response.statusCode === 404) return [];
    throw error;
  }
};
