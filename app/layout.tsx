import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppToaster } from "@/components/AppToaster";
import {
  jsonLdScript,
  organizationJsonLd,
  siteConfig,
  websiteJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "The Jain Agency | Premium Website Development in India",
    template: "%s | The Jain Agency",
  },
  description: siteConfig.description,
  keywords: [
    "premium website development India",
    "website development for schools in India",
    "hospital website design India",
    "industrial website developer",
    "manufacturer business website design",
    "affordable business website services India",
    "The Jain Agency",
  ],
  authors: [{ name: "The Jain Agency" }],
  creator: "The Jain Agency",
  publisher: "The Jain Agency",
  applicationName: "The Jain Agency",
  category: "Website development agency",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "The Jain Agency | Premium Website Development in India",
    description: siteConfig.description,
    url: "/",
    siteName: "The Jain Agency",
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "The Jain Agency website development services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Jain Agency | Premium Website Development in India",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)}
        />
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}
