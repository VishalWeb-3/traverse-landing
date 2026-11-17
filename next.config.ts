import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// 301s carried over unchanged from the original site's firebase.json, so short links and old URLs keep their ranking.
const originalRedirects = [
  { source: "/terms", destination: "/terms-and-conditions" },
  { source: "/privacy", destination: "/privacy-policy" },
  { source: "/refund", destination: "/refund-policy" },
  { source: "/android", destination: "/vpn-for-android" },
  { source: "/ios", destination: "/vpn-for-iphone" },
  { source: "/streaming", destination: "/vpn-for-streaming" },
  { source: "/gaming", destination: "/vpn-for-gaming" },
  { source: "/macos", destination: "/vpn-for-mac" },
  { source: "/windows", destination: "/vpn-for-windows" },
  { source: "/business", destination: "/vpn-for-business" },
  { source: "/blog", destination: "/blogs" },
  { source: "/blog/:splat*", destination: "/blogs/:splat*" },
  { source: "/faq", destination: "/faqs" },
  { source: "/download", destination: "/downloads" },
];

// URLs that only existed in the redesign while it was in development, folded back into the indexed ones.
const redesignRedirects = [
  { source: "/download/android", destination: "/vpn-for-android" },
  { source: "/download/ios", destination: "/vpn-for-iphone" },
  { source: "/download/macos", destination: "/vpn-for-mac" },
  { source: "/download/windows", destination: "/vpn-for-windows" },
  { source: "/download/linux", destination: "/vpn-for-linux" },
  { source: "/terms-of-use", destination: "/terms-and-conditions" },
  { source: "/no-logs-policy", destination: "/privacy-policy" },
  { source: "/security-standards", destination: "/security" },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  // Always render <title>, meta and canonical inside <head> (no metadata streaming), as the original static site did,
  // so every crawler and social preview sees them without running JavaScript.
  htmlLimitedBots: /.*/,
  // Firebase served .html files at clean URLs; keep the Search Console verification file reachable both ways.
  async rewrites() {
    return [{ source: "/google900c9a43832bc520", destination: "/google900c9a43832bc520.html" }];
  },
  async redirects() {
    return [...redesignRedirects, ...originalRedirects].map((redirect) => ({ ...redirect, statusCode: 301 as const }));
  },
};

export default nextConfig;

// Lets `next dev` read Cloudflare bindings; it does nothing in production builds.
initOpenNextCloudflareForDev();
