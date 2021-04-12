import { useReducer, useRef, useCallback, useEffect } from 'preact/hooks';
import { CompletionItem, Diagnostic } from 'graphql-language-service-types';
import { GraphQLSchema } from 'graphql';

import {
  getAutocompleteSuggestions,
  getHoverInformation,
  getTokenAtPosition,
} from 'graphql-language-service-interface';

import { TokenPosition, HoverCursor, Cursor } from './utils';
import { Textbox, TextboxHandle } from './textbox';
import { Error } from './error';
import { Hints } from './hints';
import { Hover } from './hover';

interface HoverState {
  content: string;
  position: TokenPosition;
}

interface HintsState {
  suggestions: CompletionItem[];
  position: TokenPosition;
}

interface State {
  hover: HoverState | null;
  hints: HintsState | null;
  diagnostic: Diagnostic | null;
}

const enum ActionType {
  SwitchSchema,
  HideOverlays,
  Diagnostic,
  Update,
  Hover,
}

type Action =
  | { type: ActionType.SwitchSchema }
  | { type: ActionType.HideOverlays }
  | { type: ActionType.Update, hints: HintsState | null }
  | { type: ActionType.Hover, hover: HoverState | null }
  | { type: ActionType.Diagnostic, diagnostic: Diagnostic | null };

const initialState: State = {
  diagnostic: null,
  hover: null,
  hints: null
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.HideOverlays:
    case ActionType.SwitchSchema:
      return initialState;
    case ActionType.Update:
      return { ...state, hover: null, diagnostic: null, hints: action.hints };
    case ActionType.Hover:
      return { ...state, hints: null, diagnostic: null, hover: action.hover };
    case ActionType.Diagnostic:
      return { ...state, hints: null, diagnostic: action.diagnostic };
    default:
      return state;
  }
};

export interface EditorProps {
  onChange?(text: string): void;
  schema?: GraphQLSchema | null | undefined;
  disabled?: boolean;
  className?: string;
  initialText?: string;
}

export const Editor = (props: EditorProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const frameRef = useRef<number | null>(null);
  const blockTimerRef = useRef<any>(null);
  const schemaRef = useRef<GraphQLSchema | null>(props.schema);
  const textbox = useRef<TextboxHandle>();

  useEffect(() => {
    schemaRef.current = props.schema || null;
    dispatch({ type: ActionType.SwitchSchema });
  }, [props.schema]);

  const onChange = useCallback((cursor: Cursor) => {
    const { current: schema } = schemaRef;
    if (props.onChange) props.onChange(cursor.text);

    const baseAction: Action = { type: ActionType.Update, hints: null };
    if (!schema) return dispatch(baseAction);

    const token = cursor.getToken();
    if (!token.string || token.style === 'invalidchar' || token.style === 'ws')
      return dispatch(baseAction);
    const suggestions = getAutocompleteSuggestions(schema, cursor.text, cursor, token);
    if (!suggestions.length || token.string === suggestions[0].label)
      return dispatch(baseAction);

    const columnEnd = cursor.character;
    const columnStart = token.style !== 'punctuation' && token.style !== 'ws'
      ? columnEnd - token.string.length
      : columnEnd;

    const hints = { suggestions, position: { row: cursor.line, columnStart, columnEnd } };
    dispatch({ ...baseAction, hints });
  }, []);

  const onSelectHint = useCallback((suggestion: CompletionItem, position: TokenPosition) => {
    const { current: handle } = textbox;
    if (handle) {
      handle.move({ row: position.row, column: position.columnEnd });
      handle.insert(suggestion.label, position.columnStart - position.columnEnd);
    }
  }, []);

  const onClickToken = useCallback((cursor: HoverCursor) => {
    const { current: handle } = textbox;
    const { current: schema } = schemaRef;
    if (schema && handle) {
      const token = getTokenAtPosition(handle.text, cursor);
      const info = getHoverInformation(schema, handle.text, cursor, token);
      const hover = info
        ? {
          content: `${info}`,
          position: {
            row: cursor.line,
            columnStart: cursor.character,
            columnEnd: cursor.character
          },
        } : null;
      dispatch({ type: ActionType.Hover, hover });
    }
  }, []);

  const onDiagnostic = useCallback((diagnostic: Diagnostic | null) => {
    if (blockTimerRef.current) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      dispatch({ type: ActionType.Diagnostic, diagnostic });
    });
  }, []);

  const onDismiss = useCallback(() => {
    dispatch({ type: ActionType.HideOverlays });
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dispatch({ type: ActionType.HideOverlays });
    }

    // Block hovers for a set amount of time
    if (blockTimerRef.current) clearTimeout(blockTimerRef.current);
    blockTimerRef.current = setTimeout(() => blockTimerRef.current = null, 700);
  }, []);

  const haspopup =
    (state.hints && 'listbox') ||
    (state.hover && 'dialog') ||
    'false';
  const controls =
    (state.hints && 'hints-popup') ||
    (state.hover && 'hover-popup') ||
    undefined;

  return (
    <Textbox
      ref={textbox}
      schemaRef={schemaRef}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onClick={onClickToken}
      onDiagnostic={onDiagnostic}
      disabled={props.disabled}
      initialText={props.initialText}
      className={props.className}
      aria-haspopup={haspopup}
      aria-controls={controls}
    >
      {state.hover ? (
        <Hover {...state.hover} onDismiss={onDismiss} />
      ) : null}
      {state.hints && !state.hover ? (
        <Hints {...state.hints} onSelect={onSelectHint} onDismiss={onDismiss} />
      ) : null}
      {state.diagnostic && !state.hints && !state.hover ? (
        <Error diagnostic={state.diagnostic} />
      ) : null}
    </Textbox>
  );
};
