import { forwardRef } from 'preact/compat';
import { useMemo, useState, useRef, useLayoutEffect } from 'preact/hooks';
import { TokenPosition } from './utils';

export interface HintsProps extends
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'ref' | 'style'> {
  position: TokenPosition;
  children?: preact.ComponentChildren;
}

const marginLeft = '1.5ch';
const marginTop = '1.2ch';

export const Popup = forwardRef((
  { position, children, ...rest }: HintsProps,
  ref: preact.Ref<HTMLDivElement>
) => {
  const wrapperStyle = useMemo(() => ({
    position: 'absolute',
    left: `calc(${position.columnStart}ch + ${marginLeft})`,
    top: `calc(${(position.row + 1) * 1.3}em + ${marginTop})`,
  }), [position]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [popupStyle, setPopupStyle] = useState<JSX.CSSProperties>({
    visibility: 'hidden',
    position: 'relative'
  });

  useLayoutEffect(() => {
    let updating = false;

    const updateStyle = () => {
      if (updating) return;
      updating = true;
      requestAnimationFrame(() => {
        updating = false;
        const { current: element } = wrapperRef;
        if (!element) return;
        const { left, top } = element.getBoundingClientRect();
        setPopupStyle({
          position: 'fixed',
          top: `${top}px`,
          left: `${left}px`,
        });
      });
    };

    updateStyle();
    const opts = { passive: true };
    window.addEventListener('scroll', updateStyle, opts);
    return () => {
      window.removeEventListener('scroll', updateStyle, opts as any);
    };
  }, [position]);

  return (
    <div style={wrapperStyle} ref={wrapperRef}>
      <div {...rest} style={popupStyle} ref={ref}>
        {children}
      </div>
    </div>
  );
});
