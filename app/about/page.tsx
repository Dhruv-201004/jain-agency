import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jain Agency",
  description:
    "Learn how Jain Agency helps schools, manufacturers, and industrial businesses build trust and grow online with thoughtful websites.",
  keywords: [
    "about Jain Agency",
    "website development for schools in India",
    "industrial website developer",
    "manufacturer business website design",
  ],
  authors: [{ name: "Jain Agency" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="space-y-10">
      <header className="reveal grid gap-6 lg:grid-cols-10">
        <div className="space-y-4 lg:col-span-6">
          <p className="eyebrow">Our approach</p>
          <h1 className="section-title text-4xl sm:text-5xl">
            About Jain Agency
          </h1>
          <p className="section-copy max-w-3xl text-lg leading-relaxed">
            Jain Agency is a focused web development partner helping
            organizations build digital trust. We specialize in schools,
            manufacturers, and industrial businesses where clarity, speed, and
            credibility directly influence business outcomes.
          </p>
        </div>
        <div className="surface rounded-3xl p-6 lg:col-span-4">
          <p className="text-sm text-slate-500">What clients appreciate most</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Intentional messaging, not generic copy</li>
            <li>Clean design with practical conversion paths</li>
            <li>Fast communication and ownership</li>
          </ul>
        </div>
      </header>

      <div className="reveal-delay grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Industry-Focused",
            text: "We understand audience expectations across education, manufacturing, and industrial operations.",
          },
          {
            title: "Modern Technology",
            text: "Fast, scalable websites built with modern full-stack tools and practical engineering standards.",
          },
          {
            title: "Long-Term Support",
            text: "From launch to iteration, we support continued growth without adding process overhead.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="surface rounded-2xl p-6 transition hover:-translate-y-0.5"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
