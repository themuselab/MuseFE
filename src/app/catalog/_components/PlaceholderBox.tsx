type PlaceholderBoxProps = {
  className?: string;
  children?: React.ReactNode;
};

export function PlaceholderBox({ className = "", children }: PlaceholderBoxProps) {
  return (
    <div
      className={`relative bg-neutral-200 rounded-md flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
