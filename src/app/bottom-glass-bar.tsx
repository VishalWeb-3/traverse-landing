"use client";

import { useEffect } from "react";

const blurLayers = [
  { blur: "0.3px", from: "0%", to: "8.75%" },
  { blur: "1.3px", from: "8.75%", to: "17.5%" },
  { blur: "2.8px", from: "17.5%", to: "26.25%" },
  { blur: "5px", from: "26.25%", to: "35%" },
  { blur: "7.8px", from: "35%", to: "43.75%" },
  { blur: "11.3px", from: "43.75%", to: "52.5%" },
  { blur: "15.3px", from: "52.5%", to: "61.25%" },
  { blur: "20px", from: "61.25%", to: "70%" },
];

export default function BottomGlassBar() {
  useEffect(() => {
    const intersectingFooters = new Set<Element>();
    const observedFooters = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) intersectingFooters.add(entry.target);
        else intersectingFooters.delete(entry.target);
      });
      intersectingFooters.forEach((footer) => {
        if (!footer.isConnected) intersectingFooters.delete(footer);
      });
      document.body.classList.toggle("visuvate-footer-in-view", intersectingFooters.size > 0);
    }, { threshold: 0.02 });
    const observeFooters = () => {
      document.querySelectorAll("footer").forEach((footer) => {
        if (observedFooters.has(footer)) return;
        observedFooters.add(footer);
        observer.observe(footer);
      });
      intersectingFooters.forEach((footer) => {
        if (!footer.isConnected) intersectingFooters.delete(footer);
      });
      document.body.classList.toggle("visuvate-footer-in-view", intersectingFooters.size > 0);
    };
    observeFooters();
    const mutations = new MutationObserver(observeFooters);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
      document.body.classList.remove("visuvate-footer-in-view");
    };
  }, []);

  return <div className="bottom-glass-bar" aria-hidden="true">
    <div className="bottom-glass-layers">
      {blurLayers.map((layer) => <div key={layer.blur} style={{
        backdropFilter: `blur(${layer.blur}) saturate(120%)`,
        WebkitBackdropFilter: `blur(${layer.blur}) saturate(120%)`,
        maskImage: `linear-gradient(to bottom, transparent 0%, transparent ${layer.from}, black ${layer.to}, black 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, transparent ${layer.from}, black ${layer.to}, black 100%)`,
      }} />)}
    </div>
  </div>;
}
