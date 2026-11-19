"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = "power3.out";
// Explicit end states: CSS transitions on these elements must never be read back as the target value.
const hidden = { y: 15, autoAlpha: 0 };
const shown = { y: 0, autoAlpha: 1, ease, clearProps: "transform" };

/** The blog's motion, applied to any kit page: the hero words rise out of a blur, images open from
 *  the bottom edge, and each band's content settles in once as it reaches the viewport. */
export default function KitMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const hero = document.querySelector("[data-kit-hero]");
      if (hero) gsap.timeline({ delay: .1 })
        .fromTo(hero.querySelector(".kit-eyebrow"), hidden, { ...shown, duration: .6 })
        .fromTo(hero.querySelectorAll(".kit-word"), { ...hidden, filter: "blur(8px)", color: "#a3a3a3" }, { ...shown, filter: "blur(0px)", color: "#090909", duration: .9, stagger: .08, clearProps: "filter,color" }, "<.1")
        .fromTo(hero.querySelectorAll(".kit-lead, .kit-facts, .kit-actions"), hidden, { ...shown, duration: .7, stagger: .08 }, "<.3")
        .fromTo(hero.querySelectorAll(".kit-hero-bar > *"), { autoAlpha: 0 }, { autoAlpha: 1, duration: .6, stagger: .08, ease: "power2.out" }, "<.2");

      gsap.utils.toArray<HTMLElement>("[data-kit-photos] figure").forEach((figure, index) => {
        const trigger = { trigger: figure, start: "top 92%", once: true };
        gsap.from(figure, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, delay: index * .08, ease: "expo.out", scrollTrigger: trigger });
        gsap.from(figure.querySelector("img"), { scale: 1.18, duration: 1.6, delay: index * .08, ease: "expo.out", scrollTrigger: trigger });
      });

      gsap.utils.toArray<HTMLElement>("[data-kit-reveal]").forEach((band) => {
        const intro = band.querySelectorAll(":scope > .kit-split > .kit-aside > *, :scope > .kit-head > * > *, :scope > .kit-head > p, :scope > .kit-statement > h2, :scope > .kit-statement > div > *");
        if (intro.length) gsap.fromTo(intro, { y: 20, autoAlpha: 0 }, { ...shown, duration: .8, stagger: .07, scrollTrigger: { trigger: band, start: "top 80%", once: true } });
        const items = band.querySelectorAll(".kit-list > li, .kit-acc-item, .kit-cell, .kit-card, .kit-doc, .kit-row-head, .kit-row-body, .n-plan-card");
        items.forEach((item) => gsap.fromTo(item, { y: 28, autoAlpha: 0 }, { ...shown, duration: .8, scrollTrigger: { trigger: item, start: "top 90%", once: true } }));
        band.querySelectorAll<HTMLElement>(".kit-row-media").forEach((media) => {
          const trigger = { trigger: media, start: "top 90%", once: true };
          gsap.from(media, { clipPath: "polygon(7% 100%, 100% 100%, 100% 100%, 0 100%, 0 100%)", duration: 1.2, ease: "expo.out", scrollTrigger: trigger });
          gsap.from(media.querySelector("img"), { scale: 1.15, duration: 1.5, ease: "expo.out", scrollTrigger: trigger });
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
