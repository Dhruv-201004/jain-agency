import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Message } from "@/models/Message";
import { Project } from "@/models/Project";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  let inquiryCount = 0;
  let projectCount = 0;
  let hasDbError = false;

  try {
    await connectDB();
    [inquiryCount, projectCount] = await Promise.all([
      Message.countDocuments(),
      Project.countDocuments(),
    ]);
  } catch {
    hasDbError = true;
  }

  if (hasDbError) {
    return (
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-6 text-amber-100">
        <h2 className="text-lg font-semibold">Database Not Configured</h2>
        <p className="mt-2 text-sm text-amber-200/90">
          Set MONGODB_URI in .env.local and restart the dev server to enable
          admin analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <article className="surface rounded-2xl p-6">
        <p className="text-sm text-slate-500">Total Inquiries</p>
        <p className="mt-2 text-4xl font-bold text-slate-900">{inquiryCount}</p>
        <Link
          href="/admin/messages"
          className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-600"
        >
          View messages →
        </Link>
      </article>
      <article className="surface rounded-2xl p-6">
        <p className="text-sm text-slate-500">Total Projects</p>
        <p className="mt-2 text-4xl font-bold text-slate-900">{projectCount}</p>
        <Link
          href="/admin/projects"
          className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-600"
        >
          Manage projects →
        </Link>
      </article>
    </div>
  );
}
