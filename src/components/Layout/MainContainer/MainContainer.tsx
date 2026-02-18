import type { ReactNode } from 'react';
import styles from './MainContainer.module.scss';

type MainContainerProps = {
  children: ReactNode;
};

export function MainContainer({ children }: MainContainerProps) {
  return <main className={styles.main}>{children}</main>;
}
