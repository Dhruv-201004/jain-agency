import { formatDate } from "@/lib/formatters";
import { connectDB } from "@/lib/db";
import { Message } from "@/models/Message";
import { RecruitmentApplication } from "@/models/RecruitmentApplication";

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
  let recruitmentApplications: Array<{
    _id: unknown;
    name: string;
    email: string;
    phone: string;
    role: string;
    experience: number;
    portfolioUrl?: string;
    message: string;
    createdAt: string | Date;
  }> = [];

  try {
    await connectDB();
    [messages, recruitmentApplications] = await Promise.all([
      Message.find().sort({ createdAt: -1 }).lean(),
      RecruitmentApplication.find().sort({ createdAt: -1 }).lean(),
    ]);
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

  if (messages.length === 0 && recruitmentApplications.length === 0) {
    return (
      <p className="surface rounded-xl border-dashed p-6 text-slate-500">
        No responses yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Contact Inquiries ({messages.length})
        </h2>
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
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                    No contact inquiries yet.
                  </td>
                </tr>
              ) : (
                messages.map((message) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Recruitment Applications ({recruitmentApplications.length})
        </h2>
        <div className="surface overflow-x-auto rounded-2xl">
          <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Portfolio</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recruitmentApplications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-slate-500">
                    No recruitment applications yet.
                  </td>
                </tr>
              ) : (
                recruitmentApplications.map((application) => (
                  <tr key={String(application._id)} className="align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {application.name}
                    </td>
                    <td className="px-4 py-3">{application.email}</td>
                    <td className="px-4 py-3">{application.phone}</td>
                    <td className="px-4 py-3">{application.role}</td>
                    <td className="px-4 py-3">{application.experience} yrs</td>
                    <td className="px-4 py-3">
                      {application.portfolioUrl ? (
                        <a
                          href={application.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-600"
                        >
                          Open
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3 max-w-md whitespace-pre-wrap">
                      {application.message}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(new Date(application.createdAt).toISOString())}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
