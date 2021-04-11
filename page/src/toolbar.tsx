import { styled } from 'goober';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-family: monospace;
  font-size: 14px;
  line-height: 1.3em;
  display: flex;
  height: 3em;
  margin-bottom: -0.5em;
  padding-bottom: 0.5em;

  &:before {
    border-top-left-radius: 0.7em;
    border-top-right-radius: 0.7em;
    display: block;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 4.2em;
    background: #f5fcff;
    z-index: -1;
  }
`;

const Location = styled('h3')`
  font-family: monospace;
  font-size: inherit;
  font-weight: normal;
  color: #44596f;
  margin: 0;
`;

const Domain = styled('span')`
  display: inline-block;
  background-color: #ecf0f2;
  border-radius: 4px;
  margin-right: 1ch;
  padding: 0.8ex 1.5ch;
  text-transform: uppercase;
  font-size: 0.9em;
  color: #db688e;
`;

const Submit = styled('button')`
  cursor: pointer;
  appearance: none;
  background: #8368db;
  border: none;
  border-radius: 50%;
  width: 3.5ch;
  height: 3.5ch;
  font-size: 1.1em;
  color: #fff;
`;

export interface ToolbarProps {
  endpoint: string;
}

export const Toolbar = (props: ToolbarProps) => (
  <Wrapper>
    <Location>
      <Domain>trygql.dev</Domain>
      {props.endpoint}
    </Location>
    <Submit aria-label="Send Query" type="submit">
      {'▶ '}
    </Submit>
  </Wrapper>
);
