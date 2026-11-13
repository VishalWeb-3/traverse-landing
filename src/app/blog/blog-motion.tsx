"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlogMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".blog-page");
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".neid-blog-intro > *", { autoAlpha: 0, y: 20, filter: "blur(4px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .7, stagger: .08, ease: "power3.out", delay: .08 });
      gsap.fromTo(".neid-blog-controls", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .55, ease: "power2.out", delay: .3 });
      page.querySelectorAll<HTMLElement>(".neid-blog-card").forEach((card, index) => {
        gsap.fromTo(card, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .6, delay: Math.min(index * .05, .2), ease: "power3.out", scrollTrigger: { trigger: card, start: "top 92%", once: true } });
      });
      gsap.fromTo(".neid-blog-subscribe > *", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .6, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".neid-blog-subscribe", start: "top 85%", once: true } });
    }, page);

    return () => ctx.revert();
  }, []);

  return null;
}
