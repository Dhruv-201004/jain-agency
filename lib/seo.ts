import { normalizeImageSrc } from "@/lib/image";

export const siteConfig = {
  name: "The Jain Agency",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://thejainagency.shop",
  locale: "en_IN",
  email: "jainagency.mbd@gmail.com",
  phone: "+91-9761854883",
  whatsapp: "https://wa.me/919761854883",
  description:
    "The Jain Agency builds premium websites for schools, hospitals, manufacturers, industrial companies, and growing private businesses across India.",
  ogImage: "/og-jain-agency.svg",
  serviceAreas: ["India", "Moradabad", "Delhi NCR", "Uttar Pradesh"],
  services: [
    "Website development",
    "Business website design",
    "School website development",
    "Hospital website design",
    "Manufacturing website design",
    "Industrial website development",
    "Website maintenance",
  ],
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function absoluteImageUrl(src: string) {
  return absoluteUrl(normalizeImageSrc(src));
}

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": absoluteUrl("/#organization"),
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/logo.png"),
  image: absoluteUrl(siteConfig.ogImage),
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  areaServed: siteConfig.serviceAreas.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      availableLanguage: ["English", "Hindi"],
      url: absoluteUrl("/contact"),
    },
  ],
  sameAs: [siteConfig.whatsapp],
  knowsAbout: siteConfig.services,
  makesOffer: siteConfig.services.map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      provider: {
        "@id": absoluteUrl("/#organization"),
      },
    },
  })),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: siteConfig.name,
  url: siteConfig.url,
  publisher: {
    "@id": absoluteUrl("/#organization"),
  },
  inLanguage: "en-IN",
};
