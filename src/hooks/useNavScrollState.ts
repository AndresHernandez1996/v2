import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down';

type UseNavScrollStateOptions = {
  isLocked?: boolean;
  topThreshold?: number;
  minDelta?: number;
};

type UseNavScrollStateResult = {
  scrollDirection: ScrollDirection;
  scrolledToTop: boolean;
};

export function useNavScrollState({
  isLocked = false,
  topThreshold = 50,
  minDelta = 6,
}: UseNavScrollStateOptions = {}): UseNavScrollStateResult {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>('down');
  const [scrolledToTop, setScrolledToTop] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.scrollY < topThreshold;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      if (isLocked) {
        return;
      }

      const current = window.scrollY;
      setScrolledToTop(current < topThreshold);

      if (Math.abs(current - lastScrollY) < minDelta) {
        return;
      }

      setScrollDirection(current > lastScrollY ? 'down' : 'up');
      lastScrollY = current > 0 ? current : 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isLocked, minDelta, topThreshold]);

  return { scrollDirection, scrolledToTop };
}
