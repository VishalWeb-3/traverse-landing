"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import fallback from "../../../content/plans/plans.json";
import SiteFooter from "../site-footer";
import { useGetAppHref } from "../../lib/get-app-link";
import KitMotion from "../kit/kit-motion";
import Accordion from "../kit/kit-accordion";
import { Band, Hero, Split, VisitTraverse } from "../kit/kit";

type PlansPageData = typeof fallback;
type Plan = PlansPageData["plans"][number];
type PlanKind = "weekly" | "monthly" | "yearly";

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

function GridLines() {
  return <div className="grid-lines" aria-hidden="true"><i /><i /><i /></div>;
}

/** The homepage pricing section (same markup and styles), with the plans page's trip-length slider. */
function PricingTable({ plans }: { plans: Plan[] }) {
  // Like the original plans page: Play Store on Android, App Store on iOS, smart link elsewhere.
  const checkoutHref = useGetAppHref();
  const sliderId = useId();
  const outputRef = useRef<HTMLOutputElement>(null);
  const totalRefs = useRef<(HTMLElement | null)[]>([]);
  const shownTotals = useRef<{ value: number }[]>([]);
  const mounted = useRef(false);
  const [step, setStep] = useState(DURATIONS.length - 1);

  const duration = DURATIONS[step];
  const totals = plans.map((plan) => planTotal(plan, duration));
  const comparable = totals.every((total): total is number => total !== null);
  const lowest = comparable ? Math.min(...(totals as number[])) : null;
  const bestIndex = comparable ? totals.findIndex((total) => total === lowest) : plans.findIndex((plan) => plan.popular);

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

  return <section className="pricing section n-pricing" id="plans" aria-labelledby="plans-title" data-kit-reveal>
    <GridLines />
    <div className="n-pricing-inner">
      <div className="n-pricing-heading">
        <h2 id="plans-title"><span>How long do</span><span>you need it?</span></h2>
        <p>Every plan includes every feature. Slide to your trip length and the cheapest plan steps forward.</p>
        {comparable && <div className="kit-duration">
          <label htmlFor={sliderId}>Trip length</label>
          <output ref={outputRef} htmlFor={sliderId}>{duration.label}</output>
          <input id={sliderId} type="range" min={0} max={DURATIONS.length - 1} step={1} value={step} aria-valuetext={duration.label} onChange={(event) => setStep(Number(event.target.value))} />
          <div className="kit-duration-ends" aria-hidden="true"><span>{DURATIONS[0].label}</span><span>{DURATIONS[DURATIONS.length - 1].label}</span></div>
        </div>}
      </div>
      <div className="n-plan-grid">{plans.map((plan, index) => {
        const total = totals[index];
        const isBest = index === bestIndex;
        const [whole, cents] = plan.price.replace(/^\$/, "").split(".");
        return <article className={`n-plan-card${isBest ? " n-plan-card-featured" : ""}`} key={plan.name}>
          <div className="n-plan-main">
            <div className="n-plan-kicker"><span>00{index + 1}. /</span><span>PRIVATE CONNECTION</span></div>
            <div className="n-plan-title-row"><h3>{plan.name}</h3>{isBest && <span className="n-popular">{comparable ? "Lowest total" : "Best value"}</span>}</div>
            <p className="n-plan-description">{plan.summary}.</p>
            <div className="n-plan-price"><span>$</span><strong>{whole}{cents ? `.${cents}` : ""}</strong><small>{plan.interval}</small></div>
          </div>
          <div className="n-plan-details">
            <span className="n-list-label">What&apos;s included</span>
            <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            {comparable && total !== null && lowest !== null && <>
              <span className="n-list-label n-extras-label">Total for {duration.label}</span>
              <ul><li><strong ref={(element) => { totalRefs.current[index] = element; }}>{money(total)}</strong> &nbsp;<span className="kit-plan-diff">{isBest ? "Lowest total" : `${money(total - lowest)} more`}</span></li></ul>
            </>}
          </div>
          <div className="n-plan-footer">
            <a href={checkoutHref} target="_blank" rel="noopener noreferrer">{plan.cta} <span aria-hidden="true">↗</span></a>
            <p className={`n-plan-savings${plan.savings ? " has-savings" : ""}`}>{plan.savings ? <><strong>{plan.savings}</strong><span>{plan.summary}</span></> : <span>{plan.summary}</span>}</p>
          </div>
        </article>;
      })}</div>
    </div>
  </section>;
}

export default function PlansContent({ content = fallback }: { content?: PlansPageData }) {
  const orderedPlans = [...content.plans];
  const featuredIndex = orderedPlans.findIndex((plan) => plan.popular);
  if (featuredIndex > 0) orderedPlans.splice(1, 0, orderedPlans.splice(featuredIndex, 1)[0]);

  return <>
    <KitMotion />
    <Hero
      section="Plans"
      title="Plans"
      lead={`From ${content.plans[0]?.price} a week. Every plan includes every feature.`}
      actions={[{ label: "Choose a plan", href: "#plans", icon: "↓" }]}
      bar={<><a href="#plans">Compare plans <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M2 8l5 5 5-5" /></svg></a><a href="#plan-questions">Questions</a></>}
    />
    <PricingTable plans={orderedPlans} />
    <Band tone="soft" id="plan-questions" label="Plan questions">
      <Split xl title={<>Good to <br />know.</>} intro={<VisitTraverse />}>
        <Accordion items={content.faqItems.map(({ question, answer }) => ({ question, answer }))} />
      </Split>
    </Band>
    <SiteFooter />
  </>;
}
