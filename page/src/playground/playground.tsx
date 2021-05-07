import { styled } from 'goober';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { DocumentNode, getIntrospectionQuery, buildClientSchema } from 'graphql';
import { Provider, gql, useQuery, Client } from '@urql/preact';

import { Toolbar } from './toolbar';
import { Editor } from '../editor';
import { Result } from './result';
import { Explorer } from '../explorer';

export const Wrapper = styled('form')`
  grid-column: 1 / 4;
  margin: 1em 0;

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
  client: Client;
}

const PlaygroundContent = (props: PlaygroundProps) => {
  const [text, setText] = useState('');
  const [query, setQuery] = useState<DocumentNode | null>(null);
  const [introspectionResult] = useQuery({ query: introspectionQuery });

  const schema = useMemo(() => {
    if (!introspectionResult.fetching && introspectionResult.data) {
      return buildClientSchema(introspectionResult.data);
    } else {
      return null;
    }
  }, [introspectionResult.fetching]);

  const onSubmit = useCallback((event: Event) => {
    event.preventDefault();
    setQuery(query => {
      try {
        return gql(text) as DocumentNode;
      } catch (_error) {
        return query;
      }
    });
  }, [text]);

  return (
    <>
      <Wrapper onSubmit={onSubmit}>
        <Toolbar endpoint={props.endpoint} />
        <Editor schema={schema} onChange={setText} />
        <Result query={query} />
      </Wrapper>
      {schema && <Explorer schema={schema} />}
    </>
  );
};

export const Playground = (props: PlaygroundProps) => {
  return (
    <Provider value={props.client}>
      <PlaygroundContent {...props} />
    </Provider>
  );
};
