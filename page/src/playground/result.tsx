import { DocumentNode } from 'graphql';
import { useMemo } from 'preact/hooks';
import { gql, useQuery } from '@urql/preact';
import { styled, css } from 'goober';

const Wrapper = styled('pre')`
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
  overflow: scroll;
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
  query: DocumentNode
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
  const [result] = useQuery({
    query: props.query || fallbackQuery,
    pause: !props.query
  });

  const contents = useMemo(() => {
    return {
      data: result.data || null,
      errors: result.error
        ? result.error.graphQLErrors
        : [],
    };
  }, [result]);

  return (
    <Wrapper>
      <JSONView value={contents} />
    </Wrapper>
  );
};
