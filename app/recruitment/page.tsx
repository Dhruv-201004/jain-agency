import type { Metadata } from "next";
import { RecruitmentForm } from "@/components/RecruitmentForm";

export const metadata: Metadata = {
  title: "Join Jain Agency",
  description:
    "Apply for current opportunities at Jain Agency. Share your details and we will get back to you.",
  keywords: [
    "Jain Agency recruitment",
    "jobs at Jain Agency",
    "web agency hiring India",
    "apply for web development jobs",
  ],
  authors: [{ name: "Jain Agency" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/recruitment" },
};

export default function RecruitmentPage() {
  return (
    <section className="grid gap-8 lg:grid-cols-11">
      <div className="reveal space-y-5 lg:col-span-5">
        <p className="eyebrow">Careers at Jain Agency</p>
        <h1 className="section-title text-4xl sm:text-5xl">
          Build Real Business Websites With A Fast-Moving Team
        </h1>
        <p className="section-copy text-lg">
          We are always open to connecting with designers, developers, and
          marketers who can build practical, conversion-focused websites.
        </p>

        <div className="surface rounded-3xl p-6 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Who Should Apply</p>
          <ul className="mt-3 space-y-2">
            <li>Frontend / Fullstack developers with strong fundamentals</li>
            <li>Designers who think in user journeys and clear layouts</li>
            <li>People who can communicate clearly with business owners</li>
          </ul>
        </div>

        <div className="surface rounded-2xl p-4 text-sm text-slate-600">
          Shortlisted applicants are usually contacted within 3 to 5 business
          days.
        </div>
      </div>

      <div className="lg:col-span-6">
        <RecruitmentForm />
      </div>
    </section>
  );
}
