import headVectorRaw from '@/assets/headVector.svg?raw';
import yVectorRaw from '@/assets/yVector.svg?raw';
import { cleanSvg } from '@/lib/cleanSvg';

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
