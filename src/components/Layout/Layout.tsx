import type { ReactNode } from 'react';
import styles from './Layout.module.scss';

type Props = { children: ReactNode };

export function Layout({ children }: Props) {
  return <div className={styles.layout}>{children}</div>;
}
