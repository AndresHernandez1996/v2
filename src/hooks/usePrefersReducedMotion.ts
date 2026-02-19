import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';
const IS_SERVER = typeof window === 'undefined';

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

const getInitialState = () =>
  IS_SERVER ? true : !window.matchMedia(QUERY).matches;

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(getInitialState);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY) as LegacyMediaQueryList;

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', onChange);
      return () => {
        mediaQueryList.removeEventListener('change', onChange);
      };
    }

    mediaQueryList.addListener?.(onChange);
    return () => {
      mediaQueryList.removeListener?.(onChange);
    };
  }, []);

  return prefersReducedMotion;
}
