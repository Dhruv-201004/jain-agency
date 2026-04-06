import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppToaster } from "@/components/AppToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jain Agency | Website Development Services",
    template: "%s | Jain Agency",
  },
  description:
    "Jain Agency builds modern websites for schools, manufacturers, and industrial businesses.",
  keywords: [
    "website development",
    "school website",
    "manufacturer website",
    "industrial website",
    "Jain Agency",
  ],
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
