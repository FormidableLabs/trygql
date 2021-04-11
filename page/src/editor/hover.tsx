import { useMemo, useRef, useLayoutEffect } from 'preact/hooks';
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
  padding: 0.4ch;
  background-color: #ffffff;
  border: 1px solid #eeebf7;
  box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.13);
  max-width: 45ch;
`;

const titleStyles = css`
  font-style: italic;
`;

const detailsStyles = css`
  color: #a0a1a7;
  font-size: 0.9em;
  margin: 0.5ch 0 0 0;
`;

export interface HoverProps {
  content: string;
  position: TokenPosition;
  onDismiss(): void;
}

export const Hover = ({ content, position, onDismiss }: HoverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const onClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current.contains(event.target as Node)) {
        event.stopPropagation();
        onDismiss();
      }
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('touchstart', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('touchstart', onClick);
    };
  }, [onDismiss]);

  const pos = useMemo(() => ({
    ...position,
    columnStart: position.columnStart - 1,
  }), [position]);

  const lines = content.split('\n').filter(Boolean);
  const title = lines[0];
  const description = lines.slice(1).join('\n');

  return (
    <Popup
      ref={ref}
      className={wrapperStyles}
      position={pos}
      aria-labelledby="hover-popup-title"
      aria-describedby="hover-popup-desc"
      aria-modal="false"
      id="hover-popup"
      role="dialog"
    >
      <span id="hover-popup-title" className={titleStyles}>{title}</span>
      {description ? (
        <p id="hover-popup-desc" className={detailsStyles}>{description}</p>
      ) : null}
    </Popup>
  );
};
