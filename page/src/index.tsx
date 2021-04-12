import { render } from 'preact'
import { useState } from 'preact/hooks';
import { createGlobalStyles } from 'goober/global';
import { setup, styled } from 'goober';

import { getClientForSchema, schemas, schemaDescriptions, SchemaName } from './schemas';
import { Pills } from './pills';
import { Playground } from './playground';

setup(h);

const Global = createGlobalStyles`
  body {
    background: #f3f5f7;
    color: #001f3f;
    font-family: system-ui,helvetica,sans-serif;
    line-height: 1.0;
    padding: 0;
    margin: 0;
  }

  pre, code {
    margin: 0;
    font-family: Source Code Pro,source-code-pro,Menlo,Consolas,Monaco,Andale Mono,Courier New,monospace;
  }

  h1 {
    font-size: 3.4em;
    margin-bottom: 0.7rem;
  }

  h2 {
    font-size: 1.8em;
    margin-bottom: 1.5em;
  }

  * {
    font-family: inherit;
  }
`;

const Wrapper = styled('main')`
  display: grid;
  max-width: 1200px;
  margin: 2em auto;
  padding: 0 2ch;
  grid-template-columns: 1fr min(75ch, 100%) 1fr;

  & > * {
    grid-column: 2;
  }
`;

const Text = styled('article')`
  color: #44596f;
  margin-bottom: 2em;

  & > p {
    font-size: 1.2em;
    line-height: calc(0.9em + 1ex);
    margin: 1ex 0 0 0;
  }
`;

export const App = () => {
  const [option, setOption] = useState<SchemaName>('basic-pokedex');

  return (
    <Wrapper>
      <Global />

      <h1>Try GraphQL</h1>
      <h2>Purpose-built Demo APIs for GraphQL.</h2>

      <Pills
        options={schemas}
        selected={option}
        onChange={setOption}
      />

      <Text>
        {schemaDescriptions[option].map((description, i) => (
          <p key={`${option}-${i}`}>
            {description}
          </p>
        ))}
      </Text>

      <Playground
        key={option}
        client={getClientForSchema(option)}
      />
    </Wrapper>
  );
}

render(<App />, document.getElementById('app')!);
