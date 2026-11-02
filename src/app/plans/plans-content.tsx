"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureSection } from "./core-features";
import fallback from "../../../content/plans/plans.json";

gsap.registerPlugin(ScrollTrigger);

type PlansPageData = typeof fallback;

function EditorialRails({ dark = false }: { dark?: boolean }) {
  return <div className={`plans-editorial-rails${dark ? " plans-editorial-rails-dark" : ""}`} aria-hidden="true">
    {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
  </div>;
}

export default function PlansContent({ content = fallback }: { content?: PlansPageData }) {
  const pageRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".plans-hero .blog-eyebrow, .plans-hero h1, .plans-hero > p, .plans-hero .plans-hero-subcopy", { autoAlpha: 0, y: 24, filter: "blur(7px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .85, stagger: .1, ease: "power3.out" });
      gsap.fromTo(".plan-card", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: .8, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: ".plans-grid", start: "top 82%", once: true } });
      [".plans-pricing", ".core-features-section", ".plans-addons", ".plans-enterprise", ".plans-testimonials", ".plans-faq", ".plans-final-cta"].forEach((selector) => {
        const section = page.querySelector(selector);
        const items = section?.querySelectorAll(".plans-reveal");
        if (!section || !items?.length) return;
        gsap.fromTo(items, { autoAlpha: 0, y: 22, filter: "blur(4px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .72, stagger: .07, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
      });
    }, page);
    return () => context.revert();
  }, []);

  const orderedPlans = [...content.plans];
  const featuredIndex = orderedPlans.findIndex((plan) => plan.popular);
  if (featuredIndex > 0) orderedPlans.splice(1, 0, orderedPlans.splice(featuredIndex, 1)[0]);

  return <section ref={pageRef} className="plans-page-content">
    <header className="plans-hero">
      <EditorialRails dark />
      <div className="plans-hero-grid">
        <p className="blog-eyebrow"><span /> TRAVERSE VPN <i>/</i> PLANS</p>
        <h1>Premium security.<br /><span>Unbeatable speeds.</span></h1>
        <p className="plans-hero-subcopy">Choose the best Traverse VPN plan. Get military-grade encryption, 10 global high-speed servers, split tunnelling, and a strict no-logs policy. No hidden fees.</p>
        <p className="plans-hero-note">Whether you need privacy for a month or year-round, we have a plan designed for you. No data caps, no ads—just pure, secure internet.</p>
        <a className="plans-hero-link" href="#plans">View plans <span aria-hidden="true">↓</span></a>
      </div>
      <span className="plans-hero-index" aria-hidden="true">01 / 07</span>
    </header>

    <section className="plans-pricing" id="plans" aria-labelledby="pricing-title">
      <EditorialRails />
      <div className="plans-pricing-inner">
        <div className="plans-pricing-aside plans-reveal">
          <p className="plans-section-label"><span>01</span><i /> CHOOSE YOUR COVERAGE</p>
          <p>Simple protection for every kind of trip, from a quick week away to year-round privacy.</p>
        </div>
        <div className="plans-pricing-heading plans-reveal">
          <h2 id="pricing-title">Packages<span>.</span></h2>
          <p>One secure connection, wherever life takes you.</p>
        </div>
        <div className="plans-grid">{orderedPlans.map((plan, index) => <article className={`plan-card${plan.popular ? " plan-card-popular" : ""}`} key={plan.name}>
          <div className="plan-card-topline"><span>{String(index + 1).padStart(3, "0")} <i /> TRAVERSE VPN</span>{plan.popular && <span className="plan-popular">POPULAR</span>}</div>
          <h3 className="plan-name">{plan.name}</h3>
          <p className="plan-summary">{plan.summary}</p>
          <div className="plan-price"><strong>{plan.price}</strong><span>{plan.interval}</span></div>
          {plan.savings && <p className="plan-savings">{plan.savings}</p>}
          <div className="plan-includes"><span>INCLUDED</span><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
          <a href="https://links.traversevpn.com/s/Ugp0lRJV">{plan.cta}<span aria-hidden="true">↗</span></a>
        </article>)}</div>
      </div>
    </section>

    <FeatureSection features={content.coreFeatures as Parameters<typeof FeatureSection>[0]["features"]} />

    <section className="plans-addons" aria-labelledby="addons-title">
      <EditorialRails />
      <div className="plans-addons-heading plans-reveal"><p className="blog-eyebrow"><span /> INCLUDED IN ALL PLANS</p><h2 id="addons-title">Protection<br />that travels.</h2><p>Every plan comes with the full Traverse safeguard suite.</p></div>
      <div className="addons-list">{content.addOns.map(({ title, description }, index) => <article className="addon plans-reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div><b aria-hidden="true">↗</b></article>)}</div>
    </section>

    <section className="plans-enterprise" aria-labelledby="plans-enterprise-title">
      <EditorialRails dark />
      <div className="plans-enterprise-copy plans-reveal"><p className="blog-eyebrow"><span /> FOR TEAMS</p><h2 id="plans-enterprise-title">Security<br />at every scale.</h2><p>Traverse VPN for your whole organization.</p></div>
      <div className="enterprise-list plans-reveal"><p>Dedicated IP Addresses available for your team.</p><p>Centralized Admin Dashboard for easy account management.</p><p>Custom Deployments across our 10 global server locations.</p><p>Priority 24/7 Technical Support.</p><a href="https://traversevpn.com/contact-us">Contact Sales <span aria-hidden="true">↗</span></a></div>
    </section>

    <section className="plans-testimonials" aria-labelledby="testimonials-title">
      <EditorialRails />
      <div className="plans-testimonials-heading plans-reveal"><p className="blog-eyebrow"><span /> TESTIMONIALS</p><h2 id="testimonials-title">Trusted on<br />the move.</h2></div>
      <div className="plans-testimonial-grid">{content.testimonials.map(({ quote, author }, index) => <article className="plans-testimonial plans-reveal" key={author}><span className="plans-quote-index">0{index + 1} /</span><p>“{quote}”</p><small>{author}</small></article>)}</div>
    </section>

    <section className="plans-faq" aria-labelledby="plans-faq-title">
      <EditorialRails />
      <div className="plans-faq-heading plans-reveal"><p className="blog-eyebrow"><span /> YOUR QUESTIONS, COVERED</p><h2 id="plans-faq-title">Good to<br />know.</h2></div>
      <div className="plans-faq-list">{content.faqItems.map(({ question, answer }, index) => <div className={`plans-faq-item plans-reveal${openFaq === index ? " open" : ""}`} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><i aria-hidden="true">+</i></button>{openFaq === index && <p>{answer}</p>}</div>)}</div>
    </section>

    <section className="plans-final-cta">
      <EditorialRails dark />
      <div className="plans-final-inner"><p className="blog-eyebrow plans-reveal"><span /> READY TO CONNECT?</p><h2 className="plans-reveal">Take back your<br /><span>online privacy.</span></h2><p className="plans-reveal">Join thousands of secure users today.</p><a className="plans-reveal" href="https://links.traversevpn.com/s/Ugp0lRJV">Download Traverse VPN <span aria-hidden="true">↗</span></a></div>
    </section>
    <footer className="plans-footer"><a href="/#home" className="feature-footer-brand"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><span>Take control of your digital identity.</span><a href="https://links.traversevpn.com/s/Ugp0lRJV">Get protected <span aria-hidden="true">↗</span></a></footer>
  </section>;
}
