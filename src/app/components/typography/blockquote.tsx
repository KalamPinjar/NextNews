export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="mt-6 pl-6 border-l-2 italic">{children}</blockquote>
  );
}
