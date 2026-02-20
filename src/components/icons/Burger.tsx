type BurgerProps = {
  className?: string;
};

export function Burger({ className }: BurgerProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.75 15H26.25M3.75 7.5H26.25M3.75 22.5H26.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
