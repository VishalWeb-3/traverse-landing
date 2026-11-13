"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fallback from "../../../content/plans/plans.json";
import SiteFooter from "../site-footer";
import "./plans.css";

gsap.registerPlugin(ScrollTrigger);

type PlansPageData = typeof fallback;
type Plan = PlansPageData["plans"][number];
type PlanKind = "weekly" | "monthly" | "yearly";

const CHECKOUT_URL = "https://links.traversevpn.com/s/Ugp0lRJV";

// How many times each plan bills over the chosen stretch. The yearly plan is always one upfront payment.
const DURATIONS = [
  { label: "1 week", weeks: 1, months: 1 },
  { label: "2 weeks", weeks: 2, months: 1 },
  { label: "3 weeks", weeks: 3, months: 1 },
  { label: "1 month", weeks: 4, months: 1 },
  { label: "2 months", weeks: 9, months: 2 },
  { label: "3 months", weeks: 13, months: 3 },
  { label: "6 months", weeks: 26, months: 6 },
  { label: "9 months", weeks: 39, months: 9 },
  { label: "1 year", weeks: 52, months: 12 },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function planKind(plan: Plan): PlanKind {
  const name = plan.name.toLowerCase();
  if (/year|annual/.test(name)) return "yearly";
  if (/week/.test(`${name} ${plan.interval.toLowerCase()}`)) return "weekly";
  return "monthly";
}

function planTotal(plan: Plan, duration: (typeof DURATIONS)[number]) {
  const amount = Number.parseFloat(plan.price.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(amount)) return null;
  const kind = planKind(plan);
  if (kind === "weekly") return amount * duration.weeks;
  if (kind === "monthly") return amount * duration.months;
  return amount * 12;
}

const money = (value: number) => `$${value.toFixed(2)}`;

function PricingTable({ plans }: { plans: Plan[] }) {
  const sliderId = useId();
  const tableRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const outputRef = useRef<HTMLOutputElement>(null);
  const totalRefs = useRef<(HTMLElement | null)[]>([]);
  const shownTotals = useRef<{ value: number }[]>([]);
  const mounted = useRef(false);
  const [live, setLive] = useState(false);
  const [step, setStep] = useState(DURATIONS.length - 1);

  const duration = DURATIONS[step];
  const totals = plans.map((plan) => planTotal(plan, duration));
  const comparable = totals.every((total): total is number => total !== null);
  const lowest = comparable ? Math.min(...(totals as number[])) : null;
  const bestIndex = comparable ? totals.findIndex((total) => total === lowest) : plans.findIndex((plan) => plan.popular);

  // One pink block sits behind the cheapest plan and travels to the next one when the answer changes.
  const placeHighlight = (animate: boolean) => {
    const table = tableRef.current;
    const highlight = highlightRef.current;
    const plan = table?.querySelector<HTMLElement>('.pl-plan[data-best="true"]');
    if (!highlight || !plan) return;
    const box = { x: plan.offsetLeft, y: plan.offsetTop, width: plan.offsetWidth, height: plan.offsetHeight };
    if (animate && !prefersReducedMotion()) gsap.to(highlight, { ...box, duration: .6, ease: "expo.out", overwrite: true });
    else { gsap.killTweensOf(highlight); gsap.set(highlight, box); }
  };

  useEffect(() => {
    placeHighlight(mounted.current);
    setLive(true);
  }, [bestIndex]);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    const observer = new ResizeObserver(() => placeHighlight(gsap.isTweening(highlightRef.current)));
    observer.observe(table);
    table.querySelectorAll(".pl-plan").forEach((plan) => observer.observe(plan));
    return () => observer.disconnect();
  }, []);

  // Totals count to their new value instead of swapping.
  useEffect(() => {
    totals.forEach((total, index) => {
      const element = totalRefs.current[index];
      if (!element || total === null) return;
      const shown = shownTotals.current[index] ??= { value: total };
      if (!mounted.current || prefersReducedMotion()) {
        gsap.killTweensOf(shown);
        shown.value = total;
        element.textContent = money(total);
        return;
      }
      gsap.to(shown, { value: total, duration: .5, ease: "expo.out", overwrite: true, onUpdate: () => { element.textContent = money(shown.value); } });
    });
    if (mounted.current && outputRef.current && !prefersReducedMotion()) gsap.fromTo(outputRef.current, { yPercent: 35, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .3, ease: "expo.out", overwrite: true });
    mounted.current = true;
  }, [step]);

  return <section className="pl-pricing" id="plans" aria-labelledby="pl-pricing-title">
    <div className="pl-wrap">
      <div className="pl-pricing-head">
        <h2 id="pl-pricing-title" className="pl-h">How long do you need it?</h2>
        {comparable && <div className="pl-duration">
          <label htmlFor={sliderId}>Slide to your trip length. The cheapest plan steps forward.</label>
          <output ref={outputRef} htmlFor={sliderId}>{duration.label}</output>
          <input id={sliderId} type="range" min={0} max={DURATIONS.length - 1} step={1} value={step} aria-valuetext={duration.label} onChange={(event) => setStep(Number(event.target.value))} />
          <div className="pl-duration-ends" aria-hidden="true"><span>{DURATIONS[0].label}</span><span>{DURATIONS[DURATIONS.length - 1].label}</span></div>
        </div>}
      </div>

      <div ref={tableRef} className={`pl-table${comparable ? "" : " pl-table-short"}${live ? " pl-table-live" : ""}`}>
        <span ref={highlightRef} className="pl-highlight" aria-hidden="true" />
        <div className="pl-labels" aria-hidden="true">
          <div className="pl-cell" />
          <div className="pl-cell">Billing</div>
          {comparable && <div className="pl-cell">Total for {duration.label}</div>}
          <div className="pl-cell" />
        </div>
        {plans.map((plan, index) => {
          const total = totals[index];
          const isBest = index === bestIndex;
          const billing = plan.features.find((feature) => /^bill/i.test(feature)) ?? plan.summary;
          return <article className="pl-plan" data-best={isBest} key={plan.name}>
            <div className="pl-cell pl-cell-head">
              <h3>{plan.name}</h3>
              <p className="pl-price"><strong>{plan.price}</strong> <span>{plan.interval}</span></p>
            </div>
            <div className="pl-cell"><span className="pl-cell-label">Billing</span><p>{billing}</p></div>
            {comparable && total !== null && lowest !== null && <div className="pl-cell">
              <span className="pl-cell-label">Total for {duration.label}</span>
              <p className="pl-total"><strong ref={(element) => { totalRefs.current[index] = element; }}>{money(total)}</strong> <span>{isBest ? "Lowest total" : `${money(total - lowest)} more`}</span></p>
            </div>}
            <div className="pl-cell pl-cell-cta"><a className="pl-button" href={CHECKOUT_URL}>{plan.cta}</a></div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}

function PricingQuestions({ items }: { items: PlansPageData["faqItems"] }) {
  // Native <details> keeps every answer reachable without script; GSAP only eases the open and close.
  const toggle = (event: React.MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.parentElement as HTMLDetailsElement;
    const body = details.querySelector<HTMLElement>(".pl-faq-body");
    const mark = details.querySelector<HTMLElement>(".pl-faq-mark");
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

  return <section className="pl-faq" aria-labelledby="pl-faq-title">
    <div className="pl-wrap pl-faq-grid">
      <h2 id="pl-faq-title" className="pl-h">Good to know.</h2>
      <div className="pl-faq-list">{items.map(({ question, answer }) => <details className="pl-faq-row" key={question}>
        <summary onClick={toggle}><span>{question}</span><i className="pl-faq-mark" aria-hidden="true" /></summary>
        <div className="pl-faq-body"><p>{answer}</p></div>
      </details>)}</div>
    </div>
  </section>;
}

export default function PlansContent({ content = fallback }: { content?: PlansPageData }) {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || prefersReducedMotion()) return;
    const context = gsap.context(() => {
      // The page's one authored entrance: the word rises out of the fold it is cropped by.
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".pl-hero-word", { yPercent: 60, duration: 1 })
        .from(".pl-hero-copy > *", { y: 18, autoAlpha: 0, duration: .7, stagger: .08 }, .15);
      gsap.to(".pl-hero-word span", { scale: 1.14, ease: "none", scrollTrigger: { trigger: ".pl-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.from(".pl-table", { y: 32, autoAlpha: 0, duration: .7, ease: "expo.out", scrollTrigger: { trigger: ".pl-table", start: "top 85%", once: true } });
    }, page);
    return () => context.revert();
  }, []);

  const orderedPlans = [...content.plans];
  const featuredIndex = orderedPlans.findIndex((plan) => plan.popular);
  if (featuredIndex > 0) orderedPlans.splice(1, 0, orderedPlans.splice(featuredIndex, 1)[0]);

  return <section ref={pageRef} className="pl-page">
    <header className="pl-hero">
      <div className="pl-wrap pl-hero-copy">
        <p>From {content.plans[0]?.price} a week. Every plan includes every feature.</p>
        <a className="pl-button pl-button-accent" href="#plans">Choose a plan</a>
      </div>
      <h1 className="pl-hero-word"><span>Plans</span></h1>
    </header>

    <PricingTable plans={orderedPlans} />
    <PricingQuestions items={content.faqItems} />
    <SiteFooter />
  </section>;
}
