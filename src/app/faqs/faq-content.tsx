"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fallback from "../../../content/faqs/faqs.json";
import SiteFooter from "../site-footer";

gsap.registerPlugin(ScrollTrigger);

const ALL_TOPICS = "All topics";

export default function FaqContent({ content = fallback }: { content?: typeof fallback }) {
  const rootRef = useRef<HTMLElement>(null);
  const [category, setCategory] = useState(ALL_TOPICS);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => content.questions.filter(({ category: group, question, answer }) => {
    const matchesTopic = category === ALL_TOPICS || group === category;
    const matchesSearch = `${question} ${answer} ${group}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesTopic && matchesSearch;
  }), [category, search, content]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-hero .blog-eyebrow,.faq-hero h1,.faq-hero-copy,.faq-hero>a", { autoAlpha: 0, y: 22, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .8, stagger: .1, ease: "power3.out" });
      gsap.fromTo(".faq-scroller-heading > *, .faq-topic-filter, .faq-search-control, .faq-question-item", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .045, ease: "power3.out", scrollTrigger: { trigger: ".faq-content", start: "top 84%", once: true } });
      gsap.fromTo(".faq-final > *", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".faq-final", start: "top 84%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section className="faq-page-content" ref={rootRef}>
    <header className="faq-hero"><div className="faq-hero-orbit" aria-hidden="true"/><p className="blog-eyebrow"><span/> TRAVERSE VPN <i>/</i> FAQS</p><h1>Everything about VPN privacy,<br/><span>security, streaming &amp; speed.</span></h1><p className="faq-hero-copy">Learn about online privacy, streaming, internet security, and safe browsing with Traverse VPN. Find answers about Netflix, gaming, public WiFi, VPN speed, encryption, and more.</p><a href="/plans">Get protected with Traverse <span aria-hidden="true">↗</span></a></header>
    <section className="faq-content" aria-labelledby="faq-section-title">
      <div className="faq-scroller-heading">
        <div className="faq-scroller-copy"><p className="blog-eyebrow"><span/> ANSWERS, WITHOUT THE GUESSWORK</p><h2 id="faq-section-title">Good to know.<br/><span>Easy to find.</span></h2><p>Browse the questions people ask before they connect. Choose a topic or search for a specific answer.</p></div>
        <label className="faq-search-control"><span className="sr-only">Search frequently asked questions</span><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input placeholder="Search questions" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
      </div>
      <div className="faq-browse-controls">
        <div className="faq-topic-filter" aria-label="Filter questions by topic">
          {[ALL_TOPICS, ...content.categories].map((item) => <button key={item} className={category === item ? "active" : ""} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <p className="faq-result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "answer" : "answers"}</p>
      </div>
      <div className="faq-question-list" aria-live="polite">
        {filtered.map((item, index) => <details className="faq-question-item" key={item.question}>
          <summary><span className="faq-question-number">{String(index + 1).padStart(2, "0")}</span><span className="faq-question-title">{item.question}</span><span className="faq-question-category">{item.category}</span><i aria-hidden="true">+</i></summary>
          <div className="faq-answer"><div><p>{item.answer}</p></div></div>
        </details>)}
        {filtered.length === 0 && <p className="faq-no-results">No questions found. Try a different search.</p>}
      </div>
    </section>
    <section className="faq-final"><p className="blog-eyebrow"><span/> READY WHEN YOU ARE</p><h2>Protect your privacy<br/><span>in seconds.</span></h2><p>Fast, secure, and private internet access across your devices.</p><a href="https://links.traversevpn.com/s/Ugp0lRJV">Download now <span aria-hidden="true">↗</span></a></section>
    <SiteFooter />
  </section>;
}
