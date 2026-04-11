import { type SVGProps } from "react";

type IconSize = "sm" | "md" | "lg" | "xl";

type IconProps = {
  size?: IconSize;
  className?: string;
} & SVGProps<SVGSVGElement>;

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export function Icon({
  size = "lg",
  className = "",
  children,
  ...rest
}: IconProps) {
  const px = sizeMap[size];

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      className={`shrink-0 ${className}`}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ── Visibility Icons ── */

export function VisibilityOnIcon({ size = "lg", className = "" }: { size?: IconSize; className?: string }) {
  const px = sizeMap[size];
  return (
    <svg width={px} height={px} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
      <path
        d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function VisibilityOffIcon({ size = "lg", className = "" }: { size?: IconSize; className?: string }) {
  const px = sizeMap[size];
  return (
    <svg width={px} height={px} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
      <path
        d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.89 1 12.5A11.83 11.83 0 016.06 7.06M9.9 5.24A9.12 9.12 0 0112 5C17 5 21.27 8.11 23 12.5A11.83 11.83 0 0119.74 16.24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
