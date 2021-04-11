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

  &.builtin,
  &.number {
    color: #e45649;
  }

  &.qualifier,
  &.string {
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

  *:not(:focus) > &.invalidchar,
  *:not(:focus) > &.error {
    text-decoration-thickness: 1px;
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: red;
  }

  &.error {
    cursor: pointer;
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
  hasError?: boolean;
  onClick?(event: MouseEvent): void;
  onMouseOver?(event: MouseEvent): void;
  onMouseOut?(event: MouseEvent): void;
  children?: preact.ComponentChildren;
}

export const TokenSpan = (props: TokenProps) => {
  const { hasError, style } = props;
  if (hasError) {
    return (
      <span
        className={`${tokenStyles} ${style} error`}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
      >
        {props.children}
      </span>
    );
  } else if (style === 'property' || style === 'attribute') {
    // NOTE: This has to be an <a>-link instead of a <button> so
    // that the content remains editable
    return (
      <a
        href="#"
        className={`${tokenStyles} ${buttonStyles} ${style}`}
        onClick={props.onClick}
        role="button"
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <span className={`${tokenStyles} ${style}`}>
        {props.children}
      </span>
    );
  }
};
