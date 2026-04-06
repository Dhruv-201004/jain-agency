export default function LoadingProjects() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white"
        />
      ))}
    </div>
  );
}
