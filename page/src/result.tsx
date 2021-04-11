import { DocumentNode } from 'graphql';
import { useMemo } from 'preact/hooks';
import { gql, useQuery } from '@urql/preact';
import { styled } from 'goober';

const Wrapper = styled('pre')`
  font-family: monospace;
  font-size: 14px;
  line-height: 1.3em;
  display: flex;
  background-color: #ecedf9;
  border-radius: 0.5em;
  z-index: 1;
  padding: 2ch;
  box-shadow: 5px 5px 7px #f1f3f5;
  color: #44596f;
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
`;

export interface ResultProps {
  query: DocumentNode
}

const fallbackQuery = gql`{ __typename }`;

export const Result = (props: ResultProps) => {
  const [result] = useQuery({
    query: props.query || fallbackQuery,
    pause: !props.query
  });

  const contents = useMemo(() => {
    return JSON.stringify({
      data: result.data || null,
      errors: result.error
        ? result.error.graphQLErrors
        : [],
    }, null, 2);
  }, [result]);

  return (
    <Wrapper>
      {contents}
    </Wrapper>
  );
};
