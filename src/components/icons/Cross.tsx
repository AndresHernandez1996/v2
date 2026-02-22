type CrossProps = {
  className?: string;
};

export function Cross({ className }: CrossProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22.5 7.5L7.5 22.5M7.5 7.5L22.5 22.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
