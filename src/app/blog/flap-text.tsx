"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Split-flap tiles. The characters cycle briefly before settling whenever
 * `cycleKey` changes (initial load, or a new filter). Screen readers get the
 * plain text; the tiles are decorative.
 */
export default function FlapText({ text, cycleKey, delay = 0, className = "" }: { text: string; cycleKey: string; delay?: number; className?: string }) {
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    const chars = text.split("");
    const settleAt = chars.map((_, i) => delay + 220 + i * 70);
    const start = performance.now();
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      if (now - last > 45) {
        last = now;
        setShown(chars.map((ch, i) => {
          if (ch === " " || elapsed >= settleAt[i]) return ch;
          if (elapsed < delay) return " ";
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }).join(""));
      }
      if (elapsed < settleAt[settleAt.length - 1] + 20) frame = requestAnimationFrame(tick);
      else setShown(text);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, cycleKey, delay]);

  return <span className={`tv-flap ${className}`}>
    <span className="sr-only">{text}</span>
    {shown.split("").map((ch, i) => ch === " "
      ? <span className="tv-flap-gap" aria-hidden="true" key={i} />
      : <span className="tv-flap-tile" aria-hidden="true" key={i}>{ch}</span>)}
  </span>;
}
