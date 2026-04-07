export function Card({ children }: { children: React.ReactNode }) {
  return <section className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm p-4">{children}</section>;
}
