import ScrollReveal from 'scrollreveal';

const BASE_CONFIG = {
  distance: '28px',
  duration: 700,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  opacity: 0,
  scale: 0.98,
  reset: false,
  mobile: true,
  viewFactor: 0.2,
};

export function initScrollReveal() {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (prefersReducedMotion) {
    return () => {};
  }

  const sr = ScrollReveal();

  sr.reveal('[data-sr="title"]', {
    ...BASE_CONFIG,
    origin: 'bottom',
    delay: 200,
  });

  sr.reveal('[data-sr="text"]', {
    ...BASE_CONFIG,
    origin: 'bottom',
    interval: 110,
    delay: 260,
  });

  sr.reveal('[data-sr="actions"]', {
    ...BASE_CONFIG,
    origin: 'bottom',
    delay: 360,
  });

  return () => sr.destroy();
}
