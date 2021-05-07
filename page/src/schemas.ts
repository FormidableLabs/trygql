import {
  Exchange,
  OperationResult,
  gql,
  createClient,
  dedupExchange,
  fetchExchange,
  cacheExchange,
  makeOperation,
} from '@urql/core';

import { pipe, tap } from 'wonka';
import { persistedFetchExchange } from '@urql/exchange-persisted-fetch';
import { retryExchange } from '@urql/exchange-retry';
import { authExchange } from '@urql/exchange-auth';

export const schemas = {
  'basic-pokedex': 'Basic Pokedex',
  'apq-weather': 'APQ Weather',
  'intermittent-colors': 'Colors',
  'relay-npm': 'NPM Relay',
  'uploads-mock': 'File Uploads',
  'web-collections': 'Web Collections',
} as const;

export type SchemaName = keyof typeof schemas;

const pokedex = `
The Pokédex schema contains basic information about Pokémon and doesn’t contain much else. It's known as a “classic” GraphQL API example.
This schema is entirely uncached and immediate, which makes it ideal to test GraphQL queries without any intereference from other caches.
It covers a wide range of types, enums, and scalars, so it’s still a good place to start when trying out GraphQL.
`.trim().split('\n');

const weather = `
The Weather schema contains a search field and can return many different pieces of information about the weather of different places, with an added hierarchy for regions.
It calls an external API, results for which it caches, however, this API’s response time is variable, which makes this schema perfect for testing variable timings.
Furthermore, this schema supports “Automatic Persisted Queries” which is an interesting feature to test out as in production applications it can be used to make optimal CDN-cached GET requests.
`.trim().split('\n');

const colors = `
The Color schema returns colors from an old XKCD survey on color names. It's an interesting collection therefore.
This schema doesn’t call an external API but has several fields which have a variable success rate, and will often error.
Because of these intermittent errors it makes it a good example to test out retry logic and error-resilient UIs.
`.trim().split('\n');

const npm = `
The npm schema contains interesting data, as it directly calls the npm registry. This allows it to return a wide range of large amounts of data, which change frequently and cause variable response times depending on whether they’ve already been accessed.
This schema is also fully Relay-compliant, which makes it a great testing ground for Relay’s pagination specificiation and other features.
`.trim().split('\n');

const uploads = `
The file uploads schema allows file uploads to a mock API. It does not retain any of the data you upload.
However, as the API accepts the entire multipart upload, it simulates an upload quite well with the necessary limits on file sizes.
`.trim().split('\n');

const collections = `
The “Web Collections” schema is a fully-fledged app example schema and allows you to sign up, sign in, and add links to a link collection.
It contains data that’s shared across users, which is basically a link ranking board, and its’ JWT-based authentication with refresh tokens makes it perfect to test out authentication logic.
While it doesn’t feature subscriptions it may be used to test out offline use, as the user also creates personalized data.
`.trim().split('\n');

export const schemaDescriptions: Record<SchemaName, string[]> = {
  'basic-pokedex': pokedex,
  'apq-weather': weather,
  'intermittent-colors': colors,
  'relay-npm': npm,
  'uploads-mock': uploads,
  'web-collections': collections,
} as const;

const resultExchange = ({
  onResult,
}: {
  onResult: (result: OperationResult) => void;
}): Exchange => ({ forward }) => ops$ => {
  return pipe(forward(ops$), tap(onResult));
}

const clients = new Map();

const refreshMutation = gql`
  mutation Refresh ($refreshToken: String!) {
    refreshCredentials(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`;

interface Tokens {
 token: string;
 refreshToken: string;
}

export const getClientForSchema = (schema: SchemaName) => {
  let client = clients.get(schema);
  if (!client) {
    let tokensRef: { current: Tokens | null } = { current: null };

    client = createClient({
      url: `https://trygql.formidable.dev/graphql/${schema}`,
      exchanges: [
        dedupExchange,
        cacheExchange,
        schema === 'apq-weather' && persistedFetchExchange({
          preferGetForPersistedQueries: true,
        }),
        schema === 'web-collections' && authExchange<{ current: null | Tokens }>({
          async getAuth({ authState, mutate }) {
            if (!authState) {
              return tokensRef;
            } else if (authState.current && authState.current.refreshToken) {
              const result = await mutate(
                refreshMutation,
                { refreshToken: authState.current.refreshToken }
              );

              const refreshCredentials = result.data?.refreshCredentials;
              if (refreshCredentials) {
                authState.current.token = refreshCredentials.token;
                authState.current.refreshToken = refreshCredentials.refreshToken;
                return authState;
              }
            }

            return null;
          },
          addAuthToOperation({ authState, operation }) {
            if (!authState || !authState.current) return operation;

            const fetchOptions =
              typeof operation.context.fetchOptions === 'function'
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {};

            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${authState.current.token}`,
                },
              },
            });
          },
          didAuthError({ error }) {
            return error.graphQLErrors.some(e => e.extensions?.code === 'UNAUTHORIZED');
          },
        }),
        schema === 'web-collections' && resultExchange({
          onResult(result) {
            const credentials = result.data?.signin || result.data?.register || {};
            if (
              credentials.__typename === 'Credentials' &&
              credentials.token &&
              credentials.refreshToken
            ) {
              tokensRef.current =
                Object.assign(tokensRef.current || {}, credentials);
            }
          },
        }),
        retryExchange({
          initialDelayMs: 200,
          maxDelayMs: 1000,
          randomDelay: true,
          maxNumberAttempts: schema === 'intermittent-colors' ? 8 : 3,
          retryIf: schema === 'intermittent-colors'
            ? (error) => error.graphQLErrors.some(x => x.extensions?.code === 'NO_SOUP') || !!error.networkError
            : (error) => !!error.networkError,
        }),
        fetchExchange,
      ].filter(Boolean) as Exchange[],
    });

    clients.set(schema, client);
  }

  return client;
};
