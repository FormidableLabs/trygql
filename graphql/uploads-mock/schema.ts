import * as stream from 'stream';
import { promisify } from 'util';
import { nonNull, objectType } from 'nexus';
import { GraphQLUpload } from 'graphql-upload';
import { writableNoopStream } from 'noop-stream';

const pipeline = promisify(stream.pipeline);

export const Upload = GraphQLUpload;

export const Limitations = objectType({
  name: 'Limitations',
  description: 'Describes the upload limitations of this demo schema.',
  definition(t) {
    t.int('maxFiles', { required: true });
    t.string('maxFileSize', { required: true });
  },
});

export const UploadResult = objectType({
  name: 'UploadResult',
  definition(t) {
    t.string('filename');
    t.string('mimetype');
    t.string('encoding');
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('limitations', {
      type: Limitations,
      description: 'Get the upload limitations of this demo schema.',
      resolve: () => ({
        maxFiles: 1,
        maxFileSize: '100kB',
      }),
    });
  },
});

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('uploadFile', {
      type: UploadResult,
      description: 'Upload a file to the demo schema. This file will not be stored.',
      args: {
        file: nonNull(Upload),
      },
      async resolve(_, { file }) {
        const { filename, mimetype, encoding, createReadStream } = await file;

        let bytes = 0;

        const fileStream = createReadStream()
          .on('data', (data: Buffer | string) => {
            bytes += data.length;
            if (bytes > 1024 * 100 /* 100kB */)
              throw new Error('File size limit of 100kB exceeded.');
          });

        await pipeline(fileStream, writableNoopStream());

        return { filename, mimetype, encoding };
      },
    });
  },
});
