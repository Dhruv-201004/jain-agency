import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ImageModal } from "@/components/ImageModal";
import { absoluteUrl, jsonLdScript, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Website Developer in India",
  description:
    "Contact The Jain Agency for premium website development in India for schools, hospitals, manufacturers, industrial companies, and private businesses.",
  keywords: [
    "contact website developer",
    "website developer India",
    "business website development India",
    "website development for schools in India",
    "hospital website design India",
    "industrial website developer",
  ],
  authors: [{ name: "The Jain Agency" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact The Jain Agency | Website Developer in India",
    description:
      "Start a premium website project for your school, hospital, manufacturing company, industrial business, or private business.",
    url: "/contact",
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Contact The Jain Agency for website development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact The Jain Agency | Website Developer in India",
    description:
      "Start a premium website project for your school, hospital, manufacturing company, industrial business, or private business.",
    images: [siteConfig.ogImage],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": absoluteUrl("/contact#contact-page"),
    url: absoluteUrl("/contact"),
    name: "Contact The Jain Agency",
    description: metadata.description,
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    mainEntity: {
      "@id": absoluteUrl("/#organization"),
    },
  };

  return (
    <section className="grid gap-8 lg:grid-cols-11">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(contactJsonLd)}
      />
      <div className="reveal space-y-5 lg:col-span-5">
        <p className="eyebrow">Start your project</p>
        <h1 className="section-title text-4xl sm:text-5xl">
          Let&apos;s Build Something That Feels Professional From Day One
        </h1>
        <p className="section-copy text-lg">
          Share your business goals and we will suggest a practical website
          roadmap with design direction, structure, and execution timeline.
        </p>
        <div className="surface rounded-3xl p-6 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Contact Details</p>
          <p className="mt-3">Email: {siteConfig.email}</p>
          <p>Phone: {siteConfig.phone}</p>
          <p>
            Service Areas: Schools, Hospitals, private businesses,
            Manufacturers, Industrial Businesses and many more...
          </p>
          <a
            href="https://wa.me/919761854883"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 inline-flex px-5 py-2.5 text-sm"
          >
            Contact Me Directly on WhatsApp
          </a>
        </div>
        <div className="surface rounded-2xl p-4 text-sm text-slate-600">
          <p>Most responses are shared within one business day.</p>
          <ImageModal />
        </div>
      </div>
      <div className="reveal-delay lg:col-span-6">
        <ContactForm />
      </div>
    </section>
  );
}
