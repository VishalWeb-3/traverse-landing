"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fallback from "../../../content/features/features.json";
import FeatureBento from "./feature-bento";
import SiteFooter from "../site-footer";
import "./features.css";

gsap.registerPlugin(ScrollTrigger);

type FeaturesPageData = typeof fallback;

const ROUTE = "M213 321C240 155 351 390 474 204";

// The hero diagram tells one story: the device comes online, the tunnel opens, the internet is reached,
// then a single packet keeps travelling the tunnel while the hero is on screen.
function animateHeroDiagram(visual: HTMLElement) {
  const q = gsap.utils.selector(visual);
  const route = q<SVGPathElement>(".feature-hero-route")[0];
  const flow = q<SVGPathElement>(".feature-hero-flow")[0];
  if (!route || !flow) return;
  const length = route.getTotalLength();
  const packet = 46;
  const ease = "power3.out";

  q<SVGGeometryElement>(".feature-hero-orbit-lines > *").forEach((line) => {
    const total = line.getTotalLength();
    gsap.set(line, { strokeDasharray: total, strokeDashoffset: total });
  });
  gsap.set(route, { strokeDasharray: length, strokeDashoffset: length });
  gsap.set(q(".feature-hero-node, .feature-hero-ring"), { scale: 0, transformOrigin: "50% 50%" });
  gsap.set(q(".feature-hero-endpoint, .feature-hero-tunnel-label"), { autoAlpha: 0, y: 8 });
  gsap.set(q(".feature-hero-visual-bottom i"), { scaleX: 0, transformOrigin: "0 50%" });
  gsap.set(q(".feature-hero-visual-bottom span, .feature-hero-visual-top > span:last-child"), { autoAlpha: .35 });
  gsap.set(q(".feature-hero-visual-top i"), { scale: 0 });

  const connect = gsap.timeline({ delay: .7 })
    .to(q(".feature-hero-orbit-lines > *"), { strokeDashoffset: 0, duration: 1.4, stagger: .07, ease: "power2.inOut" })
    .to(q(".feature-hero-node-a, .feature-hero-ring-a"), { scale: 1, duration: .5, ease }, "-=.7")
    .to(q(".feature-hero-endpoint-device"), { autoAlpha: 1, y: 0, duration: .5, ease }, "<")
    .to(q(".feature-hero-visual-bottom span")[0], { autoAlpha: 1, duration: .3 }, "<")
    .to(route, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" })
    .to(q(".feature-hero-visual-bottom i")[0], { scaleX: 1, duration: .55, ease: "power2.inOut" }, "<")
    .to(q(".feature-hero-tunnel-label"), { autoAlpha: 1, y: 0, duration: .45, ease }, "<.35")
    .to(q(".feature-hero-visual-bottom span")[1], { autoAlpha: 1, duration: .3 }, "<")
    .to(q(".feature-hero-visual-bottom i")[1], { scaleX: 1, duration: .55, ease: "power2.inOut" }, "<.2")
    .to(q(".feature-hero-node-b, .feature-hero-ring-b"), { scale: 1, duration: .5, ease })
    .to(q(".feature-hero-endpoint-web"), { autoAlpha: 1, y: 0, duration: .5, ease }, "<")
    .to(q(".feature-hero-visual-bottom span")[2], { autoAlpha: 1, duration: .3 }, "<")
    .to(q(".feature-hero-visual-top > span:last-child"), { autoAlpha: 1, duration: .3 }, "<.1")
    .to(q(".feature-hero-visual-top i"), { scale: 1, duration: .35, ease: "back.out(2)" }, "<");

  // Live traffic: the packet runs device → internet, and the far ring answers when it arrives.
  gsap.set(flow, { strokeDasharray: `${packet} ${length}`, strokeDashoffset: packet });
  const traffic = gsap.timeline({ repeat: -1, repeatDelay: 1.1, paused: true })
    .set(flow, { opacity: 1, strokeDashoffset: packet })
    .to(flow, { strokeDashoffset: -length, duration: 1.6, ease: "power1.inOut" })
    .set(flow, { opacity: 0 })
    .fromTo(q(".feature-hero-ring-b"), { scale: 1, opacity: 1 }, { scale: 1.9, opacity: 0, duration: .7, ease: "power2.out", immediateRender: false }, "-=.15")
    .set(q(".feature-hero-ring-b"), { scale: 1, opacity: 1 });

  connect.eventCallback("onComplete", () => {
    ScrollTrigger.create({ trigger: visual, start: "top bottom", end: "bottom top", onToggle: (self) => { if (self.isActive) traffic.play(); else traffic.pause(); } });
    if (ScrollTrigger.isInViewport(visual)) traffic.play();
  });
}

export default function FeaturesContent({ content = fallback }: { content?: FeaturesPageData }) {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".feature-page-hero .feature-page-eyebrow, .feature-page-hero h1, .feature-page-hero-copy, .feature-page-hero .feature-page-cta, .feature-hero-visual",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.12 },
      );
      const visual = page.querySelector<HTMLElement>(".feature-hero-visual");
      if (visual) animateHeroDiagram(visual);
      gsap.fromTo("[data-feature-bento-card]", { autoAlpha: 0, y: 16 }, {
        autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: ".feature-bento-grid", start: "top 82%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".feature-story").forEach((story) => {
        gsap.fromTo(story.querySelectorAll(".feature-story-media, .feature-story-copy > *"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: story, start: "top 78%", once: true } },
        );
      });
      gsap.fromTo(".feature-safeguard", { autoAlpha: 0, y: 16 }, {
        autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: ".feature-safeguards", start: "top 78%", once: true },
      });
      gsap.fromTo(".feature-support > *", { autoAlpha: 0, y: 16 }, {
        autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: ".feature-support", start: "top 82%", once: true },
      });
    }, page);
    return () => context.revert();
  }, []);

  return <section ref={pageRef} className="feature-page-content">
    <header className="feature-page-hero">
      <div className="feature-hero-grain" aria-hidden="true" />
      <div className="feature-hero-layout">
        <div className="feature-page-hero-copy">
          <p className="blog-eyebrow feature-page-eyebrow"><span /> Traverse VPN <i>/</i> Features</p>
          <h1>Browse privately<br /><span>and securely</span></h1>
          <p className="feature-page-copy">Traverse VPN creates an encrypted tunnel between your device and the internet, so your traffic can’t be easily read or intercepted by others on the network.</p>
          <a className="feature-page-cta" href="/downloads">Explore Traverse <span aria-hidden="true">↗</span></a>
        </div>
        <div className="feature-hero-visual" aria-hidden="true">
          <div className="feature-hero-visual-top"><span>Private connection</span><span><i /> Connected</span></div>
          <svg className="feature-hero-map" viewBox="0 0 620 540" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="feature-hero-orbit-lines" stroke="rgba(255,255,255,.15)" strokeWidth="1">
              <circle cx="345" cy="264" r="163"/><ellipse cx="345" cy="264" rx="163" ry="62"/><ellipse cx="345" cy="264" rx="163" ry="112"/>
              <ellipse cx="345" cy="264" rx="62" ry="163"/><ellipse cx="345" cy="264" rx="112" ry="163"/>
              <path d="M183 264h324M210 202h270M210 326h270"/>
            </g>
            <path className="feature-hero-route" d={ROUTE} stroke="#f22c59" strokeWidth="2" strokeLinecap="round"/>
            {/* One packet of traffic: a short bright stretch of the same route, moved along it by GSAP. */}
            <path className="feature-hero-flow" d={ROUTE} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0"/>
            <circle className="feature-hero-ring feature-hero-ring-a" cx="213" cy="321" r="12" stroke="#f22c59" strokeOpacity=".32"/><circle className="feature-hero-ring feature-hero-ring-b" cx="474" cy="204" r="12" stroke="#f22c59" strokeOpacity=".32"/>
            <circle className="feature-hero-node feature-hero-node-a" cx="213" cy="321" r="5" fill="#f22c59"/><circle className="feature-hero-node feature-hero-node-b" cx="474" cy="204" r="5" fill="#f22c59"/>
          </svg>
          <div className="feature-hero-endpoint feature-hero-endpoint-device"><span>01</span><b>Your device</b></div>
          <div className="feature-hero-endpoint feature-hero-endpoint-web"><span>02</span><b>Open internet</b></div>
          <div className="feature-hero-tunnel-label"><span /> Encrypted tunnel</div>
          <div className="feature-hero-visual-bottom"><span>Your traffic</span><i /><span>Encrypted</span><i /><span>Delivered</span></div>
        </div>
      </div>
    </header>

    <section className="feature-highlights" aria-labelledby="feature-highlights-title">
      <div className="feature-section-heading"><p className="blog-eyebrow"><span /> At a glance</p><h2 id="feature-highlights-title">What you get<br />with Traverse VPN</h2></div>
      <FeatureBento features={content.features.slice(0, 5).map((feature) => ({
        title: feature.title,
        description: feature.points[0] || feature.copy,
      }))} />
    </section>

    <section className="feature-stories" aria-label="Traverse VPN feature details">
      <div className="feature-stories-heading"><p className="blog-eyebrow"><span /> In detail</p><h2>Built for café WiFi,<br />airports and late nights</h2><div><h3>One app</h3><p>IP masking, encryption and leak protection in one place.</p></div></div>
      {content.features.map((feature, index) => <article className={`feature-story${index % 2 ? " feature-story-reverse" : ""}`} key={feature.number}>
        <div className="feature-story-media"><Image src={feature.image} alt={feature.alt} fill sizes="(max-width: 800px) 100vw, 50vw" /><span className="feature-story-image-label">{feature.imageLabel}</span><span className="feature-story-index">{feature.number} / 09</span></div>
        <div className="feature-story-copy"><p className="blog-eyebrow"><span /> {feature.tag}</p><h2>{feature.title}</h2><p className="feature-story-description">{feature.copy}</p><ul>{feature.points.map((point) => <li key={point}><span aria-hidden="true">↗</span>{point}</li>)}</ul></div>
      </article>)}
    </section>

    <section className="feature-safeguards" aria-labelledby="safeguards-title">
      <div className="feature-safeguards-heading"><p className="blog-eyebrow"><span /> The details</p><h2 id="safeguards-title">Protection, with<br />controls you set</h2><p>Traverse VPN Pro brings everyday connection protections and controls into one app.</p></div>
      <div className="feature-safeguard-grid">{content.safeguards.map((item, index) => <article className="feature-safeguard" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section className="feature-support">
      <div><p className="blog-eyebrow"><span /> Here when you need us</p><h2>Support when<br />you need it</h2></div>
      <div className="feature-support-copy"><p>If something doesn’t work the way you expect, Traverse VPN provides clear, in‑app and store‑listed support channels so you can get help with setup, billing, or troubleshooting. You don’t have to guess what’s wrong or fix complex issues alone.</p><ul><li>Access to help guides and support from inside the app</li><li>Assistance with configuration, connectivity, or account questions</li><li>A smoother path from “something’s wrong” to “back to protected”</li></ul></div>
      <a href="/support">Visit support <span aria-hidden="true">↗</span></a>
    </section>

    <section className="feature-summary"><div><p className="blog-eyebrow"><span /> One app, several layers</p><h2>Protect your internet<br />with Traverse VPN</h2></div><div className="feature-summary-list"><p>Bring everything together in one app:</p><ul><li>IP masking + strong, modern encryption</li><li>DNS and WebRTC leak protection, plus digital fingerprint defenses</li><li>Kill Switch, WiFi Protection, Auto-connect, and Split Tunneling</li><li>Unlimited bandwidth on high-speed, premium servers</li><li>A privacy-centric design with no premium data-sharing and chat that isn’t used for model training</li></ul><p>Your internet stays yours — whether you’re on your home router, campus WiFi, or that random café hotspot your friend picked.</p></div><a href="/downloads">Get Traverse VPN <span aria-hidden="true">↗</span></a></section>

    <SiteFooter />
  </section>;
}
