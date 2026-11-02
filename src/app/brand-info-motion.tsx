"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandInfoMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".brand-info-hero > *", { autoAlpha: 0, y: 24, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .8, stagger: .09, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".brand-info-section").forEach((section) => {
        gsap.fromTo(section.children, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 84%", once: true } });
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
