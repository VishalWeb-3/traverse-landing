import type { InfoPage } from "./info-pages";
import { sitemapGroups } from "./info-pages";
import SiteFooter from "./site-footer";

export default function BrandInfoContent({ page }: { page: InfoPage }) {
  const isSitemap = page.slug === "sitemap";

  return <section className={`brand-info-content brand-info-content--${page.slug}`}>
    <header className="brand-info-hero">
      <p className="blog-eyebrow"><span /> TRAVERSE VPN <i>/</i> {page.kicker}</p>
      <h1>{page.title}</h1>
      <p className="brand-info-intro">{page.intro}</p>
      {page.actions?.length ? <nav className="brand-info-actions" aria-label={`${page.title} actions`}>
        {page.actions.map((action, index) => <a className={index === 0 ? "brand-info-action-primary" : "brand-info-action-secondary"} href={action.href} key={action.label}>{action.label}<span aria-hidden="true">↗</span></a>)}
      </nav> : null}
      <div className="brand-info-hero-art" aria-hidden="true"><span className="brand-info-orbit brand-info-orbit-a"/><span className="brand-info-orbit brand-info-orbit-b"/><span className="brand-info-orbit brand-info-orbit-c"/><span className="brand-info-hero-node brand-info-hero-node-a"/><span className="brand-info-hero-node brand-info-hero-node-b"/><span className="brand-info-hero-status"><i/> PRIVATE CONNECTION <b>ACTIVE</b></span></div>
      <span className="brand-info-index" aria-hidden="true">TRAVERSE / {page.slug.toUpperCase()}</span>
    </header>

    {isSitemap ? <section className="brand-info-sitemap" aria-label="All pages">
      {sitemapGroups.map((group, groupIndex) => <div className="brand-info-section brand-info-sitemap-group" key={group.title}>
        <p className="brand-info-section-index">0{groupIndex + 1} <i /> {group.title.toUpperCase()}</p>
        <nav aria-label={group.title}><h2>{group.title}</h2><ul>{group.links.map((link) => <li key={link.label}><a href={link.href}>{link.label}<span aria-hidden="true">↗</span></a></li>)}</ul></nav>
      </div>)}
    </section> : <div className="brand-info-sections">
      {page.sections.map((section, index) => <section className="brand-info-section" key={section.title}>
        <p className="brand-info-section-index">{String(index + 1).padStart(2, "0")} <i /> {section.eyebrow ?? page.kicker}</p>
        <div className="brand-info-section-main"><h2>{section.title}</h2><div className="brand-info-section-copy">
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.points?.length ? <ul className="brand-info-points">{section.points.map((point) => <li key={point.title}>
            {point.href ? <a href={point.href} target={point.href.startsWith("https://") ? "_blank" : undefined} rel={point.href.startsWith("https://") ? "noreferrer" : undefined}><span><b>{point.title}</b><small>{point.text}</small></span><i aria-hidden="true">↗</i></a> : <span><b>{point.title}</b><small>{point.text}</small></span>}
          </li>)}</ul> : null}
        </div></div>
      </section>)}
    </div>}
    <SiteFooter />
  </section>;
}
