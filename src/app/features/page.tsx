import type { Metadata } from "next";
import SiteHeader from "../site-header";
import FeaturesContent from "./features-content";
import { client } from "../../../tina/__generated__/client";
import { resolveTinaImageUrls } from "../tina-image-url";
import fallback from "../../../content/features/features.json";
import { buildSeoMetadata } from "../../lib/seo";
import seoData from "../../data/seo/features.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildSeoMetadata(seoData);

export default async function FeaturesPage() {
  if (process.env.NODE_ENV !== "development" && !(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    return <main className="product-features"><SiteHeader /><FeaturesContent content={fallback} /></main>;
  }
  let content = fallback;
  try {
    const result = await client.queries.featuresPage({ relativePath: "features.json" }, { fetchOptions: { cache: "no-store" } });
    content = resolveTinaImageUrls(result.data.featuresPage) as typeof fallback;
  } catch {
    // Keep the local page available if Tina Cloud has no indexed record yet.
  }
  return <main className="product-features">
    <SiteHeader />
    <FeaturesContent content={content} />
  </main>;
}
