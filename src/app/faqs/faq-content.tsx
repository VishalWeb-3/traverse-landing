"use client";

import { useMemo, useState } from "react";
import fallback from "../../../content/faqs/faqs.json";
import SiteFooter from "../site-footer";
import KitMotion from "../kit/kit-motion";
import Accordion from "../kit/kit-accordion";
import { Band, Button, Hero, Split, Statement } from "../kit/kit";

const ALL_TOPICS = "All topics";

export default function FaqContent({ content = fallback }: { content?: typeof fallback }) {
  const [category, setCategory] = useState(ALL_TOPICS);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => content.questions.filter(({ category: group, question, answer }) => {
    const matchesTopic = category === ALL_TOPICS || group === category;
    const matchesSearch = `${question} ${answer} ${group}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesTopic && matchesSearch;
  }), [category, search, content]);

  // The blog's filter bar: topic select in column one, search in column three.
  const bar = <>
    <label>
      <span className="sr-only">Filter questions by topic</span>
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
        {[ALL_TOPICS, ...content.categories].map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <svg viewBox="0 0 14 14" aria-hidden="true"><path d="m3 5 4 4 4-4" /></svg>
    </label>
    <label>
      <span className="sr-only">Search frequently asked questions</span>
      <input type="search" placeholder="Search questions" value={search} onChange={(event) => setSearch(event.target.value)} />
      <svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="6" cy="6" r="4.5" /><path d="m9.5 9.5 3 3" /></svg>
    </label>
  </>;

  return <>
    <KitMotion />
    <Hero
      section="FAQs"
      title="Everything about VPN privacy, security, streaming & speed."
      lead="Learn about online privacy, streaming, internet security, and safe browsing with Traverse VPN. Find answers about Netflix, gaming, public WiFi, VPN speed, encryption, and more."
      actions={[{ label: "Get protected with Traverse", href: "/plans" }]}
      bar={bar}
    />

    <Band tone="soft" id="content" label="Questions">
      <Split
        xl
        label="Answers, without the guesswork"
        title={<>Good to know.<br />Easy to find.</>}
        intro="Browse the questions people ask before they connect. Choose a topic or search for a specific answer."
        meta={<span aria-live="polite">{filtered.length} {filtered.length === 1 ? "answer" : "answers"}{category !== ALL_TOPICS ? ` in ${category}` : ""}</span>}
      >
        <Accordion key={`${category}|${search}`} items={filtered.map(({ question, answer, category: tag }) => ({ question, answer, tag }))} empty="No questions found. Try a different search." />
      </Split>
    </Band>

    <Band tone="white" label="Get started">
      <Statement title={<>Protect your privacy in seconds.</>}>
        <p className="kit-copy">Fast, secure, and private internet access across your devices.</p>
        <Button label="Download now" href="/downloads" />
      </Statement>
    </Band>
    <SiteFooter />
  </>;
}
