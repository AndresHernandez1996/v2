import headVectorRaw from '@/assets/headVector.svg?raw';
import yVectorRaw from '@/assets/yVector.svg?raw';

const cleanSvg = (raw: string) =>
  raw
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/#000000/gi, 'currentColor')
    .trim();

const headVector = cleanSvg(headVectorRaw);
const yVector = cleanSvg(yVectorRaw);

export function IconLoader() {
  return (
    <div id="loader-logo" aria-hidden="true">
      <div
        className="headVector"
        dangerouslySetInnerHTML={{ __html: headVector }}
      />
      <div className="yVector" dangerouslySetInnerHTML={{ __html: yVector }} />
    </div>
  );
}
