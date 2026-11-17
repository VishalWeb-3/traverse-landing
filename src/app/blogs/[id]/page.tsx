import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../site-header";
import SiteFooter from "../../site-footer";
import { SITE_URL } from "../../../lib/seo";
import { assetUrl, blogPosts, editorialPerson, formatPostDate, getBlogPost, postTopic, type EditorialPerson } from "../../../lib/blog";
import "../blog.css";
import "./article.css";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.slug }));
}

// Same title, description and canonical rules as the original /blogs/[id] route.
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(id);
  if (!post) return { title: "Blog | Traverse VPN" };
  return {
    title: `${post.title} | Blog | Traverse VPN`,
    description: post.description.slice(0, 155).trim() || "Read the latest insights from Traverse VPN.",
    alternates: { canonical: post.canonicalUrl || `${SITE_URL}/blogs/${id}` },
  };
}


function Person({ label, person }: { label: string; person: EditorialPerson }) {
  return <div className="tv-article-person">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={person.avatar} alt={person.name} width={48} height={48} />
    <div><span>{label}</span><b>{person.name}</b>{person.role && <small>{person.role}</small>}</div>
  </div>;
}

export default async function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getBlogPost(id);
  if (!post) notFound();
  const author = editorialPerson(post.authorName);
  const reviewer = editorialPerson(post.reviewerName);
  const published = formatPostDate(post.date);
  const updated = formatPostDate(post.lastUpdated);
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return <main className="blog-page blog-neiden-page tv-blog tv-article-page">
    <SiteHeader />
    <article className="tv-article">
      <header className="tv-article-head">
        <nav className="tv-article-crumbs" aria-label="Breadcrumb"><a href="/blogs">Blog</a><span aria-hidden="true">/</span><span>{postTopic(post)}</span></nav>
        <h1>{post.title}</h1>
        {post.description.trim() && <p className="tv-article-dek">{post.description.trim()}</p>}
        <div className="tv-article-byline">
          <Person label="Written by" person={author} />
          <Person label="Reviewed by" person={reviewer} />
          <dl className="tv-article-meta">
            {published && <div><dt>Published</dt><dd><time dateTime={post.date}>{published}</time></dd></div>}
            {updated && <div><dt>Updated</dt><dd><time dateTime={post.lastUpdated}>{updated}</time></dd></div>}
            <div><dt>Reading time</dt><dd>{post.readMinutes} min</dd></div>
          </dl>
        </div>
      </header>
      <figure className="tv-article-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetUrl(post.image)} alt={post.title} fetchPriority="high" />
      </figure>
      {/* Rendered from the article's MDX at build time (scripts/build-blog-index.mjs); the source is our own content. */}
      <div className="tv-article-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      <aside className="tv-article-editors" aria-label="About the editorial team">
        {[author, reviewer].map((person) => <div key={person.name}>
          <Person label={person === author ? "Written by" : "Reviewed by"} person={person} />
          {person.bio && <p>{person.bio}</p>}
          {person.links.length > 0 && <p className="tv-article-links">{person.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</p>}
        </div>)}
      </aside>
    </article>
    <section className="tv-article-more" aria-labelledby="tv-article-more-title">
      <h2 id="tv-article-more-title">More from the blog</h2>
      <ul>{related.map((item) => <li key={item.slug}><a href={`/blogs/${item.slug}`}><span>{postTopic(item)}</span><b>{item.title}</b><small>{item.readMinutes} min read</small></a></li>)}</ul>
      <a className="tv-article-all" href="/blogs">All articles <span aria-hidden="true">↗</span></a>
    </section>
    <SiteFooter />
  </main>;
}
