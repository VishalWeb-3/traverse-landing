"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTina } from "tinacms/dist/react";
import { resolveTinaImageUrls } from "./tina-image-url";
import type { HomepageQuery, HomepageQueryVariables } from "../../tina/__generated__/types";
import defaultHomepage from "../../content/pages/home.json";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "./site-header";
import GlobeStudy from "./globe-study";
import SiteFooter from "./site-footer";

gsap.registerPlugin(ScrollTrigger);

type HomePageContent = typeof defaultHomepage;

function GridLines() {
  return <div className="grid-lines" aria-hidden="true"><i/><i/><i/></div>;
}

function Plus() { return <span className="plus" aria-hidden="true">+</span>; }

function resolveCtaHref(label: string, href: string) {
  const purchaseAction = /\b(buy|purchase|subscribe|checkout)\b/i.test(label);
  if (!purchaseAction && href.startsWith("https://links.traversevpn.com/")) return "/download";
  return href;
}

function ScrollRevealWords({ text }: { text: string }) {
  return <>{text.split(/(\s+)/).map((part, index) => part.trim()
    ? <span className="about-reveal-word" key={index}>{part}</span>
    : part)}</>;
}

function JourneySection({ journey }: { journey: HomePageContent["journey"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState("316px");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const mobile = window.matchMedia("(max-width: 900px)").matches;
        if (mobile) {
          const steps = [...section.querySelectorAll<HTMLElement>(".journey-step")];
          const center = window.innerHeight * .46;
          let nearest = 0;
          let distance = Number.POSITIVE_INFINITY;
          steps.forEach((step,index) => {
            const rect = step.getBoundingClientRect();
            const nextDistance = Math.abs(rect.top + Math.min(rect.height,260) / 2 - center);
            if (nextDistance < distance) { nearest=index; distance=nextDistance; }
          });
          setActiveStep(nearest);
          setProgress(`${nearest / (journey.steps.length - 1) * 100}%`);
          return;
        }
        const sectionTop = section.getBoundingClientRect().top;
        const distanceFromStart = window.innerHeight * .47 - (sectionTop + 150);
        setActiveStep(Math.max(0,Math.min(journey.steps.length - 1,Math.floor(distanceFromStart / 316))));
        setProgress(`${Math.max(0,Math.min(316 * (journey.steps.length - 1),distanceFromStart + 43))}px`);
      });
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll",update); window.removeEventListener("resize",update); };
  }, []);
  return <section className="journey-section section" id="journey" ref={sectionRef}>
    <GridLines/><div className="journey-grid">
      <div className="journey-left"><div className="journey-intro"><h2>{journey.heading.split("\n").map((line,index)=><span key={line}>{index>0&&<br/>}{line}</span>)}</h2><p>{journey.intro}</p></div><div className="journey-quote"><div className="journey-quote-mark" aria-hidden="true">“</div><blockquote>{journey.quote}</blockquote></div></div>
      <div className="journey-visual" aria-hidden="true"><div className="journey-image-frame">{journey.steps.map((step,index)=><img loading="lazy" decoding="async" key={step.year} className={activeStep===index?"active":""} src={step.image} alt=""/>)}</div></div>
      <div className="journey-timeline" style={{"--journey-progress":progress} as CSSProperties}><ol>{journey.steps.map((step,index)=><li className={`journey-step${activeStep===index?" active":""}`} key={step.year}><span className="journey-node" aria-hidden="true"/><img loading="lazy" decoding="async" className="journey-mobile-image" src={step.image} alt=""/><span className="journey-year">{step.year}</span><h3>{step.title.split("\n").map((line,lineIndex)=><span key={line}>{lineIndex>0&&<br/>}{line}</span>)}</h3><p>{step.description}</p></li>)}</ol></div>
    </div>
  </section>;
}

function ProjectStories({ testimonials }: { testimonials: HomePageContent["testimonials"] }) {
  return <section className="project-stories section" id="stories"><GridLines/><div className="stories-inner"><div className="stories-heading"><h2>{testimonials.headingLine1} {testimonials.headingLine2}</h2></div>
    <div className="story-cards">{testimonials.items.map((story,index)=><article className={`story-card testimonial-${story.accent}`} key={`${story.accent}-${index}`}><span className="testimonial-mark" aria-hidden="true">“</span><blockquote>{story.quote.replace(/^@\s*/, "")}</blockquote></article>)}</div>
  </div></section>;
}

