import type { Metadata } from "next";

/** Canonical origin of the live site. Matches the original site's NEXT_PUBLIC_SITE_URL fallback. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://traversevpn.com";

/**
 * Shape of the per-page SEO documents (src/data/seo/*.json), copied unchanged from the
 * original traversevpn.com repo so titles, descriptions and canonicals stay identical.
 */
export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
}

type TwitterCard = "summary" | "summary_large_image";

/** Build a Next.js Metadata object from an SEO document (same output as the original site). */
export function buildSeoMetadata(seo: SeoData): Metadata {
  const ogTitle = seo.ogTitle || seo.title;
  const ogDescription = seo.ogDescription || seo.description;
  const images = seo.ogImage ? [{ url: seo.ogImage }] : undefined;
  const card: TwitterCard = seo.twitterCard === "summary" ? "summary" : "summary_large_image";

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(seo.canonical ? { url: seo.canonical } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card,
      title: ogTitle,
      description: ogDescription,
      ...(images ? { images } : {}),
    },
  };
}
