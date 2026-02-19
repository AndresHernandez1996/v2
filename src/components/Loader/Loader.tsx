import { useEffect, useRef, useState } from 'react';
import { createTimeline } from 'animejs';
import { Helmet } from 'react-helmet';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { IconLoader } from '../icons/IconLoader';
import styles from './Loader.module.scss';

type LoaderProps = {
  finishLoading: () => void;
};

export function Loader({ finishLoading }: LoaderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      const rafId = window.requestAnimationFrame(() => finishLoading());
      return () => {
        window.cancelAnimationFrame(rafId);
      };
    }

    const mountTimeout = window.setTimeout(() => setIsMounted(true), 80);
    const loaderEl = loaderRef.current;
    const logoEl = logoRef.current?.querySelector<HTMLElement>('#loader-logo');
    const headLayerEl =
      logoRef.current?.querySelector<HTMLElement>('.headVector');
    const yLayerEl = logoRef.current?.querySelector<HTMLElement>('.yVector');

    const headPaths =
      logoRef.current?.querySelectorAll<SVGPathElement>('.headVector path');
    const yPaths =
      logoRef.current?.querySelectorAll<SVGPathElement>('.yVector path');

    const preparePaths = (
      paths: SVGPathElement[] | NodeListOf<SVGPathElement>,
    ) =>
      Array.from(paths).forEach((path) => {
        const length = path.getTotalLength();
        path.style.fillOpacity = '0';
        path.style.stroke = 'currentColor';
        path.style.strokeWidth = '2';
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

    if (headPaths) {
      preparePaths(headPaths);
    }

    if (yPaths) {
      preparePaths(yPaths);
    }

    if (headLayerEl) {
      headLayerEl.style.clipPath = 'inset(100% 0% 0% 0%)';
    }

    const timeline = createTimeline({
      onComplete: () => finishLoading(),
    });

    if (headLayerEl) {
      timeline.add(headLayerEl, {
        delay: 320,
        duration: 800,
        ease: 'inOutSine',
        clipPath: 'inset(0% 0% 0% 0%)',
      });
    }

    timeline
      .add(headPaths ?? [], {
        delay: 120,
        duration: 700,
        ease: 'inOutQuart',
        strokeDashoffset: 0,
      })
      .add(headPaths ?? [], {
        duration: 340,
        ease: 'inOutSine',
        fillOpacity: 1,
        strokeOpacity: 0,
      });

    timeline
      .add(yLayerEl ?? [], {
        duration: 200,
        ease: 'inOutSine',
        opacity: 1,
      })
      .add(yPaths ?? [], {
        duration: 720,
        ease: 'inOutSine',
        strokeDashoffset: 0,
      })
      .add(yPaths ?? [], {
        duration: 320,
        ease: 'inOutSine',
        fillOpacity: 1,
        strokeOpacity: 0,
      })
      .add(logoEl ?? [], {
        delay: 420,
        duration: 260,
        ease: 'inOutSine',
        opacity: 0,
        scale: 0.1,
      });

    if (loaderEl) {
      timeline.add(loaderEl, {
        duration: 220,
        ease: 'inOutSine',
        opacity: 0,
      });
    }

    return () => {
      window.clearTimeout(mountTimeout);
      timeline.pause();
    };
  }, [finishLoading, prefersReducedMotion]);

  return (
    <div ref={loaderRef} className={styles.loader}>
      <Helmet bodyAttributes={{ class: 'hidden' }} />
      <div
        ref={logoRef}
        className={`${styles.logoWrapper} ${isMounted ? styles.isMounted : ''}`}
      >
        <IconLoader />
      </div>
    </div>
  );
}
