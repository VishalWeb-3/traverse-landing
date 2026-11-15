"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fallback from "../../../content/enterprise/enterprise.json";
import SiteFooter from "../site-footer";
import "./enterprise.css";

gsap.registerPlugin(ScrollTrigger);

type EnterprisePageData = typeof fallback;

const CONTACT_URL = "/contact-us";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function EnterpriseNetwork() {
  return <div className="enterprise-network" role="img" aria-label="People, offices, business apps, cloud, and devices connected through Traverse secure access">
    <div className="enterprise-network-topline"><span>SECURE ACCESS LAYER</span><span className="enterprise-network-status"><i /> ACCESS ROUTES</span></div>
    <svg className="enterprise-network-lines" viewBox="0 0 680 470" fill="none" aria-hidden="true">
      <path className="enterprise-network-line" d="M340 235C260 202 210 129 105 105"/><path className="enterprise-network-line" d="M340 235C420 202 470 129 575 105"/>
      <path className="enterprise-network-line" d="M340 235H65"/><path className="enterprise-network-line" d="M340 235H615"/>
      <path className="enterprise-network-line" d="M340 235C260 269 210 342 105 365"/><path className="enterprise-network-line" d="M340 235C420 269 470 342 575 365"/>
      <circle className="enterprise-network-pulse" r="4"><animateMotion dur="4.5s" repeatCount="indefinite" path="M340 235C260 202 210 129 105 105"/></circle>
      <circle className="enterprise-network-pulse" r="4"><animateMotion dur="5.2s" repeatCount="indefinite" path="M340 235C420 269 470 342 575 365"/></circle>
    </svg>
    <div className="enterprise-network-hub"><span className="enterprise-hub-mark"><i /><i /><i /></span><b>TRAVERSE</b><small>SECURE GATEWAY</small></div>
    <div className="enterprise-network-node node-people"><span>01</span><b>PEOPLE</b></div>
    <div className="enterprise-network-node node-sites"><span>02</span><b>OFFICES</b></div>
    <div className="enterprise-network-node node-apps"><span>03</span><b>APPS</b></div>
    <div className="enterprise-network-node node-cloud"><span>04</span><b>CLOUD</b></div>
    <div className="enterprise-network-node node-devices"><span>05</span><b>DEVICES</b></div>
    <div className="enterprise-network-node node-remote"><span>06</span><b>REMOTE</b></div>
    <div className="enterprise-network-foot"><span>ONE POLICY LAYER</span><i /><span>CONNECTED BY ENCRYPTION</span></div>
  </div>;
}

function Roles({ items }: { items: EnterprisePageData["audiences"] }) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const panelRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const mounted = useRef(false);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);

  // One pink block sits behind the chosen role and travels to the next one.
  const placeHighlight = (animate: boolean) => {
    const highlight = highlightRef.current;
    const role = listRef.current?.querySelector<HTMLElement>('.en-role[aria-selected="true"]');
    if (!highlight || !role) return;
    const box = { x: role.offsetLeft, y: role.offsetTop, width: role.offsetWidth, height: role.offsetHeight };
    if (animate && !prefersReducedMotion()) gsap.to(highlight, { ...box, duration: .5, ease: "expo.out", overwrite: true });
    else { gsap.killTweensOf(highlight); gsap.set(highlight, box); }
  };

  useEffect(() => {
    placeHighlight(mounted.current);
    const panel = panelRefs.current[active];
    if (mounted.current && panel && !prefersReducedMotion()) gsap.fromTo(panel, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .45, ease: "expo.out", overwrite: true, clearProps: "transform,opacity,visibility" });
    mounted.current = true;
    setLive(true);
  }, [active]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => placeHighlight(gsap.isTweening(highlightRef.current)));
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const move = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!move) return;
    event.preventDefault();
    const next = (active + move + items.length) % items.length;
    setActive(next);
    listRef.current?.querySelectorAll<HTMLElement>(".en-role")[next]?.focus();
  };

  return <section className="en-roles" aria-labelledby="en-roles-title">
    <div className={`en-wrap en-roles-grid${live ? " en-roles-live" : ""}`}>
      <h2 id="en-roles-title" className="en-h">Built for the people who own access.</h2>
      <div ref={listRef} className="en-role-list" role="tablist" aria-labelledby="en-roles-title" aria-orientation="vertical" onKeyDown={onKeyDown}>
        <span ref={highlightRef} className="en-role-highlight" aria-hidden="true" />
        {items.map(({ title }, index) => <button className="en-role" type="button" role="tab" id={`${baseId}-tab-${index}`} aria-controls={`${baseId}-panel-${index}`} aria-selected={index === active} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} key={title}>{title}</button>)}
      </div>
      {/* Every answer is in the markup; only the chosen one shows once the script is running. */}
      <div className="en-role-panels">{items.map(({ title, text }, index) => <p ref={(element) => { panelRefs.current[index] = element; }} className="en-role-panel" role="tabpanel" id={`${baseId}-panel-${index}`} aria-labelledby={`${baseId}-tab-${index}`} hidden={live && index !== active} key={title}>{text}</p>)}</div>
    </div>
  </section>;
}

