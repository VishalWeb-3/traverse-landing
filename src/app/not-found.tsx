import type { Metadata } from "next";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import NotFoundClient from "./not-found-client";
import "./not-found.css";

export const metadata: Metadata = { title: "Page not found | Traverse VPN", robots: { index: false } };

export default function NotFound() {
  return <main className="kit blog-page blog-neiden-page"><SiteHeader /><NotFoundClient /><SiteFooter /></main>;
}
