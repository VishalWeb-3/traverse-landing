"use client";

import { useId, useState } from "react";
import { pad } from "./kit";

export type AccordionItem = { question: string; answer: string; tag?: string };

/** The homepage answers accordion: numbered rows, one open at a time. */
export default function Accordion({ items, firstOpen = true, empty = "No questions found." }: { items: AccordionItem[]; firstOpen?: boolean; empty?: string }) {
  const id = useId();
  const [open, setOpen] = useState(firstOpen ? 0 : -1);
  if (!items.length) return <p className="kit-acc-empty">{empty}</p>;
  return <div className="kit-acc">{items.map((item, index) => {
    const isOpen = open === index;
    const panel = `${id}-${index}`;
    return <article className="kit-acc-item" data-open={isOpen} key={item.question}>
      <button className="kit-acc-trigger" type="button" aria-expanded={isOpen} aria-controls={panel} onClick={() => setOpen(isOpen ? -1 : index)}>
        <span className="kit-num" aria-hidden="true">{pad(index + 1)}</span>
        <span className="kit-acc-question">{item.question}</span>
        {item.tag ? <span className="kit-acc-tag">{item.tag}</span> : <span />}
        <i className="kit-acc-mark" aria-hidden="true" />
      </button>
      <div className="kit-acc-panel" id={panel} role="region" aria-hidden={!isOpen}>
        <div><p>{item.answer}</p></div>
      </div>
    </article>;
  })}</div>;
}
