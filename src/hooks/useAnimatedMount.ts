import { useEffect, useState } from 'react';

type UseAnimatedMountOptions = {
  delayMs: number;
};

type UseAnimatedMountResult = {
  isMounted: boolean;
  prefersReducedMotion: boolean;
};

export function useAnimatedMount({
  delayMs,
}: UseAnimatedMountOptions): UseAnimatedMountResult {
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsMounted(true), delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [delayMs, prefersReducedMotion]);

  return { isMounted, prefersReducedMotion };
}
