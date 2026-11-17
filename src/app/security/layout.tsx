import type { Metadata } from "next";
import seoData from "@/data/seo/security.json";

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords:
    "VPN security, online privacy, secure connection, VPN protection, internet security, privacy VPN, encrypted connection, VPN features, public WiFi security, IP masking",
  authors: [{ name: "Traverse VPN" }],
  openGraph: {
    title: seoData.title,
    description:
      "Discover how Traverse VPN delivers privacy-first security with secure connections, ISP visibility protection, and advanced tracking prevention.",
    url: seoData.canonical,
    siteName: "Traverse VPN",
    images: [
      {
        url: "https://traversevpn.com/og-security.png",
        width: 1200,
        height: 630,
        alt: "Traverse VPN Security Features",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seoData.title,
    description:
      "Protect your internet connection with Traverse VPN's privacy-first security approach.",
    images: ["https://traversevpn.com/og-security.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: seoData.canonical,
  },
  category: "Technology",
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
