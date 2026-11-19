"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { suggestRoute, type RouteSuggestion } from "../lib/routes";
import { Button, Hero } from "./kit/kit";

// Same behaviour as the original site's 404: a one-letter typo redirects automatically,
// a near miss gets a "did you mean" link, anything else gets the main routes.
const AUTO_REDIRECT_THRESHOLD = 1;
const AUTO_REDIRECT_DELAY_MS = 1200;

export default function NotFoundClient() {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<RouteSuggestion | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const found = suggestRoute(window.location.pathname);
    if (!found) return;
    setSuggestion(found);
    if (found.distance <= AUTO_REDIRECT_THRESHOLD) {
      setRedirecting(true);
      const timer = setTimeout(() => router.replace(found.path), AUTO_REDIRECT_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [router]);

  const title = redirecting ? "Taking you to the right page" : "This page took a wrong turn";
  return <Hero
    section="404"
    title={title}
    bar={<><a href="/">Back to home <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 12 12 2M5 2h7v7" /></svg></a><a href="/sitemap">Sitemap</a></>}
  >
    <p className="kit-lead not-found-copy">
      {redirecting && suggestion ? <>Redirecting you to <a href={suggestion.path}>{suggestion.path}</a>…</>
        : suggestion ? <>Did you mean <a href={suggestion.path}>{suggestion.path}</a>?</>
        : "The link may be old, or the address may have a typo. These pages are a good place to pick up from."}
    </p>
    <nav className="kit-actions not-found-links" aria-label="Popular pages">
      <Button label="Back to home" href="/" />
      {[["Features", "/features"], ["Plans", "/plans"], ["Downloads", "/downloads"], ["Blog", "/blogs"], ["Contact", "/contact-us"]].map(([label, href]) => <Button key={href} label={label} href={href} ghost />)}
    </nav>
  </Hero>;
}
