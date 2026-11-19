import type { ReactNode } from "react";
import "./kit.css";

// Building blocks for every inner page, so they share the homepage and blog's one design language.
// Plain components (no hooks), so both server and client pages can use them.

export const pad = (value: number) => String(value).padStart(2, "0");

export function Lines() {
  return <div className="kit-lines" aria-hidden="true"><i /><i /><i /></div>;
}

export function Eyebrow({ section, topic }: { section: string; topic?: string }) {
  return <p className="kit-eyebrow">
    <span className="kit-signal" aria-hidden="true"><i /><i /><i /><i /></span>
    <span>[ Traverse—{section}{topic && <em> / {topic}</em>} ]</span>
  </p>;
}

type Action = { label: string; href: string; ghost?: boolean; external?: boolean; icon?: string };

export function Button({ label, href, ghost, external, icon = "↗" }: Action) {
  return <a className={`kit-btn${ghost ? " kit-btn--ghost" : ""}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
    {label}<span aria-hidden="true">{icon}</span>
  </a>;
}

export function Actions({ items }: { items: Action[] }) {
  if (!items.length) return null;
  return <div className="kit-actions">{items.map((item) => <Button key={item.label} {...item} />)}</div>;
}

/** The blog-index hero. `bar` fills the 40px strip at its foot (two cells: column one and column three). */
export function Hero({ section, topic, title, lead, actions = [], children, bar }: {
  section: string; topic?: string; title: string; lead?: string; actions?: Action[]; children?: ReactNode; bar?: ReactNode;
}) {
  const long = title.length > 34;
  return <header className="kit-hero" data-kit-hero>
    <Lines />
    <div className="kit-hero-copy">
      <Eyebrow section={section} topic={topic} />
      <h1 className={long ? "kit-hero-title--long" : undefined}>{title.split(" ").map((word, index) => <span className="kit-word" key={`${word}-${index}`}>{word}</span>)}</h1>
      {lead && <p className="kit-lead">{lead}</p>}
      {children}
      <Actions items={actions} />
    </div>
    <div className="kit-hero-bar">
      {bar ?? <>
        <a href="#content">On this page <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M2 8l5 5 5-5" /></svg></a>
        <span>{topic ?? section}</span>
      </>}
    </div>
  </header>;
}

export function Photos({ images, wide }: { images: { src: string; alt: string }[]; wide?: boolean }) {
  return <div className={`kit-photos${wide ? " kit-photos--wide" : ""}`} data-kit-photos>
    {images.map((image) => <figure key={image.src}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
    </figure>)}
  </div>;
}

type BandTone = "paper" | "white" | "soft" | "dark";

export function Band({ tone = "paper", id, label, children, flush }: { tone?: BandTone; id?: string; label?: string; children: ReactNode; flush?: boolean }) {
  const toneClass = tone === "dark" ? " kit-dark" : tone === "paper" ? "" : ` kit-band--${tone}`;
  return <section className={`kit-band${toneClass}${flush ? " kit-band--flush" : ""}`} id={id} aria-label={label} data-kit-reveal>
    <Lines />
    {children}
  </section>;
}

/** Homepage services layout: sticky intro on the left, content across the other two columns. */
export function Split({ label, title, intro, actions, meta, children, xl }: {
  label?: string; title: ReactNode; intro?: ReactNode; actions?: Action[]; meta?: ReactNode; children: ReactNode; xl?: boolean;
}) {
  return <div className="kit-split">
    <aside className="kit-aside">
      {label && <span className="kit-label">{label}</span>}
      <h2 className={`kit-h2${xl ? " kit-h2--xl" : ""}`}>{title}</h2>
      {intro && (typeof intro === "string" ? <p className="kit-lead">{intro}</p> : intro)}
      {actions && <Actions items={actions} />}
      {meta && <p className="kit-aside-meta">{meta}</p>}
    </aside>
    <div className="kit-main">{children}</div>
  </div>;
}

export function Head({ label, title, intro }: { label?: string; title: ReactNode; intro?: string }) {
  return <div className="kit-head">
    <div>{label && <span className="kit-label">{label}</span>}<h2 className="kit-h2">{title}</h2></div>
    {intro && <p className="kit-lead">{intro}</p>}
  </div>;
}

export function Points({ items, check }: { items: string[]; check?: boolean }) {
  if (!items.length) return null;
  return <ul className={`kit-points${check ? " kit-points--check" : ""}`}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export type Row = { label: string; tag?: string; title: string; image?: { src: string; alt: string }; text: string; points?: string[] };

export function Rows({ items }: { items: Row[] }) {
  return <div className="kit-rows">{items.map((item, index) => <article className="kit-row" key={`${index}-${item.title}`} data-kit-row>
    <div className="kit-row-head"><span className="kit-label">{item.label}{item.tag && <em> / {item.tag}</em>}</span><h3>{item.title}</h3></div>
    {item.image && <div className="kit-row-media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
    </div>}
    <div className="kit-row-body"><p className="kit-copy">{item.text}</p><Points items={item.points ?? []} /></div>
  </article>)}</div>;
}

export type ListItem = { title: string; text?: string; points?: string[]; href?: string };

export function List({ items }: { items: ListItem[] }) {
  return <ol className="kit-list">{items.map((item, index) => {
    const body = <>
      <span className="kit-num" aria-hidden="true">{pad(index + 1)}</span>
      <div>
        <h3>{item.title}{item.href && <span className="kit-arrow" aria-hidden="true">↗</span>}</h3>
        {item.text && <p className="kit-copy">{item.text}</p>}
        {item.points && <Points items={item.points} />}
      </div>
    </>;
    return <li key={`${index}-${item.title}`}>{item.href ? <a href={item.href}>{body}</a> : body}</li>;
  })}</ol>;
}

export function Cells({ items, two }: { items: ListItem[]; two?: boolean }) {
  return <div className={`kit-cells${two ? " kit-cells--two" : ""}`}>{items.map((item, index) => <article className="kit-cell" key={`${index}-${item.title}`}>
    <span className="kit-num" aria-hidden="true">{pad(index + 1)}</span>
    <h3>{item.title}</h3>
    {item.text && <p className="kit-copy">{item.text}</p>}
    {item.points && <Points items={item.points} />}
  </article>)}</div>;
}

export type Card = { href: string; image: { src: string; alt: string }; meta: string; metaFaint?: string; title: string; text?: string; go: string; external?: boolean };

export function Cards({ items }: { items: Card[] }) {
  return <ul className="kit-cards">{items.map((item) => <li className="kit-card" key={item.href}>
    <a href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="kit-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
      </span>
      <span className="kit-card-copy">
        <span className="kit-meta"><b>{item.meta}</b>{item.metaFaint && <><span aria-hidden="true" /><em>{item.metaFaint}</em></>}</span>
        <h3>{item.title}</h3>
        {item.text && <p className="kit-copy">{item.text}</p>}
        <span className="kit-card-go">{item.go}<span aria-hidden="true">↗</span></span>
      </span>
    </a>
  </li>)}</ul>;
}

/** A closing statement: big line across two columns, supporting copy and an action in the third. */
export function Statement({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <div className="kit-statement"><h2 className="kit-h2">{title}</h2><div>{children}</div></div>;
}
