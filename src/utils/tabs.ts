export function getNextTabIndexByKey(
  key: string,
  currentIndex: number,
  lastIndex: number,
): number | null {
  switch (key) {
    case 'ArrowRight':
      return currentIndex === lastIndex ? 0 : currentIndex + 1;
    case 'ArrowLeft':
      return currentIndex === 0 ? lastIndex : currentIndex - 1;
    case 'Home':
      return 0;
    case 'End':
      return lastIndex;
    default:
      return null;
  }
}
