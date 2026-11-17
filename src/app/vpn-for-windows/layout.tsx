import type { Metadata } from "next";
import type { ReactNode } from "react";
import seoData from "@/data/seo/windows.json";

const SITE = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://traversevpn.com"
);

const WINDOWS_PATH = "/vpn-for-windows";

const title = seoData.title;
const description = seoData.description;

export const metadata: Metadata = {
  // metadataBase is inherited from the root layout (src/app/layout.tsx).
  title,
  description,
  keywords: [
    "VPN for Windows",
    "Windows 10 VPN",
    "Windows 11 VPN",
    "Traverse VPN",
    "PC VPN",
    "secure VPN",
    "VPN download Windows",
  ],
  alternates: {
    canonical: seoData.canonical,
  },
  openGraph: {
    title,
    description,
    url: WINDOWS_PATH,
    siteName: "Traverse VPN",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/windows.avif",
        width: 1200,
        height: 630,
        alt: "Traverse VPN on Windows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/windows.avif"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: new URL(WINDOWS_PATH, SITE).toString(),
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Traverse VPN",
    url: SITE.origin,
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Traverse VPN for Windows",
  operatingSystem: "Windows 10, Windows 11",
  applicationCategory: "SecurityApplication",
  url: new URL(WINDOWS_PATH, SITE).toString(),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do I need a VPN for my desktop computer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VPN encrypts your desktop internet traffic, protects your data on public networks, and helps prevent ISP and third-party tracking.",
      },
    },
    {
      "@type": "Question",
      name: "Does Windows 10 or 11 have a built-in VPN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Windows includes a VPN client, but not a VPN service. You still need a provider such as Traverse VPN to route and secure your traffic.",
      },
    },
    {
      "@type": "Question",
      name: "Does VPN software slow down my computer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VPN can add minor overhead due to encryption, but optimized protocols and nearby servers usually keep speed impact low.",
      },
    },
    {
      "@type": "Question",
      name: "Is using a free VPN on my PC dangerous?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some free VPNs may log activity, use weak security, or show intrusive ads. A trusted paid VPN typically offers stronger privacy controls.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the same VPN on multiple computers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Traverse VPN supports multiple simultaneous device connections under a single subscription.",
      },
    },
    {
      "@type": "Question",
      name: "Is Traverse VPN supported on ARM-based devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Traverse VPN supports Windows ARM devices, including modern ARM64 laptops.",
      },
    },
    {
      "@type": "Question",
      name: "What are the system requirements for a Windows VPN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traverse VPN supports Windows 10 (64-bit) and Windows 11 on x64 and ARM64 systems.",
      },
    },
    {
      "@type": "Question",
      name: "What is the alternative to a Windows VPN client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If app installation is restricted, using a browser extension or configuring VPN at the router level are common alternatives.",
      },
    },
  ],
};

export default function WindowsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webPageJsonLd, softwareJsonLd, faqJsonLd]),
        }}
      />
      {children}
    </>
  );
}
