import type { Metadata } from "next";
import SiteHeader from "../site-header";
import BlogFeed from "./blog-feed";
import { client } from "../../../tina/__generated__/client";
import { resolveTinaImageUrls } from "../tina-image-url";
import fallback from "../../../content/blog/blog.json";
import SiteFooter from "../site-footer";
import "./blog.css";
import { assetUrl, blogPosts, postTopic } from "../../lib/blog";
import { buildSeoMetadata } from "../../lib/seo";
import seoData from "../../data/seo/blog.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildSeoMetadata(seoData);

export default async function BlogPage() {
  let content: typeof fallback = fallback;
  if (process.env.NODE_ENV === "development" || (process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    try {
      const result = await client.queries.blogPage({ relativePath: "blog.json" }, { fetchOptions: { cache: "no-store" } });
      content = resolveTinaImageUrls(result.data.blogPage) as typeof fallback;
    } catch {
      // The bundled feed keeps the page usable until Tina Cloud content is available.
    }
  }
  // The feed lists the real articles (each at its original /blogs/<slug> URL) so every indexed post stays linked from here.
  const stories = blogPosts.map((post, index) => ({
    title: post.title,
    excerpt: post.description.trim(),
    category: postTopic(post),
    date: new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).toUpperCase(),
    read: `${post.readMinutes} MIN READ`,
    author: post.authorName,
    image: assetUrl(post.image),
    alt: post.title,
    number: String(index + 1).padStart(2, "0"),
    href: `/blogs/${post.slug}`,
  }));
  const categories = [content.categories[0], ...Array.from(new Set(stories.map((story) => story.category)))];
  return <main className="blog-page blog-neiden-page tv-blog">
    <SiteHeader />
    <BlogFeed content={{ ...content, categories, stories }} />
    <SiteFooter />
  </main>;
}
