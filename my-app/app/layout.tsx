import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Bio4Marriage — #1 Marriage Biodata Maker for All Indian Religions | Free Online",
    template: "%s | Bio4Marriage",
  },
  description:
    "Create stunning marriage biodata online for Hindu, Muslim, Christian, Sikh, Buddhist & Jain. 18+ professionally designed templates, instant PDF download at just ₹39. Trusted by 10,000+ couples across India.",
  keywords: [
    "marriage biodata", "biodata maker", "biodata for marriage", "hindu biodata",
    "muslim biodata", "christian biodata", "sikh biodata", "buddhist biodata",
    "jain biodata", "marriage biodata format", "biodata template", "shaadi biodata",
    "matrimonial biodata", "biodata PDF download", "biodata online free",
    "marriage biodata maker online", "bio4marriage", "indian marriage biodata",
    "biodata for shaadi", "biodata format for marriage",
  ],
  authors: [{ name: "Bio4Marriage" }],
  creator: "Bio4Marriage",
  publisher: "Bio4Marriage",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://bio4marriage.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Bio4Marriage",
    title: "Bio4Marriage — Create Beautiful Marriage Biodata Online",
    description:
      "India's #1 Marriage Biodata Maker. 18+ religion-wise templates for Hindu, Muslim, Sikh, Christian, Buddhist & Jain. Download PDF at just ₹39.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bio4Marriage Templates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bio4Marriage — Marriage Biodata Maker",
    description:
      "Create professional marriage biodata online. 18+ templates for all Indian religions. Quick PDF download at ₹39.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bio4Marriage",
  url: "https://bio4marriage.com",
  description: "Create professional marriage biodata online for all Indian religions. 18+ templates, instant PDF download.",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "39",
    priceCurrency: "INR",
    description: "Per biodata PDF download",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "10240",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 flex flex-col min-h-screen`} suppressHydrationWarning>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
