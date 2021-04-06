import {
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLJSONObject,
  GraphQLURL,
} from 'graphql-scalars';

import {
  asNexusMethod,
  nonNull,
  stringArg,
  idArg,
  intArg,
  interfaceType,
  objectType,
} from 'nexus';

import ms from 'ms';
import { getPackage, searchPackage, resolveVersion } from './data/npm';
import { getMetadata } from './data/skypack';

export const DateTime = asNexusMethod(GraphQLDateTime, 'dateTime');
export const EmailAddress = asNexusMethod(GraphQLEmailAddress, 'email');
export const JSONObject = asNexusMethod(GraphQLJSONObject, 'object');
export const URL = asNexusMethod(GraphQLURL, 'url');

const idRe = /^(?:@([^/@]+?)[/])?([^/@]+)(?:@([\d.]+(?:-.+)?))?$/;

export const Node = interfaceType({
  name: 'Node',
  resolveType: (source) => ('version' in source ? 'Package' : 'Version'),
  definition(t) {
    t.id('id', {
      required: true,
      resolve: (source) =>
        'version' in source ? `${source.name}@${source.version}` : source.name
    });
  },
});

export const Metadata = interfaceType({
  name: 'Metadata',
  resolveType: (source) => ('version' in source ? 'Package' : 'Version'),
  definition(t) {
    t.implements(Node);
    t.string('name', { required: true });
  },
});

export const Tag = objectType({
  name: 'Tag',
  description: 'Tagged version of the package',
  definition(t) {
    t.string('tag', { required: true });
    t.string('version', { required: true });
  },
});

export const Distributable = objectType({
  name: 'Distributable',
  description: 'Information about an artifact of a version',
  definition(t) {
    t.string('shasum', { required: true });
    t.url('tarball', { required: true });
    t.string('integrity');
    t.int('fileCount');
    t.int('unpackagedSize');

    t.string('npmSignature', {
      resolve: (source) => source['npm-signature'] || null,
    });
  },
});

export const Export = interfaceType({
  name: 'Export',
  resolveType: (source) => source.type === 'JS' ? 'JSExport' : 'AssetExport',
  definition(t) {
    t.string('path', {
      required: true,
      resolve: (source) => source.id,
    });
  },
});

export const JSExport = objectType({
  name: 'JSExport',
  description: 'JavaScript file in the distributable as provided by skypack.dev.',
  definition(t) {
    t.implements(Export);
    t.boolean('hasDefaultExport');
    t.list.string('namedExports');
  },
});

export const AssetExport = objectType({
  name: 'AssetExport',
  description: 'Non-JS asset file in the distributable as provided by skypack.dev.',
  definition(t) {
    t.implements(Export);
  },
});

export const Version = objectType({
  name: 'Version',
  description: 'Published version for an npm package.',
  definition(t) {
    t.implements(Node);
    t.implements(Metadata);

    t.field('dist', { type: Distributable, required: true });
    t.string('version', { required: true });

    t.object('optionalDependencies');
    t.object('peerDependencies');
    t.object('devDependencies');
    t.object('dependencies');
    t.object('engines');
    t.object('bin');

    t.list.field('exports', {
      type: Export,
      args: {
        limit: intArg(),
        skip: intArg(),
      },
      ttl: ms('1h'),
      async resolve(source, { limit, skip }) {
        const metadata = await getMetadata(source.name, source.version);
        if (!metadata) return null;
        let list = Object.values(metadata.packageExports || {});
        if (skip != null) list = list.slice(skip);
        if (limit != null) list = list.slice(0, limit);
        return list;
      },
    });
  },
});

export const Package = objectType({
  name: 'Package',
  description: 'Metadata for an npm package.',
  definition(t) {
    t.implements(Node);
    t.implements(Metadata);

    t.dateTime('modifiedAt', {
      required: true,
      resolve: (source) => source.modified,
    });

    t.list.field('distTags', {
      type: Tag,
      description: 'List of registered distributable tags.',
      required: true,
      resolve(source) {
        const distTags = source['dist-tags'];
        return Object.keys(distTags).map((tag) => ({
          tag,
          version: distTags[tag],
        }));
      },
    });

    t.list.field('versions', {
      type: Version,
      required: true,
      args: {
        limit: intArg(),
        skip: intArg(),
      },
      resolve(source, { limit, skip }) {
        let list = Object.values(source.versions);
        if (skip != null) list = list.slice(skip);
        if (limit != null) list = list.slice(0, limit);
        return list;
      },
    });

    t.field('version', {
      type: Version,
      description:
        'Resolve a specific version of the package given a valid semver selector',
      args: {
        selector: nonNull(stringArg()),
      },
      ttl: ms('1h'),
      resolve: (parent, args) => resolveVersion(parent, args.selector),
    });
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('node', {
      type: Node,
      description: 'Get a Node interface type by ID, e.g. Package or Version',
      args: {
        id: nonNull(idArg()),
      },
      ttl: ms('1h'),
      async resolve(_, { id }) {
        const [match, scope, name, version] = idRe.exec(id) || [];
        if (!match) return null;
        const metadata = await getPackage(scope ? `@${scope}/${name}` : name);
        if (!version || !metadata) return metadata;
        return metadata.versions[version] || null;
      },
    });

    t.field('package', {
      type: Package,
      description: 'Retrieve a package by name',
      args: {
        name: nonNull(stringArg()),
      },
      ttl: ms('1h'),
      resolve: (_, { name }) => getPackage(name),
    });

    t.field('resolve', {
      type: Version,
      description: 'Resolve a semver range or tag for a specific package',
      args: {
        name: nonNull(stringArg()),
        selector: nonNull(stringArg()),
      },
      ttl: ms('1h'),
      async resolve(_, { name, selector }) {
        const packument = await getPackage(name);
        if (!packument) return null;
        return resolveVersion(packument, selector);
      },
    });

    t.connectionField('search', {
      type: Package,
      description: 'Search for packages on the npm registry',
      disableBackwardPagination: true,
      additionalArgs: {
        query: nonNull(
          stringArg({
            description: 'Search string to search for on the npm registry',
          })
        ),
      },
      ttl: ms('1h'),
      nodes: (_, args) => searchPackage(args),
    });
  },
});
