import { formatDate } from "@/lib/formatters";
import { connectDB } from "@/lib/db";
import { Message } from "@/models/Message";

export const metadata = {
  title: "Admin Messages",
};

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  let hasDbError = false;
  let messages: Array<{
    _id: unknown;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string | Date;
  }> = [];

  try {
    await connectDB();
    messages = await Message.find().sort({ createdAt: -1 }).lean();
  } catch {
    hasDbError = true;
  }

  if (hasDbError) {
    return (
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-6 text-amber-100">
        <h2 className="text-lg font-semibold">Database Not Configured</h2>
        <p className="mt-2 text-sm text-amber-200/90">
          Set MONGODB_URI in .env.local and restart the dev server to view
          inquiries.
        </p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <p className="surface rounded-xl border-dashed p-6 text-slate-500">
        No inquiries yet.
      </p>
    );
  }

  return (
    <div className="surface overflow-x-auto rounded-2xl">
      <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm">
        <thead className="bg-slate-50">
          <tr className="text-slate-600">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Message</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {messages.map((message) => (
            <tr key={String(message._id)} className="align-top">
              <td className="px-4 py-3 font-medium text-slate-900">
                {message.name}
              </td>
              <td className="px-4 py-3">{message.email}</td>
              <td className="px-4 py-3">{message.phone}</td>
              <td className="px-4 py-3 max-w-md whitespace-pre-wrap">
                {message.message}
              </td>
              <td className="px-4 py-3">
                {formatDate(new Date(message.createdAt).toISOString())}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
