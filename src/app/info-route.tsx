import type { Metadata } from "next";
import SiteHeader from "./site-header";
import BrandInfoContent from "./brand-info-content";
import BrandInfoMotion from "./brand-info-motion";
import { infoPages } from "./info-pages";
import { buildSeoMetadata, type SeoData } from "../lib/seo";
import aboutUs from "../data/seo/about-us.json";
import business from "../data/seo/business.json";
import contact from "../data/seo/contact.json";
import support from "../data/seo/support.json";
import refund from "../data/seo/refund.json";
import privacy from "../data/seo/privacy.json";
import terms from "../data/seo/terms.json";
import streaming from "../data/seo/streaming.json";
import gaming from "../data/seo/gaming.json";
import sitemap from "../data/seo/sitemap.json";

const sitemapPage = {
  slug: "sitemap",
  title: "Find your way around Traverse.",
  kicker: "SITEMAP",
  intro: "Browse Traverse pages by topic, from product information and supported platforms to company and policy details.",
  sections: [],
};

export const infoRoutePages = [...infoPages, sitemapPage];

// Titles, descriptions and canonicals come from the original site's SEO files, one per indexed URL.
const seoBySlug: Record<string, SeoData> = {
  "about-us": aboutUs,
  "vpn-for-business": business,
  "contact-us": contact,
  support,
  "refund-policy": refund,
  "privacy-policy": privacy,
  "terms-and-conditions": terms,
  "vpn-for-streaming": streaming,
  "vpn-for-gaming": gaming,
  sitemap,
};

export function infoMetadata(slug: string): Metadata {
  // The original /vpn-for-business page set only a title and description (no canonical or social tags).
  if (slug === "vpn-for-business") return { title: business.title || "Business Solutions", description: business.description || "Enterprise solutions for your business needs." };
  const seo = seoBySlug[slug];
  return seo ? buildSeoMetadata(seo) : {};
}

export function findInfoPage(slug: string) {
  return infoRoutePages.find((item) => item.slug === slug);
}

export function InfoRoute({ page }: { page: NonNullable<ReturnType<typeof findInfoPage>> }) {
  return <main className="brand-info-page"><SiteHeader /><BrandInfoMotion /><BrandInfoContent page={page} /></main>;
}
