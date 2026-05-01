type CloseIconSize = 16 | 20 | 24;

type CloseIconProps = {
  size?: CloseIconSize;
  className?: string;
};

export function CloseIcon({ size = 24, className = "" }: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
