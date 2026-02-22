import { Burger } from './Burger';
import { ChevronDown } from './ChevronDown';
import { Cross } from './Cross';
import { D6 } from './D6';
import { D20 } from './D20';
import { GitHub } from './GitHub';
import { IconLoader } from './IconLoader';
import { Instagram } from './Instagram';
import { Isotipo } from './Isotipo';
import { LinkedIn } from './LinkedIn';
import { Mail } from './Mail';
import { Twitter } from './Twitter';
import { X } from './X';

export type IconName =
  | 'Burger'
  | 'ChevronDown'
  | 'Cross'
  | 'D6'
  | 'D20'
  | 'GitHub'
  | 'Instagram'
  | 'Isotipo'
  | 'LinkedIn'
  | 'Linkedin'
  | 'Loader'
  | 'Mail'
  | 'Twitter'
  | 'X';

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const iconProps = className ? { className } : {};

  switch (name) {
    case 'Burger':
      return <Burger {...iconProps} />;
    case 'ChevronDown':
      return <ChevronDown {...iconProps} />;
    case 'Cross':
      return <Cross {...iconProps} />;
    case 'D6':
      return <D6 {...iconProps} />;
    case 'D20':
      return <D20 {...iconProps} />;
    case 'GitHub':
      return <GitHub {...iconProps} />;
    case 'Instagram':
      return <Instagram {...iconProps} />;
    case 'Isotipo':
      return <Isotipo {...iconProps} />;
    case 'LinkedIn':
    case 'Linkedin':
      return <LinkedIn {...iconProps} />;
    case 'Loader':
      return <IconLoader />;
    case 'Mail':
      return <Mail {...iconProps} />;
    case 'Twitter':
      return <Twitter {...iconProps} />;
    case 'X':
      return <X {...iconProps} />;
    default:
      return <Cross {...iconProps} />;
  }
}
