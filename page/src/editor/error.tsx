import { useMemo } from 'preact/hooks';
import { Diagnostic } from 'graphql-language-service-types';
import { css } from 'goober';

import { Popup } from './popup';

const wrapperStyles = css`
  z-index: 1;
  min-width: 8rem;
  list-style-type: none;
  border-radius: 0.3em;
  color: #666666;
  margin-top: 0.3em;
  padding: 0.4ch;
  background-color: #f9ecec;
  border: 1px solid #ffbfbf;
  box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.13);
  max-width: 45ch;
  white-space: normal;
`;

export interface ErrorProps {
  diagnostic: Diagnostic;
}

export const Error = (props: ErrorProps) => {
  const { message, range } = props.diagnostic;

  const position = useMemo(() => ({
    row: Math.max(range.start.line, range.end.line),
    columnStart: Math.min(range.start.character, range.end.character),
    columnEnd: Math.max(range.start.character, range.end.character),
  }), [range]);

  return (
    <Popup
      className={wrapperStyles}
      position={position}
      aria-modal="false"
      role="dialog"
    >
      {message}
    </Popup>
  );
};
