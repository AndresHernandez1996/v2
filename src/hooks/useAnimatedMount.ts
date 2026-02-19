import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsMounted(true), delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [delayMs, prefersReducedMotion]);

  return { isMounted, prefersReducedMotion };
}
