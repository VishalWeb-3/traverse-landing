import type { Metadata } from "next";
import SiteHeader from "../site-header";
import BlogFeed from "./blog-feed";
import { client } from "../../../tina/__generated__/client";
import { resolveTinaImageUrls } from "../tina-image-url";
import fallback from "../../../content/blog/blog.json";
import SiteFooter from "../site-footer";
import "./blog.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Traverse Blog — Travel, Privacy & VPN Guides",
  description: "Practical guides to safer browsing, public Wi-Fi, and staying connected wherever you travel.",
};

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
  return <main className="blog-page blog-neiden-page tv-blog">
    <SiteHeader />
    <BlogFeed content={content} />
    <SiteFooter />
  </main>;
}
