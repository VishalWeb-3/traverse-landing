"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqRow = {
  id: string;
  items: FaqItem[];
  speed: string;
  direction: "left" | "right";
};

function FaqCard({ question, answer }: FaqItem) {
  return <article className="faq-scroll-card">
    <h3>{question}</h3>
    <p>{answer}</p>
  </article>;
}

function HorizontalScroller({ row }: { row: FaqRow }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const loopItems = [...row.items];
  for (let index = 0; loopItems.length > 0 && loopItems.length < 5; index += 1) {
    loopItems.push(row.items[index % row.items.length]);
  }

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(marquee);
    return () => observer.disconnect();
  }, []);

  return <div ref={marqueeRef} className={`faq-marquee faq-marquee--${row.direction}${isVisible ? " is-visible" : ""}`}>
    <div
      className="faq-marquee-track"
      style={{ "--faq-marquee-duration": row.speed } as CSSProperties}
    >
      <div className="faq-marquee-group">
        {loopItems.map((item, index) => <FaqCard key={`${row.id}-a-${index}`} {...item} />)}
      </div>
      <div className="faq-marquee-group" aria-hidden="true">
        {loopItems.map((item, index) => <FaqCard key={`${row.id}-b-${index}`} {...item} />)}
      </div>
    </div>
  </div>;
}

export default function FaqScroller({ rows }: { rows: FaqRow[] }) {
  return <div className="faq-marquee-rows">
    {rows.map((row) => <HorizontalScroller key={row.id} row={row} />)}
  </div>;
}
