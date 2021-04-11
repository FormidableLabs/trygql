import { render } from 'preact'
import { createGlobalStyles } from 'goober/global';
import { setup, styled } from 'goober';

import { Playground } from './playground';

setup(h);

const Global = createGlobalStyles`
  body {
    background: #f3f5f7;
    color: #001f3f;
    font-family: system-ui,helvetica,sans-serif;
  }

  pre, code {
    margin: 0;
    font-family: Source Code Pro,source-code-pro,Menlo,Consolas,Monaco,Andale Mono,Courier New,monospace;
  }

  * {
    font-family: inherit;
  }
`;

const Wrapper = styled('main')`
  margin: 1em auto;
  max-width: 1200px;
`;

export const App = () => {
  return (
    <Wrapper>
      <Global />

      <h1>Try GraphQL</h1>
      <Playground endpoint="/graphql/basic-pokedex" />
    </Wrapper>
  );
}

render(<App />, document.getElementById('app')!);
