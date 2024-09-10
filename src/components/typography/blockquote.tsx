export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="mt-6 pl-6 border-l-2 text-black/80 dark:text-white/70 italic">{children}</blockquote>
  );
}
