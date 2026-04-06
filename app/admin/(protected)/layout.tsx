import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <section className="space-y-6">
      <div className="surface flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-600">Signed in as {session.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="btn-outline px-3 py-2 text-xs">
            Overview
          </Link>
          <Link
            href="/admin/projects"
            className="btn-outline px-3 py-2 text-xs"
          >
            Projects
          </Link>
          <Link
            href="/admin/messages"
            className="btn-outline px-3 py-2 text-xs"
          >
            Messages
          </Link>
          <AdminLogoutButton />
        </div>
      </div>
      {children}
    </section>
  );
}
