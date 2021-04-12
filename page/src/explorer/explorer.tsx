import { styled } from 'goober';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { Item } from './item';

const Wrapper = styled('ul')`
  list-style-type: none;
  grid-column: 1 / 4;
  margin: 3em 0 2em 0;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-flow: row dense;
  grid-gap: 2em;

  @supports (grid-template-rows: masonry) {
    grid-template-rows: masonry;
  }
`;

export interface ExplorerProps {
  schema: GraphQLSchema;
}

export const Explorer = ({ schema }: ExplorerProps) => {
  const typeMap = schema.getTypeMap();

  const rootTypes = [
    schema.getQueryType(),
    schema.getMutationType(),
    schema.getSubscriptionType(),
  ].filter(Boolean) as GraphQLObjectType[];

  const objectTypes = Object.keys(typeMap)
    .map(key => typeMap[key])
    .filter(type => (
      type instanceof GraphQLObjectType &&
      !/^__/.test(type.name) &&
      !rootTypes.includes(type)
    )) as GraphQLObjectType[];

  return (
    <Wrapper>
      {rootTypes.map(type => <Item type={type} key={type.name} />)}
      {objectTypes.map(type => <Item type={type} key={type.name} />)}
    </Wrapper>
  );
};
