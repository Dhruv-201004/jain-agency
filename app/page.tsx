import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title:
    "Website Development for Schools, Manufacturers & Industrial Businesses",
  description:
    "Jain Agency designs affordable websites for schools, manufacturers, and industrial businesses across India to help them grow online.",
  keywords: [
    "website development for schools in India",
    "industrial website developer",
    "manufacturer business website design",
    "affordable business website services India",
    "website design India",
  ],
  authors: [{ name: "Jain Agency" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Website Development for Schools, Manufacturers & Industrial Businesses",
    description:
      "Modern, affordable websites for schools, manufacturers, and industrial businesses serving customers across India.",
    url: "/",
    siteName: "Jain Agency",
    type: "website",
    images: [
      {
        url: "/og-jain-agency.svg",
        width: 1200,
        height: 630,
        alt: "Jain Agency website development and portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Website Development for Schools, Manufacturers & Industrial Businesses",
    description:
      "Modern, affordable websites for schools, manufacturers, and industrial businesses serving customers across India.",
    images: ["/og-jain-agency.svg"],
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="space-y-20 pb-10">
      <section className="reveal relative overflow-hidden rounded-4xl border border-blue-100 bg-white p-6 shadow-[0_30px_60px_-42px_rgba(17,24,39,0.28)] sm:p-8 lg:p-10">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-blue-100/80 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-7">
            <p className="eyebrow">Growth-ready web presence</p>
            <h1 className="section-title text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Build a Website That Looks Premium and Brings Real Business
            </h1>
            <p className="section-copy max-w-2xl text-lg leading-relaxed">
              Jain Agency designs purposeful websites for schools, hospitals,
              private businesses, manufacturers, and industrial businesses with
              strong messaging, clear structure, and conversion-focused
              experiences.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="btn-primary px-6 py-3 text-sm">
                Explore Projects
              </Link>
              <Link href="/contact" className="btn-outline px-6 py-3 text-sm">
                Start Your Website
              </Link>
            </div>

            <div className="grid max-w-2xl grid-cols-3 gap-3">
              {[
                { value: "40+", label: "Pages shipped" },
                { value: "7+", label: "Client websites" },
                { value: "96%", label: "Satisfaction" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="surface rounded-2xl bg-white/90 px-4 py-4"
                >
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-delay relative lg:col-span-5">
            <div className="surface overflow-hidden rounded-[1.8rem] p-3">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
                  alt="Business team discussing website planning"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover brightness-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/25 via-transparent to-white/8" />
              </div>
            </div>

            <div className="surface absolute -bottom-3 -left-4 hidden w-52 rounded-2xl p-3 sm:block sm:-left-8">
              <Image
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=520&q=80"
                alt="Modern office workspace"
                width={500}
                height={240}
                className="h-24 w-full rounded-xl object-cover"
              />
              <p className="mt-2 text-xs font-medium text-slate-600">
                Strategy + design + development
              </p>
            </div>

            <div className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-md">
              Trusted by growth teams
            </div>
          </div>
        </div>
      </section>

      <section className="reveal space-y-6">
        <div className="surface flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Focus sectors
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Schools",
              "Hospitals",
              "Private Businesses",
              "Manufacturers",
              "Industrial Businesses",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal grid gap-5 lg:grid-cols-12">
        <div className="surface rounded-3xl p-7 lg:col-span-7">
          <p className="eyebrow">What makes us different</p>
          <h2 className="section-title mt-4 text-3xl">
            Not just pretty pages. Structured websites built for trust and
            inquiries.
          </h2>
          <p className="section-copy mt-3 max-w-2xl leading-relaxed">
            We align messaging, information architecture, and performance so
            your audience understands your capability quickly and takes action
            with confidence.
          </p>
        </div>
        <div className="grid gap-4 lg:col-span-5">
          {[
            "Admission and enquiry flows for education websites",
            "Capability-driven pages for manufacturing buyers",
            "Service-first pages for industrial operations",
          ].map((item) => (
            <div
              key={item}
              className="surface rounded-2xl px-5 py-4 text-sm text-slate-700 transition hover:-translate-y-0.5"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="reveal space-y-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title mt-3 text-3xl">Featured Projects</h2>
          </div>
          <Link href="/projects" className="btn-outline px-4 py-2 text-sm">
            Browse all projects
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <div className="surface rounded-3xl border-dashed p-10 text-center text-slate-500">
            Projects will appear here once they are marked as featured from the
            admin dashboard.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="reveal">
        <div className="rounded-3xl border border-blue-200 bg-linear-to-r from-blue-50 via-white to-indigo-50 p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Ready to start</p>
              <h3 className="section-title mt-3 text-3xl">
                Let&apos;s create a website your business can proudly send to
                every client.
              </h3>
            </div>
            <Link href="/contact" className="btn-primary px-6 py-3 text-sm">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
