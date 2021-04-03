import {
  GraphQLDateTime,
  GraphQLEmailAddress,
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

import { getPackage, searchPackage, resolveVersion } from './data/npm';
import { getFiles } from './data/unpkg';

export const DateTime = asNexusMethod(GraphQLDateTime, 'dateTime');
export const EmailAddress = asNexusMethod(GraphQLEmailAddress, 'email');
export const URL = asNexusMethod(GraphQLURL, 'url');

const idRe = /^(?:@([^/@]+?)[/])?([^/@]+)(?:@([\d.]+(?:-.+)?))?$/;

export const Node = interfaceType({
  name: 'Node',
  resolveType: (source) => ('_rev' in source ? 'Package' : 'Version'),
  definition(t) {
    t.id('id', {
      required: true,
      resolve: (source) => source._id,
    });
  },
});

export const User = objectType({
  name: 'User',
  description: 'User registered on the npm registry.',
  definition(t) {
    t.string('name', { required: true });
    t.email('email');
    t.url('url');
  },
});

export const External = objectType({
  name: 'External',
  description: 'Reference to a repository or website',
  definition(t) {
    t.string('type');
    t.url('url', { required: true });
  },
});

export const Metadata = interfaceType({
  name: 'Metadata',
  resolveType: (source) => ('_rev' in source ? 'Package' : 'Version'),
  definition(t) {
    t.id('id', {
      required: true,
      resolve: (source) => source._id,
    });

    t.string('name', { required: true });
    t.list.field('maintainers', { type: User });
    t.string('description');
    t.string('license');
    t.field('repository', { type: External });
    t.field('bugs', { type: External });
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

export const File = objectType({
  name: 'File',
  description: 'File in the distributable as provided by unpkg.com.',
  definition(t) {
    t.string('path', { required: true });
    t.string('contentType');
    t.string('integrity');
    t.dateTime('lastModified');
    t.int('size');
    t.url('url');
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
    t.string('licenseText');
    t.string('main');
    t.string('module');

    t.field('author', {
      type: User,
      required: true,
      resolve: (source) => source._npmUser,
    });

    t.list.field('files', {
      type: File,
      args: {
        limit: intArg(),
        skip: intArg(),
      },
      async resolve(source, { limit, skip }) {
        let list = await getFiles(source.name, source.version);
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

    t.string('readme');
    t.string('readmeFilename');

    t.dateTime('createdAt', {
      required: true,
      resolve: (source) => source.time.created,
    });

    t.dateTime('modifiedAt', {
      required: true,
      resolve: (source) => source.time.modified,
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
      resolve(parent, args) {
        return resolveVersion(parent, args.selector);
      },
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
      async resolve(_, { id }, ctx) {
        const [match, scope, name, version] = idRe.exec(id) || [];
        if (!match) return null;
        const metadata = await getPackage(ctx, scope ? `@${scope}/${name}` : name);
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
      resolve(_, { name }, ctx) {
        return getPackage(ctx, name);
      },
    });

    t.field('resolve', {
      type: Version,
      description: 'Resolve a semver range or tag for a specific package',
      args: {
        name: nonNull(stringArg()),
        selector: nonNull(stringArg()),
      },
      async resolve(_, { name, selector }, ctx) {
        const packument = await getPackage(ctx, name);
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
      nodes(_, args, ctx) {
        return searchPackage(ctx, args);
      },
    });
  },
});
