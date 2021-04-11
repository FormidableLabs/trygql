import { useState, useRef, useLayoutEffect } from 'preact/hooks';
import { CompletionItem } from 'graphql-language-service-types';
import { css } from 'goober';

import { Popup } from './popup';
import { TokenPosition } from './utils';

const wrapperStyles = css`
  z-index: 1;
  min-width: 8rem;
  list-style-type: none;
  border-radius: 0.3em;
  color: #666666;
  margin-top: 0.3em;
  padding: 0.4ch 0;
  background-color: #ffffff;
  border: 1px solid #eeebf7;
  box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.13);
  white-space: normal;
`;

const itemStyle = css`
  padding: 0.7ch;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;

  &:hover, &.active {
    background-color: #edf0ff;
  }
`;

const labelStyle = css`
  padding-right: 4ch;
`;

const detailStyle = css`
  text-align: right;
  color: #a0a1a7;
  font-size: 0.9em;
`;

export interface HintsProps {
  suggestions: CompletionItem[];
  position: TokenPosition;
  onSelect(item: CompletionItem, position: TokenPosition): void;
  onDismiss(): void;
}

export const Hints = ({
  suggestions,
  position,
  onSelect,
  onDismiss,
}: HintsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);

  /*
  const style = useMemo(() => ({
    left: `${position.columnStart}ch`,
    top: `${(position.row + 1) * 1.3}em`
  }), [position]);
  */

  useLayoutEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelected(selected < suggestions.length - 1 ? selected + 1 : 0);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelected(selected > 0 ? selected - 1 : suggestions.length - 1);
      } else if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        onSelect(suggestions[selected], position);
      } else if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault();
        onSelect(suggestions[selected], position);
      }
    };

    const onClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current.contains(event.target as Node)) {
        event.stopPropagation();
        onDismiss();
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('touchstart', onClick);

    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('touchstart', onClick);
    };
  }, [suggestions, position, selected]);

  return (
    <Popup
      ref={ref}
      className={wrapperStyles}
      position={position}
      id="hints-popup"
      role="listbox"
    >
      {suggestions.map((suggestion, index) => {
        const isSelected = selected === index;
        const onClick = (event: MouseEvent) => {
          event.preventDefault();
          onSelect(suggestion, position);
        };

        return (
          <li
            role="option"
            aria-selected={isSelected ? 'true' : 'false'}
            className={`${itemStyle} ${isSelected ? 'active' : ''}`}
            onClick={onClick}
          >
            <span className={labelStyle}>{suggestion.label}</span>
            <span className={detailStyle}>{suggestion.detail}</span>
          </li>
        );
      })}
    </Popup>
  );
};
