import type { Metadata } from "next";
import Image from "next/image";
import { absoluteUrl, jsonLdScript, siteConfig } from "@/lib/seo";

type Profile = {
  heading: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  vision: string;
  closing: string;
  highlights: string[];
  principles?: string[];
};

const founderProfile = {
  heading: "Message from Our Managing Director",
  name: "Divyansh Jain",
  role: "Founder & Managing Director",
  imageSrc: "/image.jpeg",
  imageAlt: "Divyansh Jain - Founder and Managing Director, The Jain Agency",
  summary:
    "At The Jain Agency, our vision is driven by leadership that values clarity, innovation, and long-term impact. Under the direction of Divyansh Jain, Founder & Managing Director, the agency is committed to helping businesses establish a strong and effective digital presence.",
  vision:
    "With a focus on quality, strategy, and performance, Divyansh believes that every website should go beyond aesthetics and function as a powerful tool for growth. His approach emphasizes attention to detail, modern design principles, and delivering measurable results.",
  closing:
    "Through this vision, The Jain Agency continues to build meaningful partnerships and create digital experiences that truly make a difference.",
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
} satisfies Profile;

const teamProfiles = [
  {
    heading: "Message from Our Client Lead and Marketing Head",
    name: "Ehsaas",
    role: "Client Lead & Marketing Head",
    imageSrc: "/ehsaas.jpg",
    imageAlt: "Ehsaas - Client Lead and Marketing Head, The Jain Agency",
    summary:
      "At The Jain Agency, client relationships are built on trust, clarity, and consistent communication. As Client Lead and Marketing Head, Ehsaas focuses on understanding each client's goals and shaping strategies that help their brand connect with the right audience.",
    vision:
      "With an emphasis on positioning, messaging, and practical growth, Ehsaas believes every digital presence should feel clear, credible, and aligned with the client's business direction. His approach brings together marketing insight and client-first execution.",
    closing:
      "Through this focus, The Jain Agency continues to create stronger client partnerships and digital experiences that support long-term visibility and growth.",
    highlights: [
      "Client communication with clear expectations",
      "Marketing strategy aligned with business goals",
      "Brand messaging built for trust and visibility",
    ],
  },
  {
    heading: "Message from Our HR and Recruiting Head",
    name: "Parth Azad",
    role: "HR & Recruiting Head",
    imageSrc: "/parth-azad.jpg",
    imageAlt: "Parth Azad - HR and Recruiting Head, The Jain Agency",
    summary:
      "At The Jain Agency, a strong team is the foundation behind every successful project. As HR and Recruiting Head, Parth Azad focuses on building a work culture where people are selected thoughtfully, supported properly, and encouraged to grow with responsibility.",
    vision:
      "With a people-first mindset, Parth believes recruitment should go beyond filling roles and focus on finding individuals who bring discipline, communication, and ownership to the agency's work. His approach helps strengthen both team performance and client delivery.",
    closing:
      "Through this commitment, The Jain Agency continues to develop a reliable team structure that supports quality, consistency, and long-term growth.",
    highlights: [
      "Thoughtful hiring for reliable execution",
      "A culture of ownership and accountability",
      "Team growth aligned with agency standards",
    ],
  },
  {
    heading: "Message from Our Technical Support",
    name: "Dhruv Raheja",
    role: "Technical Support",
    imageSrc: "/dhruv-raheja.jpg",
    imageAlt: "Dhruv Raheja - Technical Support, The Jain Agency",
    summary:
      "At The Jain Agency, technical support plays an important role in keeping every website dependable after launch. As Technical Support, Dhruv Raheja focuses on solving issues clearly, maintaining performance, and helping clients feel confident with their digital systems.",
    vision:
      "With a practical and detail-oriented approach, Dhruv believes support should be fast, understandable, and focused on real outcomes. His work helps ensure that each website continues to function smoothly as clients grow and update their online presence.",
    closing:
      "Through this support, The Jain Agency continues to provide dependable service beyond delivery and build long-term confidence with every client.",
    highlights: [
      "Practical support after launch",
      "Clear issue resolution and maintenance",
      "Stable websites clients can rely on",
    ],
  },
] satisfies Profile[];

