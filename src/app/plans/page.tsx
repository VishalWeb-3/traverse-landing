import type { Metadata } from "next";
import SiteHeader from "../site-header";
import PlansContent from "./plans-content";
import { client } from "../../../tina/__generated__/client";
import fallback from "../../../content/plans/plans.json";
import { buildSeoMetadata } from "../../lib/seo";
import seoData from "../../data/seo/plans.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildSeoMetadata(seoData);

export default async function PlansPage() {
  if (process.env.NODE_ENV !== "development" && !(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    return <main className="kit blog-page blog-neiden-page"><SiteHeader /><PlansContent content={fallback} /></main>;
  }
  let content = fallback;
  try {
    const result = await client.queries.plansPage({ relativePath: "plans.json" }, { fetchOptions: { cache: "no-store" } });
    content = result.data.plansPage as typeof fallback;
  } catch {
    // Keep the bundled copy available when Tina Cloud content is unavailable.
  }
  return <main className="kit blog-page blog-neiden-page"><SiteHeader /><PlansContent content={content} /></main>;
}