function FeatureBenefits({ benefits }: { benefits: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const explanations = [
    "Your traffic is encrypted between your device and the VPN server while you are connected.",
    "Add an encrypted connection on café, airport, hotel, and other shared Wi-Fi networks.",
    "Choose from available server locations and switch routes as your day or destination changes.",
  ];
  return <ul className="home-feature-benefits">{benefits.map((benefit, index) => <li key={benefit} className={active === index ? "is-open" : ""}>
    <span aria-hidden="true">✓</span><div><button type="button" aria-expanded={active === index} onClick={() => setActive(active === index ? null : index)}>{benefit}<i aria-hidden="true">{active === index ? "−" : "+"}</i></button><div className="home-benefit-detail" aria-hidden={active !== index}><p>{explanations[index] ?? "Explore the available settings and safeguards in the Traverse VPN app."}</p></div></div>
  </li>)}</ul>;
}

type FaqItem = HomePageContent["faq"]["items"][number];

function ProjectAnswerItem({ item, index, open, onToggle }: { item: FaqItem; index: number; open: boolean; onToggle: () => void }) {
  const panelId = `answer-panel-${index + 1}`;

  return <article className="answer-item" data-open={open}>
    <button className="answer-trigger" type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
      <span className="answer-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="answer-question">{item.question}</span>
      <i aria-hidden="true"/>
    </button>
    <div className={`answer-panel${open ? " is-open" : ""}`} id={panelId} aria-hidden={!open}>
      <div><p>{item.answer}</p></div>
    </div>
  </article>;
}

function ProjectAnswers({ faq }: { faq: HomePageContent["faq"] }) {
  const [openIndex, setOpenIndex] = useState(0);
  return <section className="project-answers section" id="faqs"><GridLines/><div className="answers-layout"><div className="answers-aside"><h2>{faq.headingLine1}<br/>{faq.headingLine2}</h2><p>{faq.intro}</p><div className="answers-contact"><span>MORE ABOUT TRAVERSE?</span><a href="/about-us">Visit Traverse VPN <b aria-hidden="true">↗</b></a></div></div><div className="answers-list">{faq.items.map((item,index)=><ProjectAnswerItem item={item} index={index} open={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? -1 : index)} key={item.question}/>)}</div></div></section>;
}

