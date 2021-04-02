import { asNexusMethod, nonNull, stringArg, intArg, objectType } from 'nexus';
import { GraphQLHexColorCode } from 'graphql-scalars';

import colors from './data/xkcd-colors.json';

export const HexColorCode = asNexusMethod(GraphQLHexColorCode, 'color');

class SoupError extends Error {
  extensions: { [key: string]: any };

  constructor() {
    super('NO SOUP— I mean,— color for you!');

    this.extensions = {
      code: 'NO_SOUP',
      description:
        'The /graphql/intermittent-colors API provides a demo of a randomly failing GraphQL API.',
      timestamp: new Date().toISOString(),
    };
  }
}

const failAtRandom = () => {
  if (Math.random() > 1 / 3) {
    throw new SoupError();
  }
};

export const Color = objectType({
  name: 'Color',
  description:
    'One of the 954 most common RGB monitor colors, as defined by participants in an xkcd color name survey.',
  definition(t) {
    t.string('name', { required: true });
    t.color('hex', { required: true });
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('randomColor', {
      type: Color,
      required: true,
      description:
        'Get a random color out of 954 colors from an xkcd survey. This has a 1:3 chance of succeeding.',
      resolve() {
        failAtRandom();
        const colorNames = Object.keys(colors);
        const index = (Math.random() * (colorNames.length - 1)) | 0;
        const name = colorNames[index] as keyof typeof colors;
        return { name, hex: colors[name] };
      },
    });

    t.field('color', {
      type: Color,
      description:
        'Get a color by its name from the set of 954 colors from an xkcd survey. This has a 1:3 chance of succeeding.',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_, { name }) {
        failAtRandom();
        const color = colors[name as keyof typeof colors];
        return color ? { name, hex: color } : null;
      },
    });

    t.list.field('colors', {
      type: Color,
      description:
        'Paginate through 954 xkcd survey colors. This has a 1:3 chance of succeeding.',
      args: {
        limit: intArg(),
        skip: intArg(),
      },
      resolve(_, { limit, skip }) {
        failAtRandom();
        let list = Object.keys(colors) as Array<keyof typeof colors>;
        if (skip != null) list = list.slice(skip);
        if (limit != null) list = list.slice(0, limit);
        return list.map((name) => ({ name, hex: colors[name] }));
      },
    });
  },
});
