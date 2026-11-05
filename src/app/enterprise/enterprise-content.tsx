"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fallback from "../../../content/enterprise/enterprise.json";
import SiteFooter from "../site-footer";

gsap.registerPlugin(ScrollTrigger);

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

export default function EnterpriseContent({ content = fallback }: { content?: typeof fallback }) {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(root.querySelectorAll(".enterprise-hero-kicker,.enterprise-hero h1,.enterprise-hero-summary,.enterprise-hero-actions,.enterprise-network"),
        { autoAlpha: 0, y: 22, filter: "blur(5px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .78, stagger: .1, ease: "power3.out", delay: .12 },
      );
      root.querySelectorAll<HTMLElement>(".enterprise-reveal").forEach((section) => {
        gsap.fromTo(section.querySelectorAll(".enterprise-section-kicker,.enterprise-reveal-title,.enterprise-audience-copy > p,.enterprise-item,.enterprise-table-card,.enterprise-support-item,.enterprise-faq-item,.enterprise-security-step"),
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: .62, stagger: .045, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } },
        );
      });
      gsap.fromTo(root.querySelectorAll(".enterprise-final > *"), { autoAlpha: 0, y: 20 }, {
        autoAlpha: 1, y: 0, duration: .7, stagger: .08, ease: "power3.out",
        scrollTrigger: { trigger: ".enterprise-final", start: "top 82%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section ref={rootRef} className="enterprise-content">
    <header className="enterprise-hero">
      <div className="enterprise-hero-shell">
        <div className="enterprise-hero-copy">
          <p className="blog-eyebrow enterprise-hero-kicker"><span /> TRAVERSE VPN <i>/</i> ENTERPRISE</p>
          <h1><span className="enterprise-title-first">Secure access for</span><span className="enterprise-title-accent">distributed teams.</span></h1>
          <p className="enterprise-hero-summary">Traverse VPN provides IT teams and security leaders with a secure, scalable foundation for remote access, multi-site connectivity, and centralized network control.</p>
          <div className="enterprise-hero-actions"><a className="enterprise-hero-cta" href="/contact-us">Talk to our team <span aria-hidden="true">↗</span></a><a className="enterprise-hero-secondary" href="#enterprise-model">Explore the model <span aria-hidden="true">↓</span></a></div>
        </div>
        <EnterpriseNetwork />
        <div className="enterprise-hero-footnote"><span>FOR IT &amp; SECURITY LEADERS</span><span>ACCESS, DESIGNED TO SCALE</span></div>
      </div>
    </header>

    <div className="enterprise-light-field">
      <section className="enterprise-audience enterprise-reveal" aria-labelledby="enterprise-audience-title">
        <div className="enterprise-audience-intro"><p className="blog-eyebrow enterprise-section-kicker"><span /> WHO IT'S FOR</p><h2 id="enterprise-audience-title" className="enterprise-reveal-title">Built around the people responsible for access.</h2></div>
        <div className="enterprise-audience-copy"><p>Enterprise VPN is a core infrastructure decision. It should work for the people who deploy it, set the policies, and keep teams connected.</p><p className="enterprise-overline">Traverse VPN Enterprise is designed for:</p></div>
        <div className="enterprise-audience-grid">{content.audiences.map(({ title, text }, index) => <article className="enterprise-item" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="enterprise-problem enterprise-reveal" aria-labelledby="enterprise-problem-title">
        <div className="enterprise-section-head"><p className="blog-eyebrow enterprise-section-kicker"><span /> THE CHALLENGE</p><h2 id="enterprise-problem-title" className="enterprise-reveal-title">When teams grow, access gets harder to manage.</h2><p>Many organizations already operate VPN infrastructure. The challenge is whether the architecture still matches the organization using it.</p></div>
        <div className="enterprise-problem-grid"><article className="enterprise-table-card"><span>01</span><h3>Growing complexity</h3><p>Teams, applications, and locations multiply while access remains difficult to manage consistently.</p></article><article className="enterprise-table-card"><span>02</span><h3>Disconnected systems</h3><p>Manual per-device work and fragmented permissions make everyday administration harder.</p></article><article className="enterprise-table-card"><span>03</span><h3>Access gaps</h3><p>Unclear ownership and inconsistent controls can create operational and security risk.</p></article></div>
      </section>

      <section className="enterprise-expectations enterprise-reveal" id="enterprise-model" aria-labelledby="enterprise-expectations-title">
        <div className="enterprise-expectations-intro"><p className="blog-eyebrow enterprise-section-kicker"><span /> THE INFRASTRUCTURE</p><h2 id="enterprise-expectations-title" className="enterprise-reveal-title">What a business VPN needs to do.</h2><p>Build an access layer that supports your people, locations, and day-to-day operations.</p></div>
        <div className="enterprise-expectation-list">{content.expectations.map(({ title, text }, index) => <article className="enterprise-item" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">↗</b></article>)}</div>
      </section>

      <section className="enterprise-security enterprise-reveal" aria-labelledby="enterprise-security-title">
        <div className="enterprise-security-heading"><p className="blog-eyebrow enterprise-section-kicker"><span /> LAYERED PROTECTION</p><h2 id="enterprise-security-title" className="enterprise-reveal-title">Security works in layers.</h2><p>Enterprise VPN security operates as a layered system rather than a single mechanism.</p></div>
        <div className="enterprise-security-flow"><article className="enterprise-security-step"><span>01 / CONNECTION</span><h3>Encrypted connections</h3><p>Protect data in transit as teams connect to business resources.</p></article><i aria-hidden="true">→</i><article className="enterprise-security-step"><span>02 / PERMISSION</span><h3>Access boundaries</h3><p>Use roles and permissions to align access with organizational responsibilities.</p></article><i aria-hidden="true">→</i><article className="enterprise-security-step"><span>03 / OVERSIGHT</span><h3>Fewer exposure gaps</h3><p>Plan consistent access across people, devices, and locations.</p></article></div>
      </section>

      <section className="enterprise-support enterprise-reveal" aria-labelledby="enterprise-support-title">
        <div className="enterprise-support-heading"><p className="blog-eyebrow enterprise-section-kicker"><span /> IMPLEMENTATION SUPPORT</p><h2 id="enterprise-support-title" className="enterprise-reveal-title">A team beside you, from planning through rollout.</h2><a href="/contact-us">Discuss your deployment <span aria-hidden="true">↗</span></a></div>
        <div className="enterprise-support-list">{content.support.map(({ title, text }, index) => <article className="enterprise-support-item" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="enterprise-faq enterprise-reveal" aria-labelledby="enterprise-faq-title">
        <div className="enterprise-faq-heading"><p className="blog-eyebrow enterprise-section-kicker"><span /> YOUR QUESTIONS, COVERED</p><h2 id="enterprise-faq-title" className="enterprise-reveal-title">Good to know.</h2><a className="enterprise-faq-visit" href="/">Visit Traverse VPN <span aria-hidden="true">↗</span></a></div>
        <div className="enterprise-faq-list">{content.questions.map(({ question, answer }, index) => <details className="enterprise-faq-item" key={question} onToggle={(event) => {
          const current = event.currentTarget;
          if (!current.open) return;
          current.parentElement?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((other) => {
            if (other !== current) other.open = false;
          });
        }}><summary><span>{question}</span><i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i><b aria-hidden="true">+</b></summary><p>{answer}</p></details>)}</div>
      </section>
    </div>

    <section className="enterprise-final" aria-labelledby="enterprise-final-title"><div className="enterprise-final-inner"><p className="blog-eyebrow"><span /> START WITH A CONVERSATION</p><h2 id="enterprise-final-title">Make secure access part of your infrastructure plan.</h2><p>Talk with our team about your organization’s requirements, deployment scope, and access architecture.</p><a href="/contact-us">Talk to our team <span aria-hidden="true">↗</span></a><span className="enterprise-final-index" aria-hidden="true">TRAVERSE / ENTERPRISE</span></div></section>
    <SiteFooter />
  </section>;
}
