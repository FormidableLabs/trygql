export class NoMetaError extends Error {
  extensions: { [key: string]: any };

  constructor(url: string) {
    const message = `The link at "${url}" does not have any OpenGraph or Twitter meta tags.`;
    super(message);
    this.extensions = {
      code: 'NO_META',
      timestamp: new Date().toISOString(),
    };
  }
}

export class UnauthorizedError extends Error {
  extensions: { [key: string]: any };

  constructor() {
    super('Invalid or expired token passed');
    this.extensions = {
      code: 'UNAUTHORIZED',
      timestamp: new Date().toISOString(),
    };
  }
}