export const metadata: Metadata = {
  title: "About Our Website Development Agency",
  description:
    "Meet The Jain Agency, a website development agency helping schools, hospitals, manufacturers, industrial companies, and private businesses grow online.",
  keywords: [
    "about The Jain Agency",
    "website development agency India",
    "website development for schools in India",
    "hospital website design India",
    "industrial website developer",
    "manufacturer business website design",
  ],
  authors: [{ name: "The Jain Agency" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About The Jain Agency | Website Development Agency",
    description:
      "A focused Indian website development team for schools, hospitals, manufacturers, industrial companies, and private businesses.",
    url: "/about",
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "The Jain Agency team and website development approach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About The Jain Agency | Website Development Agency",
    description:
      "A focused Indian website development team for schools, hospitals, manufacturers, industrial companies, and private businesses.",
    images: [siteConfig.ogImage],
  },
};

function ProfileMessage({
  profile,
  priority = false,
  delay = "0ms",
}: {
  profile: Profile;
  priority?: boolean;
  delay?: string;
}) {
  return (
    <section
      className="reveal-soft grid gap-6 lg:grid-cols-12"
      style={{ animationDelay: delay }}
    >
      <article className="surface motion-surface rounded-3xl p-6 sm:p-8 lg:col-span-8">
        <p className="eyebrow">{profile.heading}</p>
        <h2 className="section-title mt-4 text-3xl">{profile.name}</h2>
        <p className="mt-1 text-sm font-medium text-slate-600">
          {profile.role}
        </p>
        <p className="section-copy mt-4 max-w-3xl leading-relaxed">
          {profile.summary}
        </p>
        <p className="section-copy mt-4 max-w-3xl leading-relaxed">
          {profile.vision}
        </p>
        <p className="section-copy mt-4 max-w-3xl leading-relaxed">
          {profile.closing}
        </p>

        <div className="mt-6 grid gap-3">
          {profile.highlights.map((item) => (
            <div
              key={item}
              className="highlight-pill rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </article>

      <aside className="surface motion-surface rounded-3xl p-6 lg:col-span-4">
        <div className="profile-image-wrap overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Image
            src={profile.imageSrc}
            alt={profile.imageAlt}
            width={900}
            height={900}
            className="profile-image aspect-square w-full object-cover"
            priority={priority}
          />
        </div>
        {"principles" in profile ? (
          <>
            <h3 className="mt-6 text-base font-semibold text-slate-900">
              Operating principles
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {profile.principles?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : null}
      </aside>
    </section>
  );
}

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": absoluteUrl("/about#about-page"),
    url: absoluteUrl("/about"),
    name: "About The Jain Agency",
    description: metadata.description,
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    about: {
      "@id": absoluteUrl("/#organization"),
    },
    mainEntity: {
      "@id": absoluteUrl("/#organization"),
    },
  };

  return (
    <section className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(aboutJsonLd)}
      />
      <header className="reveal grid gap-6 lg:grid-cols-10">
        <div className="space-y-4 lg:col-span-6">
          <p className="eyebrow">Our approach</p>
          <h1 className="section-title text-4xl sm:text-5xl">
            About The Jain Agency
          </h1>
          <p className="section-copy max-w-3xl text-lg leading-relaxed">
            The Jain Agency is a focused web development partner helping
            organizations build digital trust. We specialize in schools,
            manufacturers, and industrial businesses where clarity, speed, and
            credibility directly influence business outcomes.
          </p>
        </div>
        <div className="surface motion-surface rounded-3xl p-6 lg:col-span-4">
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
            className="surface motion-surface rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </article>
        ))}
      </div>

      <ProfileMessage profile={founderProfile} priority delay="80ms" />

      {teamProfiles.map((profile, index) => (
        <ProfileMessage
          key={profile.name}
          profile={profile}
          delay={`${160 + index * 80}ms`}
        />
      ))}
    </section>
  );
}
