import type { InfoPage } from "./info-pages";
import { sitemapGroups } from "./info-pages";
import SiteFooter from "./site-footer";
import ContactForm from "./contact-form";
import KitMotion from "./kit/kit-motion";
import { Band, Hero, Split, pad } from "./kit/kit";

function DocLinks({ items }: { items: NonNullable<InfoPage["sections"][number]["points"]> }) {
  return <ul className="kit-doc-links">{items.map((point) => {
    const external = point.href?.startsWith("https://");
    const body = <><span><b>{point.title}</b><small>{point.text}</small></span><i aria-hidden="true">↗</i></>;
    return <li key={point.title}>{point.href
      ? <a href={point.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{body}</a>
      : <span><span><b>{point.title}</b><small>{point.text}</small></span></span>}
    </li>;
  })}</ul>;
}

export default function BrandInfoContent({ page }: { page: InfoPage }) {
  const isSitemap = page.slug === "sitemap";
  const isContact = page.slug === "contact-us";
  const section = page.kicker.replace(/^traverse\s+/i, "");

  return <>
    <KitMotion />
    <Hero section={section} title={page.title} lead={page.intro} actions={(page.actions ?? []).map((action, index) => ({ ...action, ghost: index > 0 }))}>
      {page.facts?.length ? <dl className="kit-facts">
        {page.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}</dd></div>)}
      </dl> : null}
    </Hero>

    <div id="content" />
    {isContact && <Band tone="white" id="contact-form-section" label="Send a message">
      <Split label="01 / Send a message" title={<>Send us a message.</>}>
        <div className="kit-support kit-form-wrap"><ContactForm /></div>
      </Split>
    </Band>}

    {isSitemap ? <Band tone="white" label="All pages">
      <div className="kit-cells kit-sitemap">{sitemapGroups.map((group, index) => <nav className="kit-cell" aria-label={group.title} key={group.title}>
        <span className="kit-label">{pad(index + 1)} <em>/ {group.title}</em></span>
        <h3>{group.title}</h3>
        <ul className="kit-doc-links">{group.links.map((link) => <li key={link.label}><a href={link.href}><span><b>{link.label}</b></span><i aria-hidden="true">↗</i></a></li>)}</ul>
      </nav>)}</div>
    </Band> : <Band label={page.kicker}>
      <div className="kit-docs">{page.sections.map((item, index) => <section className="kit-doc" key={item.title}>
        <span className="kit-label"><b>{pad(index + (isContact ? 2 : 1))}</b> <em>/ {item.eyebrow ?? page.kicker}</em></span>
        <div className="kit-doc-main">
          <h2>{item.title}</h2>
          {item.paragraphs.map((paragraph) => <p className="kit-copy" key={paragraph}>{paragraph}</p>)}
          {item.points?.length ? <DocLinks items={item.points} /> : null}
        </div>
      </section>)}</div>
    </Band>}
    <SiteFooter />
  </>;
}