function HomePage({ content }: { content: HomePageContent }) {
  const [annualBilling, setAnnualBilling] = useState(false);
  const pricingHeading = content.pricing.heading === "Packages"
    ? ["Predictable pricing.", "Protection that travels."]
    : content.pricing.heading.split("\n");
  const maxAnnualSavings = Math.round(content.pricing.plans.reduce((maximum, plan) => {
    const monthly = Number(plan.monthly);
    const annual = Number(plan.annual);
    return monthly > 0 ? Math.max(maximum, ((monthly - annual) / monthly) * 100) : maximum;
  }, 0));
  const mainRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    const section = aboutRef.current;
    const main = mainRef.current;
    if (!section || !main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    main.classList.add("gsap-about-motion-ready");
    const context = gsap.context(() => {
      const headingWords = section.querySelectorAll<HTMLElement>(".about-heading h2 .about-reveal-word");

      if (headingWords.length) gsap.to(headingWords, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45,
        stagger: { each: 0.14 }, ease: "none",
        scrollTrigger: {
          trigger: section.querySelector(".about-heading h2"),
          start: "top 85%", end: "bottom 38%", scrub: 0.5, invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => { context.revert(); main.classList.remove("gsap-about-motion-ready"); };
  }, []);
  useEffect(() => {
    const main = mainRef.current;
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const header = main.querySelector(".site-header");
      if (header) gsap.fromTo(header.querySelectorAll(".brand, .desktop-nav a, .header-cta, .menu-button"),
        { autoAlpha: 0, y: -14 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power2.out", delay: 0.1 });
      const hero = main.querySelector(".hero-reference");
      if (hero) {
        const intro = hero.querySelectorAll(".ref-copy h1, .ref-copy > p, .ref-actions > *");
        gsap.fromTo(intro, { autoAlpha: 0, y: 26, filter: "blur(8px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.05,
          stagger: { each: 0.09, from: "start" }, ease: "power3.out", delay: 0.15,
        });
        gsap.fromTo(hero.querySelector(".hero-globe"), { autoAlpha: 0, y: 54, xPercent: -50, scale: 0.94 }, {
          autoAlpha: 1, y: 0, xPercent: -50, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.25,
        });
      }

      const about = main.querySelector(".about");
      if (about) {
        gsap.fromTo(about.querySelectorAll<HTMLElement>(".about-left, .about-right"), { autoAlpha: 0, filter: "blur(8px)" }, {
          autoAlpha: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.16, ease: "power2.out",
          scrollTrigger: { trigger: about, start: "top 72%", once: true },
        });
      }

      const services = main.querySelector(".services");
      if (services) {
        const asideItems = services.querySelectorAll<HTMLElement>(".services-intro h2 span, .services-intro p");
        gsap.fromTo(asideItems, { autoAlpha: 0, y: 28, filter: "blur(6px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85,
          stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: services, start: "top 72%", once: true },
        });
        services.querySelectorAll<HTMLElement>(".service").forEach((service) => {
          const items = service.querySelectorAll<HTMLElement>(".service-head > span, .service-head h3, .service-images img, .service-body > div:first-child, .service-body .tags");
          gsap.fromTo(items, { autoAlpha: 0, y: 24, filter: "blur(5px)", scale: 0.985 }, {
            autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.8,
            stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: service, start: "top 78%", once: true },
          });
        });
      }

      const reveals = [
        [".features", ".features-intro p, .features-heading > h2, .feature-copy-bottom > *, .feature-visual > *, .feature-expertise > *, .feature-bottom-cards > *"],
        [".n-pricing", ".n-pricing-heading > *, .n-billing-control, .n-plan-card"],
        [".journey-section", ".journey-intro > *, .journey-quote > *, .journey-visual, .journey-step"],
        [".project-stories", ".stories-heading h2, .story-card"],
        [".visuvate-footer", ".visuvate-footer-top > *, .visuvate-social-grid > *, .visuvate-footer-group > *, .visuvate-copyright"],
      ];

      reveals.forEach(([sectionSelector, itemSelector]) => {
        const section = main.querySelector(sectionSelector);
        const items = section?.querySelectorAll<HTMLElement>(itemSelector);
        if (!section || !items?.length) return;
        gsap.fromTo(items, { autoAlpha: 0, y: 30, filter: "blur(5px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85,
          stagger: { each: 0.1, from: "start" }, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      });

      const faqs = main.querySelector<HTMLElement>(".project-answers");
      if (faqs) {
        const intro = faqs.querySelectorAll<HTMLElement>(".answers-aside h2, .answers-aside > p, .answers-contact > *");
        const rows = faqs.querySelectorAll<HTMLElement>(".answer-item");
        gsap.fromTo(intro, { autoAlpha: 0, y: 24, filter: "blur(5px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8,
          stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: faqs, start: "top 78%", once: true },
        });
        gsap.fromTo(rows, { autoAlpha: 0, y: 26, filter: "blur(5px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85,
          stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: faqs, start: "top 72%", once: true },
        });
      }
    }, main);

    return () => context.revert();
  }, []);
  useEffect(() => {
    const main=mainRef.current, about=aboutRef.current;
    if(!main||!about)return;
    let frame=0;
    const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateParallax=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(reducedMotion.matches)return;const rect=about.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight+rect.height)));const centered=progress-.46;const mobile=window.matchMedia("(max-width: 900px)").matches;about.querySelector<HTMLElement>(".about-left")?.style.setProperty("--about-parallax-y",`${-centered*(mobile?30:175)}px`);about.querySelector<HTMLElement>(".about-right")?.style.setProperty("--about-parallax-y",`${-centered*(mobile?60:500)}px`)});};
    updateParallax();window.addEventListener("scroll",updateParallax,{passive:true});window.addEventListener("resize",updateParallax);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",updateParallax);window.removeEventListener("resize",updateParallax)};
  },[]);
  useEffect(() => {
    const hero=document.querySelector(".hero-reference");
    if(!hero)return;
    const observer=new IntersectionObserver(([entry])=>document.body.classList.toggle("hero-in-view",entry.isIntersecting),{threshold:.01});
    observer.observe(hero);
    return()=>{observer.disconnect();document.body.classList.remove("hero-in-view")};
  },[]);
  useEffect(() => {
    const main = mainRef.current;
    const pricing = main?.querySelector<HTMLElement>(".n-pricing");
    const header = main?.querySelector<HTMLElement>(".site-header");
    if (!pricing || !header) return;
    const syncPricingHeader = () => {
      const bounds = pricing.getBoundingClientRect();
      const headerBottom = header.getBoundingClientRect().bottom;
      header.classList.toggle("pricing-in-view", bounds.top <= headerBottom && bounds.bottom > headerBottom);
    };
    syncPricingHeader();
    window.addEventListener("scroll", syncPricingHeader, { passive: true });
    window.addEventListener("resize", syncPricingHeader);
    return () => {
      window.removeEventListener("scroll", syncPricingHeader);
      window.removeEventListener("resize", syncPricingHeader);
      header.classList.remove("pricing-in-view");
    };
  }, []);
  return <main ref={mainRef}>
    <SiteHeader />
    <section className="hero hero-reference" id="home">
      <div className="hero-globe" aria-hidden="true"><GlobeStudy baseColor="#F22C59" style={{ width: "100%", height: "100%" }} /></div>
      <div className="ref-copy">
        <h1>{content.hero.headlineLine1}<br/>on any <mark>{content.hero.headlineLine2}</mark></h1>
        <p>{content.hero.description}</p>
        <div className="ref-actions"><a className="ref-button ref-button-primary" href={resolveCtaHref(content.hero.primaryCta.label, content.hero.primaryCta.href)}>{content.hero.primaryCta.label} <span aria-hidden="true">↗</span></a><a className="ref-button ref-button-secondary" href={content.hero.secondaryCta.href}>{content.hero.secondaryCta.label} <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
    <section className="about section" id="about" ref={aboutRef}>
      <GridLines/>
      <div className="about-images"><img loading="lazy" decoding="async" className="about-left" src="/images/vpn/photos/airport-work.webp" alt="Traveler working on a laptop at the airport"/><img loading="lazy" decoding="async" className="about-right" src="/images/vpn/photos/city-phone.webp" alt="Traveler using a phone in the city at night"/></div>
      <div className="about-heading">

        <h2><ScrollRevealWords text={content.about.headingLine1}/><br className="desktop-break"/> <ScrollRevealWords text={content.about.headingLine2}/><br className="desktop-break"/> <ScrollRevealWords text={content.about.headingLine3}/></h2>
      </div>
      <div className="about-quote"><p>{content.about.copy}</p></div>
    </section>

    <section className="services section" id="services" ref={servicesRef}>
      <GridLines/>
      <aside className="services-aside"><div className="services-intro"><h2>{content.servicesSection.heading.split(" ").map((part,index)=><span key={part}>{index>0&&<br/>}{part}</span>)}</h2><p>{content.servicesSection.intro}</p></div></aside>
      <div className="service-list">{content.servicesSection.items.map((service) => <article className="service" key={service.number}>
        <div className="service-head"><span>{service.number}</span><h3>{service.title}</h3></div>
        <div className="service-images">{service.images.map((image) => <img loading="lazy" decoding="async" key={image.src} src={image.src} alt={image.alt}/>)}</div>
        <div className="service-body"><div><p>{service.description}</p><div className="service-price">STARTING FROM <b>{service.price}</b></div></div><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </article>)}</div>
    </section>

    <JourneySection journey={content.journey} />

    <section className="features section" id="how-we-work">
      <GridLines />
      <div className="features-heading">
        <div className="features-intro"><p>{content.features.intro}</p></div>
        <h2>{content.features.heading}</h2>
      </div>
      <div className="features-cards">
        <article className="feature-copy">
          <div className="feature-copy-bottom"><h3>{content.features.privacyHeading}</h3><p>{content.features.privacyCopy}</p><FeatureBenefits benefits={content.features.benefits}/><nav className="feature-policy-links" aria-label="Privacy and security information"><a href="/no-logs-policy">Read No Logs Policy <span aria-hidden="true">↗</span></a><a href="/security-standards">View Security Standards <span aria-hidden="true">↗</span></a></nav></div>
        </article>
        <article className="feature-visual" aria-label="Traverse VPN privacy features"><img loading="lazy" decoding="async" className="feature-phone" src="/images/vpn/photos/cafe-phone.webp" alt="Phone in use in a public indoor space"/>
          <div className="metric metric-retention"><span className="metric-icon red"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 19v-1a6 6 0 0 1 12 0v1zM16 5a3 3 0 0 1 0 6M18 14a4 4 0 0 1 3 4v1h-3"/></svg></span><span><b>{content.features.usersMetric}</b><small>{content.features.usersLabel}</small></span></div>
          <div className="metric metric-response"><span className="metric-icon dark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg></span><span><b>{content.features.serversMetric} <i></i></b><small>{content.features.serversLabel}</small></span></div>
          <div className="metric metric-conversion"><span className="metric-icon black"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 3 7-8M14 6h6v6"/></svg></span><span><b>{content.features.encryptionMetric}</b><small>{content.features.encryptionLabel}</small></span></div>
        </article>
        <article className="feature-expertise"><div className="expertise-top"><b>[ PRIVACY ]</b></div><div className="expertise-copy"><strong>50+</strong><span>Fast<br/>Server<br/>Locations</span></div></article>
      </div>
      <div className="feature-bottom-cards">
        {content.features.cards.map((card,index)=><article className={`bottom-feature ${index===0?"simplicity-card":index===1?"growth-card":"execution-card"}`} key={card.title}>
          {index===1&&<header><h3>{card.title}</h3></header>}
          <img loading="lazy" decoding="async" className="bottom-feature-art" src={card.image} alt={card.alt}/>
          {index===1?<div className="growth-stat"><span>↗ &nbsp; GLOBAL NETWORK</span><strong>50+</strong><p>{card.copy}</p></div>:<div className={index===0?"simplicity-copy":"execution-copy"}><div className="bottom-feature-copy"><h4>{card.title}</h4><p>{card.copy}</p></div></div>}
        </article>)}
      </div>
    </section>

    <ProjectStories testimonials={content.testimonials} />

    <section className="pricing section n-pricing" id="pricing">
      <GridLines />
      <div className="n-pricing-inner">
        <div className="n-pricing-heading"><h2>{pricingHeading.map((line, index) => <span className={index === 1 ? "n-pricing-heading-muted" : ""} key={`${line}-${index}`}>{line}</span>)}</h2><p>Simple, reliable protection for wherever you connect. Choose the billing option that works for you.</p></div>
        <div className="n-pricing-toolbar"><div className={`n-billing-control${annualBilling ? " annual" : ""}`} role="group" aria-label="Billing period"><div className="n-billing-tabs"><span className="n-billing-indicator" aria-hidden="true"/><button type="button" className={!annualBilling ? "active" : ""} aria-pressed={!annualBilling} onClick={() => setAnnualBilling(false)}>Monthly</button><button type="button" className={annualBilling ? "active" : ""} aria-pressed={annualBilling} onClick={() => setAnnualBilling(true)}>Annually</button></div><span className="n-billing-savings">SAVE UP TO {maxAnnualSavings}%</span></div></div>
        <div className={`n-plan-grid${annualBilling ? " annual-selection" : " monthly-selection"}`}>{content.pricing.plans.filter(plan => annualBilling ? plan.name === "Yearly" : plan.name !== "Yearly").map((plan, index) => {
          const isAnnualPlan = plan.name === "Yearly";
          const price = annualBilling ? (Number(plan.annual) * 12).toFixed(2) : plan.monthly;
          const interval = annualBilling ? "year" : plan.interval;
          const annualSavings = Math.max(0, (Number(plan.monthly) - Number(plan.annual)) * 12);
          return <article className={`n-plan-card${index === 1 || isAnnualPlan ? " n-plan-card-featured" : ""}`} key={plan.name}>
            <div className="n-plan-main">
              <div className="n-plan-kicker"><span>00{index + 1}. /</span><span>PRIVATE CONNECTION</span></div>
              <div className="n-plan-title-row"><h3>{isAnnualPlan ? "Annual" : plan.name} Plan</h3>{isAnnualPlan ? <span className="n-popular">Best value</span> : index === 1 && <span className="n-popular">Popular</span>}</div>
              <p className="n-plan-description">{plan.audience}.</p>
              <div className="n-plan-price"><span>$</span><strong>{price}</strong><small>/{interval}{annualBilling ? ", billed upfront" : ""}</small></div>
            </div>
            <div className="n-plan-details"><span className="n-list-label">What's included</span><ul>{plan.features.slice(0, 4).map(feature => <li key={feature}>{feature}</li>)}</ul><span className="n-list-label n-extras-label">Extras</span><ul>{plan.features.slice(4).map(feature => <li key={feature}>{feature}</li>)}</ul></div>
            <div className="n-plan-footer"><a href="https://links.traversevpn.com/s/Ugp0lRJV">Buy plan <span aria-hidden="true">↗</span></a><p className={`n-plan-savings${annualSavings ? " has-savings" : ""}`}>{annualSavings ? <><strong>Save ${annualSavings.toFixed(2)}/year</strong><span>with annual billing</span></> : <span>No annual savings on this plan</span>}</p></div>
          </article>;
        })}</div>
      </div>
    </section>

    <ProjectAnswers faq={content.faq} />
    <SiteFooter copy={content.footer} />
  </main>;
}

export default function HomeContent(props: { query: string; variables: HomepageQueryVariables; data: HomepageQuery }) {
  const { data } = useTina<HomepageQuery>(props);
  return <HomePage content={resolveTinaImageUrls(data.homepage) as HomePageContent} />;
}

export function StaticHomeContent({ content }: { content: HomePageContent }) {
  return <HomePage content={content} />;
}
