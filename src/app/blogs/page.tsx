import type { Metadata } from "next";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import BlogFeed, { type BlogCard } from "./blog-feed";
import "./blog-index.css";
import { assetUrl, blogPosts, editorialPerson, postTopic } from "../../lib/blog";
import { buildSeoMetadata } from "../../lib/seo";
import seoData from "../../data/seo/blog.json";

export const metadata: Metadata = buildSeoMetadata(seoData);

const formatDate = (value: string) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).toUpperCase();

export default function BlogPage() {
  // Every article is listed here at its original /blogs/<slug> URL, so each indexed post keeps a crawl path.
  const posts: BlogCard[] = blogPosts.map((post) => {
    const author = editorialPerson(post.authorName);
    return {
      href: `/blogs/${post.slug}`,
      title: post.title,
      excerpt: post.description.trim(),
      topic: postTopic(post),
      date: formatDate(post.date),
      read: `${post.readMinutes} min. read`,
      image: assetUrl(post.image),
      alt: post.title,
      author: { name: author.name, avatar: author.avatar },
    };
  });

  return <main className="blog-page blog-neiden-page nb-blog">
    <SiteHeader />
    <BlogFeed posts={posts} />
    <SiteFooter />
  </main>;
}
