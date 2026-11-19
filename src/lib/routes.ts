export const KNOWN_ROUTES = [
  "blogs",
  "faqs",
  "downloads",
  "features",
  "plans",
  "security",
  "support",
  "enterprise",
  "about-us",
  "contact-us",
  "privacy-policy",
  "refund-policy",
  "terms-and-conditions",
  "sitemap",
  "vpn-for-android",
  "vpn-for-business",
  "vpn-for-gaming",
  "vpn-for-iphone",
  "vpn-for-linux",
  "vpn-for-mac",
  "vpn-for-streaming",
  "vpn-for-windows",
] as const;

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = new Array<number>(b.length + 1);
  let curr = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        curr[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + cost
      );
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

export type RouteSuggestion = {
  path: string;
  distance: number;
};

export function suggestRoute(pathname: string): RouteSuggestion | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const first = segments[0].toLowerCase();
  let best: { route: string; distance: number } | null = null;

  for (const route of KNOWN_ROUTES) {
    const d = levenshtein(first, route);
    const maxAllowed = Math.min(3, Math.floor(route.length / 2));
    if (d <= maxAllowed && (!best || d < best.distance)) {
      best = { route, distance: d };
    }
  }
  if (!best) return null;

  const rest = segments.slice(1);
  const correctedPath = "/" + [best.route, ...rest].join("/");

  if (correctedPath === pathname) return null;

  return { path: correctedPath, distance: best.distance };
}
