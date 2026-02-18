export function cleanSvg(raw: string): string {
  return raw
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/#000000/gi, 'currentColor')
    .trim();
}
