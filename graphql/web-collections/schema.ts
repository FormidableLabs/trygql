import {
  GraphQLDateTime,
  GraphQLURL,
  GraphQLUUID,
} from 'graphql-scalars';

import {
  asNexusMethod,
  objectType,
  scalarType,
  enumType,
  inputObjectType,
  stringArg,
  nonNull
} from 'nexus';

import { PrismaClient } from '@prisma/client__web-collections'

import { UnauthorizedError } from './data/errors';
import { toHash, compareToHash } from './data/crypt';
import { getMeta } from './data/crawl';

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '/web-collections',
    },
  },
});

export const UUID = asNexusMethod(GraphQLUUID, 'uuid', 'string');
export const DateTime = asNexusMethod(GraphQLDateTime, 'dateTime', 'Date');
export const URL = asNexusMethod(GraphQLURL, 'url', 'string');

export const Cursor = scalarType({
  name: 'Cursor',
  description: 'Pagination cursor pointing to an arbitary cursor-like string',
  sourceType: 'string',
  parseValue(value: string): string {
    return Buffer.from(value, 'utf8').toString('base64');
  },
  serialize(value: string): string {
    return Buffer.from(value, 'base64').toString('utf8');
  },
});

export const Credentials = objectType({
  name: 'Credentials',
  definition(t) {
    t.string('token', { required: true });
    t.string('refreshToken', { required: true });
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.uuid('id', { required: true });
    t.string('username', { required: true });

    t.dateTime('createdAt');
    t.dateTime('updatedAt');

    t.connectionField('links', {
      type: Link,
      cursorType: 'Cursor',
      disableBackwardPagination: true,
      async resolve(user, args) {
        const after = args.after && args.after.split(':');
        const cursor = after
          ? { userId_linkId: { userId: after[0], linkId: after[1] } }
          : undefined;

        const linkEdges = await db.linkEdge.findMany({
          cursor,
          skip: cursor ? 1 : 0,
          take: args.first,
          include: { node: true },
          where: { userId: user.id },
          orderBy: [
            { createdAt: 'desc' },
            { linkId: 'asc' },
          ],
        });

        const edges = linkEdges.map(edge => ({
          cursor: `${edge.userId}:${edge.linkId}`,
          node: edge.node,
        }));

        return {
          nodes: edges.map(x => x.node),
          edges,
          pageInfo: {
            startCursor: edges[0] && edges[0].cursor,
            endCursor: edges[edges.length - 1] && edges[edges.length - 1].cursor,
            hasPreviousPage: false,
            hasNextPage: edges.length === args.first,
          },
        };
      },
    });
  },
});

export const LinkEdge = objectType({
  name: 'LinkEdge',
  definition(t) {
    t.dateTime('createdAt');

    t.field('user', {
      type: User,
      resolve: parent => db.user.findUnique({ where: { id: parent.userId } }),
    });

    t.field('node', {
      type: Link,
      resolve: parent => db.link.findUnique({ where: { id: parent.linkId } }),
    });
  },
});

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.uuid('id');
    t.url('canonicalUrl');
    t.dateTime('createdAt');
    t.dateTime('updatedAt');
    t.string('title');
    t.string('description');
    t.url('image');
  },
});

export const LinkSorting = enumType({
  name: 'LinkSorting',
  members: ['TOP', 'NEW'],
  description: 'Sorting of links in a list',
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.connectionField('links', {
      type: Link,
      cursorType: 'Cursor',
      disableBackwardPagination: true,
      cursorFromNode: node => node!.id,
      additionalArgs: {
        sortBy: LinkSorting,
      },
      async nodes(_, args) {
        return db.link.findMany({
          cursor: args.after ? { id: args.after } : undefined,
          skip: args.after ? 1 : 0,
          take: args.first,
          orderBy: [
            args.sortBy === 'NEW'
              ? { createdAt: 'desc' }
              : { edges: { count: 'desc' } },
            { id: 'asc' },
          ],
        });
      },
    });

    t.field('me', {
      type: User,
      resolve(_source, _args, ctx) {
        const claims = ctx.verifyClaims();
        if (!claims) return null;
        return db.user.findUnique({ where: { id: claims.sub } });
      },
    });
  },
});

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.nonNull.string('username');
    t.nonNull.string('password');
  },
});

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('register', {
      type: nonNull(Credentials),
      args: {
        input: nonNull(LoginInput),
      },
      async resolve(_, { input }, ctx) {
        const user = await db.user.create({
          include: {
            refreshTokens: true,
          },
          data: {
            username: input.username,
            hash: toHash(input.password),
            refreshTokens: {
              create: [{}],
            },
          },
        });

        const token = ctx.createToken({ sub: user.id });
        const refreshToken = user.refreshTokens[0].id;
        return { token, refreshToken };
      },
    });

    t.field('signin', {
      type: nonNull(Credentials),
      args: {
        input: nonNull(LoginInput),
      },
      async resolve(_, { input }, ctx) {
        const user = await db.user
          .findUnique({ where: { username: input.username } });
        if (!user || !compareToHash(input.password, user.hash))
          throw new UnauthorizedError();

        const token = ctx.createToken({ sub: user.id });
        const refreshToken = await db.refreshToken
          .create({ data: { userId: user.id } });
        return { token, refreshToken: refreshToken.id };
      },
    });

    t.field('refreshCredentials', {
      type: nonNull(Credentials),
      args: {
        refreshToken: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const claims = ctx.verifyClaims(true);
        if (!claims) throw new UnauthorizedError();

        const refreshToken = await db.refreshToken
          .findUnique({ where: { id: args.refreshToken } });
        if (!refreshToken || refreshToken.userId !== claims.sub)
          throw new UnauthorizedError();

        const token = ctx.createToken({ sub: claims.sub });
        return { token, refreshToken: refreshToken.id };
      },
    });

    t.field('saveLink', {
      type: nonNull(LinkEdge),
      args: {
        linkId: nonNull(UUID),
      },
      async resolve(_, { linkId }, ctx) {
        const claims = ctx.verifyClaims();
        if (!claims) throw new UnauthorizedError();

        return db.linkEdge.create({
          data: {
            node: {
              connect: { id: linkId },
            },
            user: {
              connect: { id: claims.sub },
            },
          },
        });
      },
    });

    t.field('createLink', {
      type: nonNull(LinkEdge),
      args: {
        url: nonNull(URL),
      },
      async resolve(_, { url }, ctx) {
        const claims = ctx.verifyClaims();
        if (!claims) throw new UnauthorizedError();

        const meta = await getMeta(url);

        return db.linkEdge.create({
          data: {
            node: {
              connectOrCreate: {
                where: { canonicalUrl: meta.canonicalUrl },
                create: meta,
              },
            },
            user: {
              connect: { id: claims.sub },
            },
          },
        });
      },
    });
  },
});
