import * as path from 'path';

import builtins from 'builtin-modules';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import typescript from 'rollup-plugin-typescript2';
import terser from 'terser';

const tryResolve = (str) => {
  try {
    return require.resolve(str);
  } catch (_error) {
    return null;
  }
};

const external = new Set([...builtins, '@prisma/client']);
const isExternal = (id) => external.has(id) || /^@prisma\/client/.test(id);

export default {
  input: path.join(__dirname, '../api/index.ts'),
  external: isExternal,
  plugins: [
    {
      resolveId(src, root) {
        if (
          /deps[/\\]encoding[/\\]encoding/g.test(src) &&
          /node_modules[/\\]busboy/g.test(root)
        ) {
          return this.resolve(require.resolve('./~text-encoding.js'), root);
        }

        return null;
      },
    },

    alias({
      entries: [
        { find: /^semver$/, replacement: tryResolve('semver') },
        { find: /^nexus$/, replacement: tryResolve('nexus') },
        { find: /^tiny-lru$/, replacement: tryResolve('tiny-lru') },
        {
          find: /^fast-json-stringify$/,
          replacement: tryResolve('fast-json-stringify'),
        },

        {
          find: /^bufferutil$/,
          replacement: tryResolve('bufferutil')
            ? `bufferutil${path.sep}fallback.js`
            : require.resolve('./~empty.js'),
        },
        {
          find: /^utf-8-validate$/,
          replacement: tryResolve('utf-8-validate')
            ? `utf-8-validate${path.sep}fallback.js`
            : require.resolve('./~empty.js'),
        },

        {
          find: /^fastify-plugin$/,
          replacement: require.resolve('fastify-plugin'),
        },

        {
          find: /^long([/\\].*|$)/,
          replacement: require.resolve('./~empty.js'),
        },
        {
          find: /^prettier([/\\].*|$)/,
          replacement: require.resolve('./~empty.js'),
        },

        !tryResolve('encoding') && {
          find: /^encoding$/,
          replacement: require.resolve('./~empty.js'),
        },

        !tryResolve('uglify-es') && {
          find: /^uglify-es([/\\].*|$)/,
          replacement: require.resolve('./~empty.js'),
        },

        { find: /^inherits$/, replacement: require.resolve('./~inherits.js') },
        { find: /^fsevents$/, replacement: require.resolve('./~fsevents.js') },

        {
          find: /(^|[/\\])readable-stream$/,
          replacement: require.resolve('./~readable-stream.js'),
        },
        {
          find: /(^|[/\\])readable-stream[/\\]duplex/,
          replacement: require.resolve('./~readable-stream-duplex.js'),
        },
      ].filter(Boolean),
    }),

    commonjs({
      exclude: [/\.mjs$/],
      ignore: builtins,
      transformMixedEsModules: true,
      ignoreTryCatch(id) {
        switch (id) {
          case 'long':
          case 'prettier':
          case 'pino-pretty':
          case 'supports-color':
            return 'remove';
          default:
            return true;
        }
      },
    }),

    resolve({
      preferBuiltins: true,
      extensions: ['.mjs', '.js', '.json', '.es6', '.node', '.ts'],
    }),

    json(),

    typescript({
      check: false,
      tsconfigOverride: {
        compilerOptions: {
          noEmit: false,
          declaration: false,
          module: 'es2020',
        },
      },
    }),

    replace({
      preventAssignment: true,
      values: {
        'process.browser': false,
        'module.require': 'require',
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
  output: [
    {
      chunkFileNames: 'out-[hash].js',
      entryFileNames: 'out.js',
      dir: path.join(__dirname, '../dist/'),
      sourcemap: false,
      compact: true,
      freeze: false,
      interop: false,
      namespaceToStringTag: false,
      externalLiveBindings: false,
      preferConst: true,
      format: 'cjs',
      interop: (id) => (isExternal(id) ? 'default' : 'defaultOnly'),
      plugins: [
        {
          name: 'minify',
          renderChunk(code) {
            const result = terser.minify(code, {
              ecma: 2019,
              module: true,
              compress: {
                toplevel: true,
              },
              mangle: {
                eval: true,
              },
              sourceMap: false,
              output: {
                comments: false,
                inline_script: false,
                ecma: 2019,
              },
            });
            return result.code || null;
          },
        },
      ],
    },
  ],
};
