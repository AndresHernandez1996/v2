type LinkedInProps = {
  className?: string;
};

export function LinkedIn({ className }: LinkedInProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13.3333 6.6665C14.6594 6.6665 15.9311 7.19329 16.8688 8.13097C17.8065 9.06865 18.3333 10.3404 18.3333 11.6665V17.4998H15V11.6665C15 11.2245 14.8244 10.8006 14.5118 10.488C14.1992 10.1754 13.7753 9.99984 13.3333 9.99984C12.8913 9.99984 12.4673 10.1754 12.1548 10.488C11.8422 10.8006 11.6666 11.2245 11.6666 11.6665V17.4998H8.33329V11.6665C8.33329 10.3404 8.86008 9.06865 9.79776 8.13097C10.7354 7.19329 12.0072 6.6665 13.3333 6.6665Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.99996 7.49984H1.66663V17.4998H4.99996V7.49984Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33329 4.99984C4.25377 4.99984 4.99996 4.25365 4.99996 3.33317C4.99996 2.4127 4.25377 1.6665 3.33329 1.6665C2.41282 1.6665 1.66663 2.4127 1.66663 3.33317C1.66663 4.25365 2.41282 4.99984 3.33329 4.99984Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
