import { styled, css } from 'goober';
import { GraphQLObjectType, GraphQLArgument, GraphQLOutputType } from 'graphql';

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
  margin: 1ex 0 1ex 0;
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
  margin: 0 0 0 2ch;
  padding: 0;

  & > li {
    margin: 0;
    padding: 0;
  }
`;

const Description = styled('p')`
  color: #a0a1a7;
  margin: 1ex 0 0 0;
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
  type: GraphQLObjectType;
}

export const Item = ({ type }: ItemProps) => {
  const fieldMap = type.getFields();
  const fields = Object.keys(fieldMap).map(key => fieldMap[key]);

  return (
    <Wrapper>
      <Title>{type.name}</Title>
      {type.description ? <Description>{type.description}</Description> : null}
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
    </Wrapper>
  );
};
