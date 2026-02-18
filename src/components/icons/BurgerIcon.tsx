import burgerIcon from '@/assets/icons/burger.svg';

type BurgerIconProps = {
  className?: string;
};

export function BurgerIcon({ className }: BurgerIconProps) {
  return (
    <img src={burgerIcon} className={className} alt="" aria-hidden="true" />
  );
}
