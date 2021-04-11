import { forwardRef } from 'preact/compat';
import { useRef, useCallback, useMemo, useState, useImperativeHandle } from 'preact/hooks';
import { css } from 'goober';
import { useEditable, Edit, Position } from 'use-editable';

import { tokenizeGraphQL, Cursor, HoverCursor } from './utils';
import { TokenSpan } from './token';

const wrapperStyles = css`
  font-family: Source Code Pro,source-code-pro,Menlo,Consolas,Monaco,Andale Mono,Courier New,monospace;
  font-size: 14px;
  line-height: 1.3em;
  display: grid;
  grid-template-columns: minmax(7ch, min-content) 1fr;
  border-radius: 0.5em;
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
`;

const gutterStyles = css`
  user-select: none;
  line-height: 1.3em;
  list-style-type: none;
  padding: 1.2ch 2ch;
  margin: 0;
  text-align: right;
  border-radius: 0.5em;
  background-color: #ecf0f2;
  color: #d2d2d2;
`;

const lineNoStyles = css`
  margin: 0;
`;

const surfaceStyles = css`
  line-height: 1.3em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0;
`;

const editableStyles = css`
  display: block;
  padding: 1.2ch 1ch 1.2ch 1.5ch;
  white-space: pre;
  color: #2d3748;
  caret-color: #526fff;
  height: 100%;

  &:focus {
    appearance: none;
    outline: 0;
  }
`;

export interface TextboxHandle extends Edit {
  text: string;
}

export interface TextboxProps extends
  Omit<JSX.HTMLAttributes<HTMLElement>, 'ref' | 'onChange' | 'onClick'> {
  initialText?: string;
  disabled?: boolean;
  onChange?(cursor: Cursor): void;
  onClick?(position: HoverCursor): void;
  onKeyDown?(event: KeyboardEvent): void;
  children?: preact.ComponentChildren;
}

export const Textbox = forwardRef((props: TextboxProps, ref: preact.Ref<TextboxHandle>) => {
  const {
    className,
    initialText,
    disabled,
    onChange,
    onKeyDown,
    onClick,
    children,
    ...rest
  } = props;

  const [text, setText] = useState(initialText || '# Enter a GraphQL query.');
  const tokens = useMemo(() => tokenizeGraphQL(text), [text]);
  const editableRef = useRef<HTMLPreElement>(null);

  const onEditableChange = useCallback((code: string, position: Position) => {
    setText(code.slice(0, -1));
    if (onChange) onChange(new Cursor(code, position));
  }, [onChange]);

  const edit = useEditable(editableRef, onEditableChange, {
    disabled,
    indentation: 2,
  });

  useImperativeHandle(ref, () => ({ text, ...edit }), [text]);

  return (
    <div
      className={`${wrapperStyles} ${className || ''}`}
      onKeyDown={onKeyDown}
    >
      <ul className={gutterStyles} aria-hidden="true">
        {tokens.map((_, i) => <li className={lineNoStyles}>{i + 1}</li>)}
      </ul>

      <pre className={surfaceStyles}>
        <code
          role="textbox"
          aria-multiline="true"
          aria-autocomplete="list"
          aria-readonly={disabled ? 'true' : 'false'}
          className={editableStyles}
          tabIndex={0}
          ref={editableRef}
          {...rest}
        >
        {tokens.map((line, row) => (
          <>
            {line.map((token, i) => (
              <TokenSpan
                style={token.style}
                key={`${row}-${i}`}
                onClick={onClick && (() => {
                  onClick(new HoverCursor(row, token.start + 1));
                })}
              >
                {token.string}
              </TokenSpan>
            ))}
            {'\n'}
          </>
        ))}
        </code>

        {children}
      </pre>
    </div>
  );
});
