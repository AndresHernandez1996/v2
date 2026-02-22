import { useEffect, useState } from 'react';

const IS_SERVER = typeof window === 'undefined';

export function useViewportBreakpoint(mediaQuery: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (IS_SERVER) {
      return false;
    }

    return window.matchMedia(mediaQuery).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const query = window.matchMedia(mediaQuery);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    query.addEventListener('change', onChange);

    return () => {
      query.removeEventListener('change', onChange);
    };
  }, [mediaQuery]);

  return matches;
}
