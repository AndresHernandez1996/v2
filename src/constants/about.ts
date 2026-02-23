import jsIcon from '@/assets/about/JS.webp';
import reactIcon from '@/assets/about/React.webp';
import tsIcon from '@/assets/about/TS.webp';
import nextIcon from '@/assets/about/NextJs.webp';
import tailwindIcon from '@/assets/about/Tailwind.webp';
import sassIcon from '@/assets/about/Sass.webp';
import antdIcon from '@/assets/about/Antd.webp';
import yayoImage from '@/assets/about/yayo.png';

export const ABOUT_TECHNOLOGIES = [
  { src: jsIcon, alt: 'JavaScript' },
  { src: reactIcon, alt: 'React' },
  { src: tsIcon, alt: 'TypeScript' },
  { src: nextIcon, alt: 'Next.js' },
  { src: tailwindIcon, alt: 'Tailwind CSS' },
  { src: sassIcon, alt: 'Sass' },
  { src: antdIcon, alt: 'Ant Design' },
] as const;

export const ABOUT_IMAGE = yayoImage;
