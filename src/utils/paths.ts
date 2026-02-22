export function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

export function isHomePath(pathname: string): boolean {
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath === '/' || normalizedPath === '/index.html';
}
