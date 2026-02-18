import crossIcon from '@/assets/icons/cross.svg';

type CrossIconProps = {
  className?: string;
};

export function CrossIcon({ className }: CrossIconProps) {
  return (
    <img src={crossIcon} className={className} alt="" aria-hidden="true" />
  );
}
