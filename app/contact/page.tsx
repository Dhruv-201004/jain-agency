import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ImageModal } from "@/components/ImageModal";

export const metadata: Metadata = {
  title: "Contact Website Developer",
  description:
    "Contact Jain Agency for affordable website development services in India for schools, manufacturers, and industrial businesses.",
  keywords: [
    "contact website developer",
    "affordable business website services India",
    "website development for schools in India",
    "industrial website developer",
  ],
  authors: [{ name: "Jain Agency" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="grid gap-8 lg:grid-cols-11">
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
          <p className="mt-3">Email: jainagency.mbd@gmail.com</p>
          <p>Phone: +91-9761854883</p>
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
