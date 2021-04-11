import { Position } from 'use-editable';
import { onlineParser, CharacterStream } from 'graphql-language-service-parser';
import { getTokenAtPosition } from 'graphql-language-service-interface';
import { IPosition } from 'graphql-language-service-types';

export interface TokenPosition {
  row: number;
  columnStart: number;
  columnEnd: number;
}

export interface Token {
  start: number;
  end: number;
  string: string;
  style: string;
}

export const tokenizeGraphQL = (code: string): Token[][] => {
  const parser = onlineParser();
  const input = code.split('\n');
  const state = parser.startState();

  const lines = [];
  for (let i = 0; i < input.length; i++) {
    const stream = new CharacterStream(input[i]);
    const tokens = [];
    while (!stream.eol()) {
      const style = parser.token(stream, state);
      const string = stream.current();
      if (string) {
        tokens.push({
          start: stream.getStartOfToken(),
          end: stream.getCurrentPosition(),
          string,
          style,
        });
      }
    }

    lines.push(tokens);
  }

  return lines;
};

export class HoverCursor implements IPosition {
  line: number;
  character: number;

  constructor(row: number, column: number) {
    this.line = row;
    this.character = column;
  }

  setLine(line: number) {
    this.line = line;
  }

  setCharacter(character: number) {
    this.character = character;
  }

  lessThanOrEqualTo(position: IPosition) {
    return this.line < position.line ||
      (this.line === position.line && this.character <= position.character);
  }
}

export class Cursor implements IPosition {
  text: string;
  line: number;
  character: number;

  constructor(text: string, position: Position) {
    this.text = text;
    this.line = position.line;
    this.character = position.content.length;
  }

  getToken() {
    return getTokenAtPosition(this.text, this);
  }

  setLine(line: number) {
    this.line = line;
  }

  setCharacter(character: number) {
    this.character = character;
  }

  lessThanOrEqualTo(position: IPosition) {
    return this.line < position.line ||
      (this.line === position.line && this.character <= position.character);
  }
}
