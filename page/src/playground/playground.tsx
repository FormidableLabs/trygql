import { styled } from 'goober';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { getIntrospectionQuery, buildClientSchema } from 'graphql';
import { retryExchange } from '@urql/exchange-retry';

import {
  Provider,
  createClient,
  gql,
  useQuery,
  dedupExchange,
  fetchExchange,
  cacheExchange,
} from '@urql/preact';

import { Toolbar } from './toolbar';
import { Editor } from '../editor';
import { Result } from './result';

export const Wrapper = styled('form')`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-columns: 40%;
  grid-template-rows: min-content 1fr;

  height: 27em;
  border-radius: 0.7em;
  padding: 0.7em;
  grid-gap: 1.1em;
  box-shadow: 9px 18px 36px #e2e4e6, -9px -18px 36px #fbfbfb;

  @media (max-width: 950px) {
    height: auto;
  }

  & > *:nth-child(1) {
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  & > *:nth-child(2) {
    grid-column: 1 / span 1;
    grid-row: 2;

    @media (max-width: 950px) {
      height: 26em;
    }
  }

  & > *:nth-child(3) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 2;

    @media (max-width: 950px) {
      grid-column: 1 / span 1;
      grid-row: auto;
      max-height: 26em;
    }
  }
`;

const introspectionQuery = getIntrospectionQuery();

export interface PlaygroundProps {
  endpoint: string;
}

const PlaygroundContent = (props: PlaygroundProps) => {
  const [text, setText] = useState('');
  const [query, setQuery] = useState(null);
  const [introspectionResult] = useQuery({ query: introspectionQuery });

  const schema = useMemo(() => {
    if (!introspectionResult.fetching && introspectionResult.data) {
      return buildClientSchema(introspectionResult.data);
    } else {
      return null;
    }
  }, [introspectionResult.fetching]);

  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    setQuery(query => {
      try {
        return gql(text);
      } catch (_error) {
        return query;
      }
    });
  }, [text]);

  return (
    <Wrapper onSubmit={onSubmit}>
      <Toolbar endpoint={props.endpoint} />
      <Editor schema={schema} onChange={setText} />
      <Result query={query} />
    </Wrapper>
  );
};

export const Playground = (props: PlaygroundProps) => {
  const client = useMemo(() => {
    return createClient({
      url: `https://trygql.dev${props.endpoint}`,
      exchanges: [
        dedupExchange,
        cacheExchange,
        retryExchange({
          initialDelayMs: 200,
          maxDelayMs: 1000,
          randomDelay: true,
          maxNumberAttempts: 3,
        }),
        fetchExchange,
      ],
    });
  }, [props.endpoint]);

  return (
    <Provider value={client}>
      <PlaygroundContent {...props} />
    </Provider>
  );
};
