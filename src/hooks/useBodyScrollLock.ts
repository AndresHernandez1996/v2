import { useEffect } from 'react';

type UseBodyScrollLockOptions = {
  className?: string;
};

export function useBodyScrollLock(
  isLocked: boolean,
  options: UseBodyScrollLockOptions = {},
) {
  const { className } = options;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isLocked) {
      document.body.style.overflow = 'hidden';
      if (className) {
        document.body.classList.add(className);
      }
    } else if (className) {
      document.body.classList.remove(className);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      if (className) {
        document.body.classList.remove(className);
      }
    };
  }, [className, isLocked]);
}
