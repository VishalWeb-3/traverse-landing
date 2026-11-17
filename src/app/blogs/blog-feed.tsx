"use client";

import Image from "next/image";
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type BlogCard = {
  href: string;
  title: string;
  excerpt: string;
  topic: string;
  date: string;
  read: string;
  image: string;
  alt: string;
  author: { name: string; avatar: string };
};

const ALL = "All categories";
const HEADLINE = ["Notes", "for", "the", "road"];
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Four ascending pink bars: the Traverse signal mark that leads every eyebrow. */
function Signal() {
  return <span className="nb-signal" aria-hidden="true"><i /><i /><i /><i /></span>;
}

function Meta({ post }: { post: BlogCard }) {
  return <p className="nb-meta"><time>{post.date}</time><span aria-hidden="true" /><b>{post.read}</b></p>;
}

export default function BlogFeed({ posts }: { posts: BlogCard[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState(ALL);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const topics = useMemo(() => [ALL, ...Array.from(new Set(posts.map((post) => post.topic)))], [posts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => (topic === ALL || post.topic === topic) && (!q || `${post.title} ${post.excerpt} ${post.topic}`.toLowerCase().includes(q)));
  }, [posts, topic, query]);
  const [featured, ...rest] = visible;

  // Entrance and scroll motion, modelled on the reference: words rise and sharpen from grey to ink,
  // the featured image lifts in behind a clip, and grid cards rise column by column as they enter.
  useIsoLayoutEffect(() => {
    const page = root.current;
    if (!page || reduced()) return;
    const ctx = gsap.context(() => {
      const ease = "power3.out";
      gsap.timeline({ delay: .1 })
        .from(".nb-hero .nb-eyebrow", { y: 15, autoAlpha: 0, duration: .6, ease })
        .from(".nb-hero .nb-word", { y: 15, autoAlpha: 0, filter: "blur(8px)", color: "#a3a3a3", duration: .9, stagger: .12, ease }, "<.1")
        .from(".nb-hero .nb-lead", { y: 15, autoAlpha: 0, duration: .7, ease }, "<.35")
        .from(".nb-controls > *", { autoAlpha: 0, duration: .6, stagger: .08, ease: "power2.out" }, "<.2");

      gsap.from(".nb-featured-media", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".nb-featured", start: "top 90%", once: true } });
      gsap.from(".nb-featured-media img", { scale: 1.18, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".nb-featured", start: "top 90%", once: true } });
      gsap.from(".nb-featured-card > *", { y: 20, autoAlpha: 0, duration: .8, stagger: .08, ease, scrollTrigger: { trigger: ".nb-featured", start: "top 80%", once: true } });

      gsap.utils.toArray<HTMLElement>(".nb-card").forEach((card) => {
        const column = Number(card.dataset.col ?? 0);
        const trigger = { trigger: card, start: "top 92%", once: true };
        gsap.from(card, { y: 60, autoAlpha: 0, duration: 1, delay: column * .1, ease, scrollTrigger: trigger });
        gsap.from(card.querySelector("img"), { scale: 1.15, duration: 1.4, delay: column * .1, ease: "expo.out", scrollTrigger: trigger });
      });

      gsap.from(".nb-subscribe .nb-eyebrow, .nb-subscribe-word, .nb-subscribe .nb-lead", { y: 15, autoAlpha: 0, filter: "blur(6px)", duration: .8, stagger: .08, ease, scrollTrigger: { trigger: ".nb-subscribe", start: "top 80%", once: true } });
      gsap.from(".nb-subscribe-form > *, .nb-subscribe-terms", { y: 15, autoAlpha: 0, duration: .7, stagger: .08, ease, scrollTrigger: { trigger: ".nb-subscribe", start: "top 80%", once: true } });
    }, page);
    return () => ctx.revert();
  }, []);

  // When a filter or search changes the list, the new cards settle in quickly instead of popping.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (reduced()) return;
    gsap.fromTo(".nb-results .nb-featured, .nb-results .nb-card", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6, stagger: .05, ease: "power3.out", overwrite: true, clearProps: "transform,opacity,visibility" });
    ScrollTrigger.refresh();
  }, [topic, query]);

  // Cursor dot that follows the pointer over a card, as on the reference (fine pointers only).
  const cursor = useRef<HTMLDivElement>(null);
  const follow = useRef<{ x: (value: number) => void; y: (value: number) => void } | null>(null);
  useEffect(() => {
    const dot = cursor.current;
    if (!dot || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
    const x = gsap.quickTo(dot, "x", { duration: .35, ease: "power3.out" });
    const y = gsap.quickTo(dot, "y", { duration: .35, ease: "power3.out" });
    follow.current = { x, y };
    const move = (event: PointerEvent) => { x(event.clientX); y(event.clientY); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); follow.current = null; };
  }, []);
  const showCursor = (event: ReactPointerEvent) => {
    if (!follow.current || event.pointerType !== "mouse") return;
    gsap.set(cursor.current, { x: event.clientX, y: event.clientY });
    gsap.to(cursor.current, { scale: 1, autoAlpha: 1, duration: reduced() ? 0 : .35, ease: "back.out(2)", overwrite: "auto" });
  };
  const hideCursor = () => {
    if (!follow.current) return;
    gsap.to(cursor.current, { scale: 0, autoAlpha: 0, duration: reduced() ? 0 : .25, ease: "power2.in", overwrite: "auto" });
  };

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") || "").trim();
    if (!email) return;
    setStatus("Your email app is opening with the request filled in. Send it to join the list.");
    window.location.href = `mailto:info@traversevpn.com?subject=${encodeURIComponent("Traverse blog updates")}&body=${encodeURIComponent(`Please add ${email} to the Traverse blog updates list.`)}`;
  };

  return <div ref={root} className="nb-root">
    <div className="nb-lines" aria-hidden="true"><i /><i /><i /></div>
    <div ref={cursor} className="nb-cursor" aria-hidden="true" />

    <section className="nb-hero" aria-labelledby="nb-title">
      <div className="nb-hero-copy">
        <p className="nb-eyebrow"><Signal /><span>[ Traverse—Blog / <em>Guides</em> ]</span></p>
        <h1 id="nb-title" aria-label={HEADLINE.join(" ")}>{HEADLINE.map((word) => <span className="nb-word" aria-hidden="true" key={word}>{word}</span>)}</h1>
        <p className="nb-lead">Plain-language guides to public Wi-Fi, encryption, and staying private on every network you join.</p>
      </div>
      <div className="nb-controls">
        <label className="nb-select">
          <span className="sr-only">Filter by category</span>
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            {topics.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
        </label>
        <label className="nb-search">
          <span className="sr-only">Search articles</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" />
          <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></svg>
        </label>
      </div>
    </section>

    <section className="nb-results" aria-label="Articles" aria-live="polite">
      {featured ? <article className="nb-featured">
        <a className="nb-featured-media" href={featured.href} tabIndex={-1} aria-hidden="true">
          <Image src={featured.image} alt="" fill priority sizes="(max-width: 809px) 100vw, 66vw" />
        </a>
        <div className="nb-featured-card">
          <div>
            <Meta post={featured} />
            <h2><a href={featured.href}>{featured.title}</a></h2>
          </div>
          <div className="nb-featured-foot">
            <p className="nb-excerpt">{featured.excerpt}</p>
            <p className="nb-author">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.author.avatar} alt="" width={40} height={40} />
              <span>Article <i>by</i><b>{featured.author.name}</b></span>
            </p>
          </div>
        </div>
      </article> : <div className="nb-empty">
        <p>No articles match “{query.trim() || topic}”.</p>
        <button type="button" onClick={() => { setTopic(ALL); setQuery(""); }}>Show all articles</button>
      </div>}

      {rest.length > 0 && <ul className="nb-grid">
        {rest.map((post, index) => <li className="nb-card" data-col={index % 3} key={post.href}>
          <a href={post.href} onPointerEnter={showCursor} onPointerLeave={hideCursor}>
            {/* The frame shrinks on hover while the photo keeps its size, so it crops from the bottom like the reference. */}
            <span className="nb-card-media"><span className="nb-card-img"><Image src={post.image} alt={post.alt} fill sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 33vw" /></span></span>
            <span className="nb-card-copy">
              <span className="nb-card-meta"><span><Meta post={post} /></span></span>
              <h3>{post.title}</h3>
              <span className="nb-card-more" aria-hidden="true">
                <span className="nb-card-excerpt">{post.excerpt}</span>
                <span className="nb-card-author">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.author.avatar} alt="" width={40} height={40} />
                  <span>Article <i>by</i><b>{post.author.name}</b></span>
                </span>
              </span>
            </span>
          </a>
        </li>)}
      </ul>}
    </section>

    <section className="nb-subscribe" aria-labelledby="nb-subscribe-title">
      <div className="nb-subscribe-copy">
        <p className="nb-eyebrow"><Signal /><span>[ Traverse—Updates / <em>Newsletter</em> ]</span></p>
        <h2 id="nb-subscribe-title"><span className="nb-subscribe-word">Subscribe</span></h2>
        <p className="nb-lead">A short note when a new guide goes up. Nothing else.</p>
      </div>
      <form className="nb-subscribe-form" onSubmit={subscribe}>
        <label htmlFor="nb-email">Enter your email</label>
        <div className="nb-subscribe-field">
          <input id="nb-email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
          <button type="submit" aria-label="Request updates"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /></svg></button>
        </div>
        <p className="nb-subscribe-status" role="status">{status}</p>
      </form>
      <p className="nb-subscribe-terms">Submitting you agree with<br /><a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-and-conditions">Terms of Service</a>.</p>
    </section>
  </div>;
}
