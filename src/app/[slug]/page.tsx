import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../site-header";
import BrandInfoContent from "../brand-info-content";
import BrandInfoMotion from "../brand-info-motion";
import { infoPages } from "../info-pages";

const sitemapPage = {
  slug: "sitemap",
  title: "Find your way around Traverse.",
  kicker: "SITEMAP",
  intro: "Browse Traverse pages by topic, from product information and supported platforms to company and policy details.",
  sections: [],
};

const legalAliases: { slug: string; source: string; title?: string; kicker?: string; intro?: string; sectionCount?: number }[] = [
  { slug: "privacy", source: "privacy-policy" },
  { slug: "terms", source: "terms-of-use" },
  { slug: "terms-and-conditions", source: "terms-of-use" },
  { slug: "no-logs-policy", source: "privacy-policy", title: "A clear commitment to no logs.", kicker: "NO-LOGS POLICY", intro: "Traverse’s published privacy policy explains which VPN activity it says it does not record, and what limited account information supports the service.", sectionCount: 4 },
  { slug: "security-standards", source: "security", title: "Security standards for every connection.", kicker: "SECURITY STANDARDS", intro: "Explore the connection safeguards Traverse describes, including encryption, IP and DNS leak protection, and what happens if a VPN tunnel drops." },
];

const pages = [
  ...infoPages,
  sitemapPage,
  ...legalAliases.flatMap(({ slug, source, title, kicker, intro, sectionCount }) => {
    const page = infoPages.find((item) => item.slug === source);
    return page ? [{ ...page, slug, ...(title ? { title } : {}), ...(kicker ? { kicker } : {}), ...(intro ? { intro } : {}), ...(sectionCount ? { sections: page.sections.slice(0, sectionCount) } : {}) }] : [];
  }),
];

export function generateStaticParams() {
  return pages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);
  if (!page) return {};
  return { title: `${page.kicker.replaceAll("/", " ")} — Traverse VPN`, description: page.intro };
}

export default async function InfoPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <main className="brand-info-page"><SiteHeader /><BrandInfoMotion /><BrandInfoContent page={page} /></main>;
}
