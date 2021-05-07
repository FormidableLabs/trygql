<div align="center">
  <h1 align="center">
   <a href="https://trygql.formidable.dev/">
     trygql
   </a>
  </h1>
  <p align="center"><strong>Purpose-built Demo APIs for GraphQL.</strong></p>
  <br />
</div>

`trygql` is a public collection of GraphQL schemas, providing different common scenarios for
testing GraphQL APIs and demonstrating features for GraphQL clients.
It consists of several schemas that can all be used and integrated into a demo app to test different
behaviour and to retrieve testing data. Notably, the API attempts to cover as many common behaviours
and features (like file uploads & persisted queries), so that demos can focus on just providing the
client-side app.

It's used in [`urql`'s example projects](https://github.com/FormidableLabs/urql/tree/main/examples)
to show realistic uses of real GraphQL schemas with some schemas also storing persistent state.

Each schema is written using [GraphQL Nexus](https://nexusjs.org/), the API is exposed via
[fastify's mercurius](https://mercurius.dev/), and is hosted on [Fly.io](https://fly.io/). Each
schema allows queries using `POST` and `GET` methods.

## Public Schemas

| Schema | Description | Links |
| --- | ----------- | -------- |
| Basic Pokedex | The Pokedex API provide simple lists and fields for Pokémon data, which is highly static and perfect for "Getting Started" examples. | [Endpoint](https://trygql.dev/graphql/basic-pokedex) [Schema](./graphql/basic-pokedex/__generated/schema.gen.graphql) |
| Intermittent Colors | A simple schema returning color data from an XKCD survey, which is a small data set. Fields on this schema have a high random change of erroring, which is good for testing retry logic. | [Endpoint](https://trygql.dev/graphql/intermittent-colors) [Schema](./graphql/intermittent-colors/__generated/schema.gen.graphql) |
| APQ Weather | A weather schema calling out to `metaweather.com` supporting "Automatic Persisted Queries". This data changes often but is cached for short periods. | [Endpoint](https://trygql.dev/graphql/apq-weather) [Schema](./graphql/apq-weather/__generated/schema.gen.graphql) |
| Uploads Mock | A mock file upload schema, which doesn't retain or host uploaded files, but simulates a full upload flow. | [Endpoint](https://trygql.dev/graphql/uploads-mock) [Schema](./graphql/uploads-mock/__generated/schema.gen.graphql) |
| Relay npm | A Relay-compliant schema for querying data from the npm registry. This data has highly variable response times and realistic pagination fields.| [Endpoint](https://trygql.dev/graphql/relay-npm) [Schema](./graphql/relay-npm/__generated/schema.gen.graphql) |
| Web Collections | A full app schema, which allows users to register & signin and save links to blog posts, with a small leaderboard. This schema isn't collaborative but good for testing writing full app demos with authentication logic. | [Endpoint](https://trygql.dev/graphql/web-collections) [Schema](./graphql/web-collections/__generated/schema.gen.graphql) |

**Go to [trygql.formidable.dev](https://trygql.formidable.dev/) to explore or query these schemas.**