function Rows({ items }: { items: { title: string; text: string }[] }) {
  // Native <details> keeps every answer reachable without script; GSAP only eases the open and close.
  const toggle = (event: React.MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.parentElement as HTMLDetailsElement;
    const body = details.querySelector<HTMLElement>(".en-row-body");
    const mark = details.querySelector<HTMLElement>(".en-row-mark");
    if (!body || prefersReducedMotion()) return;
    event.preventDefault();
    gsap.killTweensOf(body);
    if (details.open && !details.dataset.closing) {
      details.dataset.closing = "true";
      gsap.to(mark, { rotate: 0, duration: .25, ease: "power3.out" });
      gsap.to(body, { height: 0, autoAlpha: 0, duration: .25, ease: "power3.inOut", onComplete: () => { details.open = false; delete details.dataset.closing; gsap.set(body, { clearProps: "height,opacity,visibility" }); } });
      return;
    }
    const from = details.open ? body.offsetHeight : 0;
    delete details.dataset.closing;
    details.open = true;
    gsap.to(mark, { rotate: 45, duration: .4, ease: "expo.out" });
    gsap.fromTo(body, { height: from, autoAlpha: from ? 1 : 0 }, { height: "auto", autoAlpha: 1, duration: .45, ease: "expo.out", clearProps: "height,opacity,visibility" });
  };

  return <div className="en-rows">{items.map(({ title, text }) => <details className="en-row" key={title}>
    <summary onClick={toggle}><span>{title}</span><i className="en-row-mark" aria-hidden="true" /></summary>
    <div className="en-row-body"><p>{text}</p></div>
  </details>)}</div>;
}

export default function EnterpriseContent({ content = fallback }: { content?: EnterprisePageData }) {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || prefersReducedMotion()) return;
    const context = gsap.context(() => {
      // The page's one authored entrance: the hero copy and access diagram settle in together.
      gsap.fromTo(".enterprise-hero-kicker,.enterprise-hero h1,.enterprise-hero-summary,.enterprise-hero-actions,.enterprise-network",
        { autoAlpha: 0, y: 22, filter: "blur(5px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .78, stagger: .1, ease: "power3.out", delay: .12 });
      gsap.from(".en-support-item", { y: 32, autoAlpha: 0, duration: .7, stagger: .07, ease: "expo.out", scrollTrigger: { trigger: ".en-support-grid", start: "top 85%", once: true } });
    }, page);
    return () => context.revert();
  }, []);

  return <section ref={pageRef} className="en-page">
    <header className="enterprise-hero">
      <div className="enterprise-hero-shell">
        <div className="enterprise-hero-copy">
          <p className="blog-eyebrow enterprise-hero-kicker"><span /> TRAVERSE VPN <i>/</i> ENTERPRISE</p>
          <h1><span className="enterprise-title-first">Secure access for</span><span className="enterprise-title-accent">distributed teams.</span></h1>
          <p className="enterprise-hero-summary">Traverse VPN provides IT teams and security leaders with a secure, scalable foundation for remote access, multi-site connectivity, and centralized network control.</p>
          <div className="enterprise-hero-actions"><a className="enterprise-hero-cta" href="/contact-us">Talk to our team <span aria-hidden="true">↗</span></a><a className="enterprise-hero-secondary" href="#en-needs-title">Explore the model <span aria-hidden="true">↓</span></a></div>
        </div>
        <EnterpriseNetwork />
        <div className="enterprise-hero-footnote"><span>FOR IT &amp; SECURITY LEADERS</span><span>ACCESS, DESIGNED TO SCALE</span></div>
      </div>
    </header>

    <Roles items={content.audiences} />

    <section className="en-needs" aria-labelledby="en-needs-title">
      <div className="en-wrap en-split">
        <h2 id="en-needs-title" className="en-h">What a business VPN needs to do.</h2>
        <Rows items={content.expectations} />
      </div>
    </section>

    <section className="en-support" aria-labelledby="en-support-title">
      <div className="en-wrap">
        <h2 id="en-support-title" className="en-h">A team beside you, from planning to rollout.</h2>
        <div className="en-support-grid">{content.support.map(({ title, text }) => <article className="en-support-item" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="en-faq" aria-labelledby="en-faq-title">
      <div className="en-wrap en-split">
        <h2 id="en-faq-title" className="en-h">Good to know.</h2>
        <Rows items={content.questions.map(({ question, answer }) => ({ title: question, text: answer }))} />
      </div>
    </section>

    <section className="en-cta" aria-labelledby="en-cta-title">
      <div className="en-wrap">
        <div className="en-cta-block">
          <h2 id="en-cta-title" className="en-h">Start with a conversation.</h2>
          <a className="en-button" href={CONTACT_URL}>Talk to our team</a>
        </div>
      </div>
    </section>
    <SiteFooter />
  </section>;
}
