import { styled, css } from 'goober';

import {
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLEnumType,
  GraphQLScalarType,
  GraphQLArgument,
  GraphQLOutputType
} from 'graphql';

const Wrapper = styled('li')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 1.5em 0.7em;
  border-radius: 0.7em;
  box-shadow: 9px 18px 36px #e2e4e6, -9px -18px 36px #fbfbfb;
`;

const Title = styled('h2')`
  font-size: 1.2em;
  color: #d19a66;
  margin: 0;
`;

const Label = styled('h3')`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;
  margin: 2ex 0 1ex 0;
`;

const FieldList = styled('ul')`
  padding: 1ex 0 1ex 1ch;
  margin: 0;
  width: 100%;
`;

const FieldItem = styled('li')`
  margin: 1ex 0 1ex 0;
`;

const Name = styled('code')`
  color: #4078f2;
`;

const Type = styled('code')`
  margin-left: 1ch;
  color: #d19a66;
`;

const TypeList = styled('ul')`
  list-style-type: none;
  padding: 0 0 0 2ch;
  margin: 0;

  & > li {
    margin: 0;
    padding: 0;
  }
`;

const Description = styled('p')`
  color: #a0a1a7;
  margin: 1ex 0 0 0;
  padding: 0;
  line-height: calc(0.8em + 1ex);
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

const FieldArgs = ({ args }: { args: GraphQLArgument[] }) => {
  if (!args.length) return null;
  return (
    <>
      <code className={`${tokenStyles} punctuation`}>{'('}</code>
      <TypeList>
        {args.map((arg, i) => (
          <li>
            <code className={`${tokenStyles} property`}>{arg.name}</code>
            <code className={`${tokenStyles} punctuation`}>{': '}</code>
            <Type>{arg.type.toString()}</Type>
            {i < args.length - 1 ? <code className={`${tokenStyles} punctuation`}>{','}</code> : null}
          </li>
        ))}
      </TypeList>
      <code className={`${tokenStyles} punctuation`}>{')'}</code>
    </>
  );
};

const FieldOutput = ({ type }: { type: GraphQLOutputType }) => (
  <>
    <code className={`${tokenStyles} punctuation`}>{':'}</code>
    <Type>{type.toString()}</Type>
  </>
);

export interface ItemProps {
  type: GraphQLObjectType | GraphQLScalarType | GraphQLEnumType | GraphQLInterfaceType;
}

export const Item = ({ type }: ItemProps) => {
  const fieldMap = 'getFields' in type ? type.getFields() : {};
  const fields = Object.keys(fieldMap).map(key => fieldMap[key]);
  const values = 'getValues' in type ? type.getValues() : [];

  return (
    <Wrapper>
      <Title>{type.name}</Title>
      {type.description ? <Description>{type.description}</Description> : null}
      {fields.length ? (
        <>
          <Label>Fields</Label>
          <FieldList>
            {fields.map(field => (
              <FieldItem key={field.name}>
                <Name>{field.name}</Name>
                <FieldArgs args={field.args} />
                <FieldOutput type={field.type} />
                {field.description ? <Description>{field.description}</Description> : null}
              </FieldItem>
            ))}
          </FieldList>
        </>
      ) : null}
      {values.length ? (
        <>
          <Label>Values</Label>
          <FieldList>
            {values.map(value => (
              <FieldItem key={value.name}>
                <Name>{value.name}</Name>
              </FieldItem>
            ))}
          </FieldList>
        </>
      ) : null}
    </Wrapper>
  );
};
