import { forwardRef, memo } from 'preact/compat';
import { Diagnostic } from 'graphql-language-service-types';
import { getDiagnostics } from 'graphql-language-service-interface';
import { useRef, useCallback, useMemo, useState, useImperativeHandle } from 'preact/hooks';
import { useEditable, Edit, Position } from 'use-editable';
import { GraphQLSchema } from 'graphql';
import { css } from 'goober';

import { TokenSpan } from './token';

import {
  getDiagnosticForCursor,
  tokenizeGraphQL,
  HoverCursor,
  Cursor,
} from './utils';

const wrapperStyles = css`
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

interface State {
  diagnostics: Diagnostic[];
  text: string;
}

export interface TextboxHandle extends Edit {
  text: string;
}

export interface TextboxProps extends
  Omit<JSX.HTMLAttributes<HTMLElement>, 'ref' | 'onChange' | 'onClick'> {
  schemaRef?: preact.RefObject<GraphQLSchema | null>;
  initialText?: string;
  disabled?: boolean;
  onChange?(cursor: Cursor): void;
  onClick?(position: HoverCursor): void;
  onDiagnostic?(diagnostic: Diagnostic | null): void;
  onKeyDown?(event: KeyboardEvent): void;
  children?: preact.ComponentChildren;
}

export const Textbox = memo(forwardRef((props: TextboxProps, ref: preact.Ref<TextboxHandle>) => {
  const {
    schemaRef,
    className,
    initialText,
    disabled,
    onDiagnostic,
    onChange,
    onKeyDown,
    onClick,
    children,
    ...rest
  } = props;

  const [state, setState] = useState<State>({
    diagnostics: [],
    text: initialText || '# Enter a GraphQL query.\n\n{}'
  });

  const tokens = useMemo(() => tokenizeGraphQL(state.text), [state.text]);
  const editableRef = useRef<HTMLPreElement>(null);

  const onEditableChange = useCallback((code: string, position: Position) => {
    const text = code.slice(0, -1);

    setState({
      diagnostics: schemaRef
        ? getDiagnostics(text, schemaRef.current)
        : [],
      text,
    });

    if (onChange) onChange(new Cursor(code, position));
  }, [onChange, schemaRef]);

  const edit = useEditable(editableRef, onEditableChange, {
    disabled,
    indentation: 2,
  });

  useImperativeHandle(ref, () => ({ text: state.text, ...edit }), [state.text]);

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
          autocomplete="off"
          autocorrect="off"
          spellcheck={false}
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
            {line.map((token, i) => {
              const cursor = new HoverCursor(row, token.start + 1);
              const diagnostic = getDiagnosticForCursor(state.diagnostics, cursor);

              return (
                <TokenSpan
                  onClick={onClick && (() => onClick(cursor))}
                  onMouseOver={onDiagnostic && diagnostic && (() => onDiagnostic(diagnostic))}
                  onMouseOut={onDiagnostic && diagnostic && (() => onDiagnostic(null))}
                  hasError={!!diagnostic}
                  style={token.style}
                  key={`${row}-${i}`}
                >
                  {token.string}
                </TokenSpan>
              );
            })}
            {'\n'}
          </>
        ))}
        </code>

        {children}
      </pre>
    </div>
  );
}));
