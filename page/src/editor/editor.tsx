import { useReducer, useRef, useCallback, useEffect } from 'preact/hooks';
import { CompletionItem } from 'graphql-language-service-types';
import { GraphQLSchema } from 'graphql';

import {
  getAutocompleteSuggestions,
  getHoverInformation,
  getTokenAtPosition,
  getDiagnostics,
} from 'graphql-language-service-interface';

import { TokenPosition, HoverCursor, Cursor } from './utils';
import { Textbox, TextboxHandle } from './textbox';
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
}

const enum ActionType {
  SwitchSchema,
  HideOverlays,
  UpdateHints,
  UpdateHover,
}

type Action =
  | { type: ActionType.SwitchSchema }
  | { type: ActionType.HideOverlays }
  | { type: ActionType.UpdateHints, hints: HintsState | null }
  | { type: ActionType.UpdateHover, hover: HoverState | null };

const initialState: State = { hover: null, hints: null };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SwitchSchema:
    case ActionType.HideOverlays:
      return { hover: null, hints: null };
    case ActionType.UpdateHints:
      return { ...state, hover: null, hints: action.hints };
    case ActionType.UpdateHover:
      return { ...state, hints: null, hover: action.hover };
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
  const schemaRef = useRef<GraphQLSchema | null>(props.schema);
  const textbox = useRef<TextboxHandle>();

  useEffect(() => {
    schemaRef.current = props.schema || null;
    dispatch({ type: ActionType.SwitchSchema });
  }, [props.schema]);

  const onChange = useCallback((cursor: Cursor) => {
    const { current: schema } = schemaRef;
    if (props.onChange) {
      props.onChange(cursor.text);
    }

    if (!schema) {
      return dispatch({ type: ActionType.UpdateHints, hints: null });
    }

    const token = cursor.getToken();
    if (!token.string || token.style === 'invalidchar' || token.style === 'ws') {
      return dispatch({ type: ActionType.UpdateHints, hints: null });
    }

    const suggestions = getAutocompleteSuggestions(schema, cursor.text, cursor, token);
    if (!suggestions.length || token.string === suggestions[0].label) {
      return dispatch({ type: ActionType.UpdateHints, hints: null });
    }

    const columnEnd = cursor.character;
    const columnStart = token.style !== 'punctuation' && token.style !== 'ws'
      ? columnEnd - token.string.length
      : columnEnd;

    const hints = { suggestions, position: { row: cursor.line, columnStart, columnEnd } };
    dispatch({ type: ActionType.UpdateHints, hints });
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
      dispatch({ type: ActionType.UpdateHover, hover });
    }
  }, []);

  const onDismiss = useCallback(() => {
    dispatch({ type: ActionType.HideOverlays });
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dispatch({ type: ActionType.HideOverlays });
    }
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
      onChange={onChange}
      onKeyDown={onKeyDown}
      onClick={onClickToken}
      disabled={props.disabled}
      initialText={props.initialText}
      className={props.className}
      aria-haspopup={haspopup}
      aria-controls={controls}
    >
      {state.hints && (
        <Hints {...state.hints} onSelect={onSelectHint} onDismiss={onDismiss} />
      )}
      {state.hover && (
        <Hover {...state.hover} onDismiss={onDismiss} />
      )}
    </Textbox>
  );
};
