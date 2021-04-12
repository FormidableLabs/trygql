import { memo } from 'preact/compat';
import { styled } from 'goober';

import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLSchema
} from 'graphql';

import { Item } from './item';

const Container = styled('section')`
  margin: 3em 0 2em 0;
  grid-column: 1 / 4;

  display: grid;
  grid-template-columns: 1fr min(75ch, 100%) 1fr;

  & > * {
    grid-column: 2;
  }
`;

const Wrapper = styled('ul')`
  grid-column: 1 / 4;
  list-style-type: none;
  margin: 0 0 3em 0;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-flow: row dense;
  grid-gap: 2em;
  width: 100%;

  @supports (grid-template-rows: masonry) {
    grid-template-rows: masonry;
  }
`;

export interface ExplorerProps {
  schema: GraphQLSchema;
}

export const Explorer = memo(({ schema }: ExplorerProps) => {
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

  const interfaceTypes = Object.keys(typeMap)
    .map(key => typeMap[key])
    .filter(type => (
      type instanceof GraphQLInterfaceType &&
      !/^__/.test(type.name)
    )) as GraphQLInterfaceType[];

  const scalarTypes = Object.keys(typeMap)
    .map(key => typeMap[key])
    .filter(type => (
      type instanceof GraphQLScalarType &&
      !/^__/.test(type.name)
    )) as GraphQLScalarType[];

  const enumTypes = Object.keys(typeMap)
    .map(key => typeMap[key])
    .filter(type => (
      type instanceof GraphQLEnumType &&
      !/^__/.test(type.name)
    )) as GraphQLEnumType[];

  return (
    <Container>
      <h2>Object Types</h2>
      <Wrapper>
        {rootTypes.map(type => <Item type={type} key={type.name} />)}
        {objectTypes.map(type => <Item type={type} key={type.name} />)}
      </Wrapper>
      {interfaceTypes.length ? (
        <>
          <h2>Interface Types</h2>
          <Wrapper>
            {interfaceTypes.map(type => <Item type={type} key={type.name} />)}
          </Wrapper>
        </>
      ) : null}
      <h2>Scalar Types</h2>
      <Wrapper>
        {scalarTypes.map(type => <Item type={type} key={type.name} />)}
      </Wrapper>
      {enumTypes.length ? (
        <>
          <h2>Enum Types</h2>
          <Wrapper>
            {enumTypes.map(type => <Item type={type} key={type.name} />)}
          </Wrapper>
        </>
      ) : null}
    </Container>
  );
});
