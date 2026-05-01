export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} The Jain Agency. All rights reserved.</p>
        <p>
          Built for schools, hospitals, private businesses, manufacturers, and
          industrial growth teams.
        </p>
      </div>
    </footer>
  );
}
