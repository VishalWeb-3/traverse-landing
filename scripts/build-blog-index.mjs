// Compiles content/blogs/*.mdx into src/data/blog-posts.json.
// Cloudflare Workers have no filesystem at request time, so the articles ship inside the bundle.
// Slugs, titles, descriptions and canonicals follow the original site's rules (src/lib/localBlogs.ts there).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const root = process.cwd();
const dir = path.join(root, "content", "blogs");
const out = path.join(root, "src", "data", "blog-posts.json");

const toDate = (value) => (value instanceof Date ? value.toISOString() : value ? String(value) : "");
const toText = (value) => (typeof value === "string" ? value : "");

// Same clean-up the original article page applied before rendering.
const stripLegacyEditorialContent = (body) => body
  .replace(/^\s*<div style=\{\{marginBottom:[\s\S]*?\n<\/div>\s*\n+(?=VPN public)/, "")
  .replace(/\n---\s*\n\n## About the editorial team[\s\S]*$/i, "")
  .trim();

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://traversevpn.com";
const assetUrl = (src) => { try { return encodeURI(decodeURI(src)); } catch { return encodeURI(src); } };
const isExternal = (href = "") => /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);

// Articles are rendered to HTML here, at build time: Cloudflare Workers forbid the runtime code
// generation that MDX evaluation needs, so the bundle ships finished markup instead.
const components = {
  a: ({ href, ...props }) => createElement("a", { href, ...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {}), ...props }),
  img: ({ src, alt, ...props }) => createElement("img", { src: typeof src === "string" ? assetUrl(src) : undefined, alt: alt ?? "", loading: "lazy", decoding: "async", ...props }),
  table: (props) => createElement("div", { className: "tv-article-table" }, createElement("table", props)),
};

async function renderMdx(source) {
  const { default: Content } = await evaluate(source, { ...runtime, remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] });
  return renderToStaticMarkup(createElement(Content, { components }));
}

const posts = readdirSync(dir)
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => {
    const { data, content } = matter(readFileSync(path.join(dir, file), "utf8"));
    const id = file.replace(/\.mdx?$/, "");
    const body = stripLegacyEditorialContent(content);
    const words = body.replace(/<[^>]+>|[#>*_`\[\]()!-]/g, " ").split(/\s+/).filter(Boolean).length;
    return {
      id,
      slug: toText(data.slug) || id,
      title: toText(data.title) || id,
      // Kept untrimmed: the original cut descriptions at 155 characters before trimming, and meta tags must match.
      description: toText(data.description),
      image: toText(data.image) || "/images/vpn/photos/cafe-laptop.webp",
      date: toDate(data.date),
      lastUpdated: toDate(data.lastUpdated),
      canonicalUrl: toText(data.canonicalUrl),
      authorName: toText(data.authorName) || toText(data.author) || "Shubham Sharma",
      reviewerName: toText(data.reviewerName) || toText(data.reviewedBy) || "Jake Walker",
      readMinutes: Math.max(1, Math.round(words / 220)),
      body,
    };
  });

for (const post of posts) {
  post.html = await renderMdx(post.body);
  delete post.body;
}
posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

writeFileSync(out, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`Blog index: ${posts.length} posts → ${path.relative(root, out)}`);
