import type { ReactNode } from 'react';
import { useState } from 'react';
import styles from './Tooltip.module.scss';

type TooltipProps = {
  content: string;
  children: ReactNode;
  className?: string;
};

export function Tooltip({ content, children, className }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootClassName = [styles.root, className, isOpen ? styles.open : '']
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={content}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onClick={(event) => {
          event.currentTarget.blur();
          setIsOpen(false);
        }}
      >
        {children}
      </button>
      <span className={styles.bubble} role="tooltip">
        {content}
      </span>
    </span>
  );
}
