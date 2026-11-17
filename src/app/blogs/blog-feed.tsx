"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import fallback from "../../../content/blog/blog.json";
import FlapText from "./flap-text";

type BlogContent = typeof fallback;
type Story = BlogContent["stories"][number] & { href?: string };

const ALL = "All stories";

// Content stores dates like "OCT 22, 2026" and read times like "5 MIN READ".
// The board shows them the way a person would say them.
function splitDate(date: string) {
  const match = date.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})?/);
  if (!match) return { month: date, day: "", year: "", flap: date.toUpperCase() };
  const month = match[1].slice(0, 1).toUpperCase() + match[1].slice(1, 3).toLowerCase();
  const day = match[2].padStart(2, "0");
  return { month, day, year: match[3] || "", flap: `${match[1].slice(0, 3).toUpperCase()} ${day}` };
}
const shortRead = (read: string) => read.replace(/\s*read\s*$/i, "").toLowerCase();
const topicLabel = (category: string) => category === ALL ? "All guides" : category;

export default function BlogFeed({ content = fallback }: { content?: Omit<BlogContent, "stories"> & { stories: Story[] } }) {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const lead = content.stories[0];
  const filteredStories = useMemo(() => content.stories.filter((story) => {
    const matchesCategory = category === ALL || story.category === category;
    const searchText = `${story.title} ${story.excerpt} ${story.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLowerCase());
  }), [category, query, content]);
  const active = filteredStories.find((story) => story.number === activeNumber) || filteredStories[0];
  const cycleKey = `${category}|${query.trim() ? "q" : ""}`;

  const countFor = (item: string) => item === ALL ? content.stories.length : content.stories.filter((story) => story.category === item).length;

  const requestSubscription = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") || "").trim();
    if (!email) return;
    setSubscribeStatus("Your email app is opening with the request filled in. Send it to join the list.");
    window.location.href = `mailto:info@traversevpn.com?subject=${encodeURIComponent("Traverse blog updates")}&body=${encodeURIComponent(`Please add ${email} to the Traverse blog updates list.`)}`;
  };

  return <>
    <section className="tv-hero" aria-labelledby="tv-blog-title">
      <div className="tv-hero-copy">
        <h1 id="tv-blog-title">Notes for<br />the road</h1>
        <p>Plain-language guides to public Wi-Fi, encryption, and staying private on every network you join, from the café down the street to a hotel halfway around the world.</p>
        <a className="tv-hero-jump" href="#departures">Browse all {content.stories.length} guides</a>
      </div>

      {lead && <article className="tv-lead">
        <a className="tv-lead-image" href={lead.href} aria-label={`Read ${lead.title}`}>
          <Image src={lead.image} alt={lead.alt} fill priority sizes="(max-width: 900px) 100vw, 48vw" />
          <span className="tv-lead-tag">Latest guide</span>
        </a>
        <div className="tv-lead-copy">
          <p className="tv-lead-meta"><span>{lead.category}</span><span>{shortRead(lead.read)}</span></p>
          <h2><a href={lead.href}>{lead.title}</a></h2>
          <p>{lead.excerpt}</p>
        </div>
      </article>}
    </section>

    <section className="tv-board-wrap" id="departures" aria-labelledby="tv-board-title">
      <div className="tv-board">
        <header className="tv-board-head">
          <div>
            <h2 id="tv-board-title">Departures</h2>
            <p>Every guide, newest first. Pick a topic or search.</p>
          </div>
          <label className="tv-search">
            <span className="sr-only">Search guides</span>
            <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guides" />
          </label>
        </header>

        <div className="tv-topics" role="group" aria-label="Filter guides by topic">
          {content.categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setActiveNumber(null); }}>
            {topicLabel(item)}<span>{countFor(item)}</span>
          </button>)}
        </div>

        <div className="tv-board-body">
          <div className="tv-rows-wrap">
            <div className="tv-row-labels" aria-hidden="true"><span>Date</span><span>Guide</span><span>Topic</span><span>Read</span></div>
            <ol className="tv-rows" aria-live="polite">
              {filteredStories.map((story, index) => {
                const date = splitDate(story.date);
                const isActive = active?.number === story.number;
                return <li key={story.number}>
                  <a href={story.href} className={`tv-row${isActive ? " is-active" : ""}`} onMouseEnter={() => setActiveNumber(story.number)} onFocus={() => setActiveNumber(story.number)}>
                    <span className="tv-row-date"><FlapText text={date.flap} cycleKey={cycleKey} delay={index * 90} /></span>
                    <span className="tv-row-thumb" aria-hidden="true"><Image src={story.image} alt="" fill sizes="96px" /></span>
                    <span className="tv-row-title">{story.title}</span>
                    <span className="tv-row-topic">{story.category}</span>
                    <span className="tv-row-read">{shortRead(story.read)}</span>
                  </a>
                </li>;
              })}
            </ol>
            {filteredStories.length === 0 && <div className="tv-empty">
              <p>{content.stories.length === 0 ? "New guides are on the way." : `No guides match “${query.trim() || topicLabel(category)}”.`}</p>
              <button type="button" onClick={() => { setCategory(ALL); setQuery(""); }}>Show all guides</button>
            </div>}
          </div>

          <aside className="tv-preview" aria-hidden="true">
            {filteredStories.map((story) => <figure key={story.number} className={active?.number === story.number ? "is-shown" : ""}>
              <div className="tv-preview-image"><Image src={story.image} alt="" fill sizes="380px" /></div>
              <figcaption>{story.excerpt}</figcaption>
            </figure>)}
          </aside>
        </div>
      </div>
    </section>

    <section className="tv-subscribe" aria-labelledby="tv-subscribe-title">
      <div>
        <h2 id="tv-subscribe-title">Get the next guide by email</h2>
        <p>A short note when a new guide goes up. Nothing else.</p>
      </div>
      <form onSubmit={requestSubscription}>
        <label htmlFor="tv-subscribe-email" className="sr-only">Email address</label>
        <input id="tv-subscribe-email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
        <button type="submit">Request updates</button>
        <p className="tv-subscribe-status" role="status" aria-live="polite">{subscribeStatus}</p>
        <p className="tv-subscribe-terms">We only use your email to reply to this request. See our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-and-conditions">Terms of Service</a>.</p>
      </form>
    </section>

  </>;
}
