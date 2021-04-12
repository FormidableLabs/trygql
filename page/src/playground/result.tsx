import { DocumentNode, OperationDefinitionNode, Kind } from 'graphql';
import { useMemo, useEffect } from 'preact/hooks';
import { gql, useQuery, useMutation } from '@urql/preact';
import { keyframes, styled, css } from 'goober';

const Wrapper = styled('pre')`
  position: relative;
  font-size: 14px;
  line-height: 1.3em;
  background-color: #ecedf9;
  border-radius: 0.5em;
  z-index: 1;
  padding: 2ch;
  margin: 0;
  box-shadow: 5px 5px 7px #f1f3f5;
  color: #44596f;
  white-space: pre-wrap;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
`;

const Content = styled('div')`
  opacity: ${(p: { fetching: boolean }) => p.fetching ? '0.6' : '1'};
  filter: ${(p: { fetching: boolean }) => p.fetching ? 'blur(4px)' : 'none'};
  transition: opacity 0.7s ease-in-out, filter 0.7 ease-in-out;
`;

const LoadingScreen = styled('div')`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${(p: { fetching: boolean }) => p.fetching ? 'none' : 'auto'};
  opacity: ${(p: { fetching: boolean }) => p.fetching ? '1' : '0'};
  transition: opacity 1s ease-in-out;
`;

const bounce = keyframes`
  from, to { transform: scale(0.0); }
  50% { transform: scale(1.0); }
`;

const Spinner = styled('div')`
  position: relative;
  width: 4em;
  height: 4em;

  &:before, &:after {
    display: block;
    content: '';
    border-radius: 50%;
    background: #8368db;
    opacity: 0.5;
    position: absolute;
    inset: 0;
    animation: ${bounce} 2.0s infinite ease-in-out;
    transform: scale(1.0);
  }

  &:after {
    animation-delay: -1.0s;
  }
`;

const tokenStyles = css`
  &.number,
  &.builtin {
    color: #e45649;
  }

  &.string {
    color: #d19a66;
  }

  &.punctuation {
    color: #383a42;
  }

  &.property {
    color: #4078f2;
  }
`;

const groupStyles = css`
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0 0 0 2ch;
`;

export interface ResultProps {
  query: DocumentNode | null
}

const fallbackQuery = gql`{ __typename }`;

const ObjectView = ({ value }: { value: Record<string, any> }) => {
  const keys = Object.keys(value);
  const length = keys.length;
  if (!length) {
    return <span className={`${tokenStyles} punctuation`}>{'{}'}</span>;
  }

  return (
    <>
      <span className={`${tokenStyles} punctuation`}>{'{'}</span>
      <ul className={groupStyles}>
        {Object.keys(value).map((key, index) => (
          <li>
            <span className={`${tokenStyles} property`}>
              {JSON.stringify(key)}
            </span>
            <span className={`${tokenStyles} punctuation`}>
              {': '}
            </span>
            <JSONView value={value[key]} key={key} />
            {index < length - 1
              ? <span className={`${tokenStyles} punctuation`}>{','}</span>
              : null}
          </li>
        ))}
      </ul>
      <span className={`${tokenStyles} punctuation`}>{'}'}</span>
    </>
  );
};

const ArrayView = ({ value }: { value: Array<any> }) => {
  const length = value.length;
  if (!length) {
    return <span className={`${tokenStyles} punctuation`}>{'[]'}</span>;
  }

  return (
    <>
      <span className={`${tokenStyles} punctuation`}>{'['}</span>
      <ul className={groupStyles}>
        {value.map((child, index) => (
          <li>
            <JSONView value={child} key={index} />
            {index < length - 1
              ? <span className={`${tokenStyles} punctuation`}>{','}</span>
              : null}
          </li>
        ))}
      </ul>
      <span className={`${tokenStyles} punctuation`}>{']'}</span>
    </>
  );
};

const JSONView = ({ value }: any) => {
  if (value == null) {
    return <span className={`${tokenStyles} builtin`}>{'null'}</span>;
  }

  switch (typeof value) {
    case 'string':
      return <span className={`${tokenStyles} string`}>{JSON.stringify(value)}</span>;
    case 'number':
      return <span className={`${tokenStyles} number`}>{JSON.stringify(value)}</span>;
    case 'undefined':
      return <span className={`${tokenStyles} builtin`}>{'null'}</span>;
  }

  if (Array.isArray(value)) {
    return <ArrayView value={value} />;
  }

  return <ObjectView value={value} />;
};

export const Result = (props: ResultProps) => {
  const [queryResult, executeQuery] = useQuery({
    query: props.query || fallbackQuery,
    pause: true
  });

  const [mutationResult, executeMutation] = useMutation(
    props.query || fallbackQuery
  );

  const operationType = useMemo(() => {
    if (!props.query) return null;
    const operation = props.query.definitions
      .find(def => def.kind === Kind.OPERATION_DEFINITION) as OperationDefinitionNode | undefined;
    return operation ? operation.operation : null;
  }, [props.query]);

  useEffect(() => {
    if (props.query && operationType === 'query') {
      executeQuery();
    } else if (props.query && operationType === 'mutation') {
      executeMutation();
    }
  }, [props.query, operationType]);

  const contents = useMemo(() => {
    let result;
    switch (operationType) {
      case 'query':
        result = queryResult;
        break;
      case 'mutation':
        result = mutationResult;
        break;
      default:
        result = {};
    }

    return {
      data: result.data || null,
      errors: result.error
        ? (result.error.graphQLErrors.length ? result.error.graphQLErrors : [result.error.networkError])
        : [],
    };
  }, [operationType, queryResult, mutationResult]);

  const fetching = queryResult.fetching || mutationResult.fetching

  return (
    <Wrapper>
      <Content fetching={fetching}>
        <JSONView value={contents} />
      </Content>
      {fetching ? (
        <LoadingScreen fetching={fetching} aria-hidden="true">
          <Spinner />
        </LoadingScreen>
      ) : null}
    </Wrapper>
  );
};
