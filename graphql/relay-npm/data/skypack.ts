import { got } from '@trygql/api/got';

const skypack = got.extend({
  prefixUrl: 'https://cdn.skypack.dev',
});

export interface AssetExport {
  type: 'ASSET';
  id: string;
}

export interface JSExport {
  type: 'JS';
  id: string;
  hasDefaultExport: boolean;
  optimized: boolean;
  namedExports: string[];
}

export type Export = AssetExport | JSExport;

export interface Exports {
  name: string;
  version: string;
  buildId: string;
  buildStatus: string;
  packageExports: Record<string, Export>;
}

export const getMetadata = async (
  name: string,
  version: string
): Promise<Exports | null> => {
  try {
    return await skypack
      .get(`${name}@${version}/?meta`)
      .json();
  } catch (error) {
    if (error.response && error.response.statusCode === 404) return null;
    throw error;
  }
};
