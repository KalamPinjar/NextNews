export function TypographyP({ children }: { children: React.ReactNode }) {
  return <p className="[&:not(:first-child)]:mt-6 leading-7">{children}</p>;
}
