import type { Metadata } from "next";
import Image from "next/image";

const founderProfile = {
  heading: "Message from Our Managing Director",
  name: "Divyansh Jain",
  role: "Founder & Managing Director",
  imageSrc: "/image.jpeg",
  imageAlt: "Divyansh Jain - Founder and Managing Director, Jain Agency",
  summary:
    "At Jain Agency, our vision is driven by leadership that values clarity, innovation, and long-term impact. Under the direction of Divyansh Jain, Founder & Managing Director, the agency is committed to helping businesses establish a strong and effective digital presence.",
  vision:
    "With a focus on quality, strategy, and performance, Divyansh believes that every website should go beyond aesthetics and function as a powerful tool for growth. His approach emphasizes attention to detail, modern design principles, and delivering measurable results.",
  closing:
    "Through this vision, Jain Agency continues to build meaningful partnerships and create digital experiences that truly make a difference.",
  highlights: [
    "Clarity in communication and execution",
    "Innovation rooted in business outcomes",
    "Long-term impact through measurable results",
  ],
  principles: [
    "Clarity before complexity",
    "Business outcomes over vanity metrics",
    "Reliable support after launch",
  ],
};

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

      <section className="reveal-delay grid gap-6 lg:grid-cols-12">
        <article className="surface rounded-3xl p-6 sm:p-8 lg:col-span-8">
          <p className="eyebrow">{founderProfile.heading}</p>
          <h2 className="section-title mt-4 text-3xl">{founderProfile.name}</h2>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {founderProfile.role}
          </p>
          <p className="section-copy mt-4 max-w-3xl leading-relaxed">
            {founderProfile.summary}
          </p>
          <p className="section-copy mt-4 max-w-3xl leading-relaxed">
            {founderProfile.vision}
          </p>
          <p className="section-copy mt-4 max-w-3xl leading-relaxed">
            {founderProfile.closing}
          </p>

          <div className="mt-6 grid gap-3">
            {founderProfile.highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <aside className="surface rounded-3xl p-6 lg:col-span-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src={founderProfile.imageSrc}
              alt={founderProfile.imageAlt}
              width={900}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            Operating principles
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {founderProfile.principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>
    </section>
  );
}
