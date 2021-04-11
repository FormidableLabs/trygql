import { useCallback } from 'preact/hooks';
import { css } from 'goober';

import { HoverCursor } from './utils';

const tokenStyles = css`
  &.comment {
    color: #a0a1a7;
    font-style: italic;
  }

  &.attribute,
  &.atom {
    color: #d19a66;
  }

  &.keyword {
    color: #a626a4;
  }

  &.builtin {
    color: #e45649;
  }

  &.qualifier {
    color: #986801;
  }

  &.punctuation,
  &.meta {
    color: #383a42;
  }

  &.property,
  &.def {
    color: #4078f2;
  }

  pre:not(:focus) &.invalidchar {
    text-decoration-thickness: 1px;
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: red;
  }
`;

const buttonStyles = css`
  display: inline;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export interface TokenProps {
  style: string;
  position: HoverCursor;
  onHover(cursor: HoverCursor): void;
  children?: preact.ComponentChildren;
}

export const TokenSpan = ({ style, position, onHover, children }: TokenProps) => {
  const onClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    onHover(position);
  }, [position, onHover]);

  if (style === 'property' || style === 'attribute') {
    // NOTE: This has to be an <a>-link instead of a <button> so
    // that the content remains editable
    return (
      <a
        href="#"
        className={`${tokenStyles} ${buttonStyles} ${style}`}
        onClick={onClick}
        role="button"
      >
        {children}
      </a>
    );
  }

  return (
    <span className={`${tokenStyles} ${style}`}>
      {children}
    </span>
  );
};
