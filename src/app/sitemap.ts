import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";
import { blogPosts } from "../lib/blog";

// Same URLs, change frequencies and priorities as the original site's sitemap.ts.
// Blog entries come from the bundled index because Cloudflare Workers cannot read content/blogs at runtime.
type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const SITE = new URL(SITE_URL);
const DEFAULT_LAST_MODIFIED = new Date();

const STATIC_ROUTES: SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/features", changeFrequency: "weekly", priority: 0.9 },
  { path: "/plans", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faqs", changeFrequency: "weekly", priority: 0.7 },
  { path: "/downloads", changeFrequency: "weekly", priority: 0.8 },
  { path: "/security", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vpn-for-android", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vpn-for-business", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vpn-for-gaming", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vpn-for-iphone", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vpn-for-linux", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vpn-for-mac", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vpn-for-streaming", changeFrequency: "weekly", priority: 0.8 },
  { path: "/vpn-for-windows", changeFrequency: "weekly", priority: 0.8 },
  { path: "/enterprise", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.6 },
  { path: "/support", changeFrequency: "monthly", priority: 0.6 },
  { path: "/sitemap", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.4 },
];

export const revalidate = 3600;

function toAbsoluteUrl(routePath: string) {
  return new URL(routePath === "/" ? "/" : routePath.replace(/\/+$/, ""), SITE).toString();
}

function blogPath(slug: string, canonicalUrl: string) {
  if (!canonicalUrl) return `/blogs/${slug}`;
  try {
    const canonical = new URL(canonicalUrl, SITE);
    if (canonical.origin === SITE.origin) return canonical.pathname || `/blogs/${slug}`;
  } catch {
    // Fall through to the default path.
  }
  return `/blogs/${slug}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: DEFAULT_LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts
    .map((post) => {
      const date = post.date ? new Date(post.date) : null;
      return {
        url: toAbsoluteUrl(blogPath(post.slug, post.canonicalUrl)),
        lastModified: date && !Number.isNaN(date.getTime()) ? date : DEFAULT_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    })
    .sort((a, b) => a.url.localeCompare(b.url));

  return [...staticEntries, ...blogEntries];
}
