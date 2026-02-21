export const BREAKPOINTS = {
  md: 768,
} as const;

export const MEDIA_QUERIES = {
  maxMd: `(max-width: ${BREAKPOINTS.md}px)`,
} as const;
