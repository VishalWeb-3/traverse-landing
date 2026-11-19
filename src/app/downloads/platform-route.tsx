import type { Metadata } from "next";
import SiteHeader from "../site-header";
import PlatformDownloadContent from "./platform-download-content";
import { platformPages, type PlatformKey } from "./platform-data";
import { client } from "../../../tina/__generated__/client";
import { resolveTinaImageUrls } from "../tina-image-url";
import { buildSeoMetadata } from "../../lib/seo";
import android from "../../data/seo/android.json";
import ios from "../../data/seo/ios.json";
import macos from "../../data/seo/macos.json";
import windows from "../../data/seo/windows.json";
import linux from "../../data/seo/linux.json";

/** Platform pages live at the original indexed URLs (/vpn-for-…), not under /downloads. */
export const PLATFORM_PATHS: Record<PlatformKey, string> = {
  android: "/vpn-for-android",
  ios: "/vpn-for-iphone",
  macos: "/vpn-for-mac",
  windows: "/vpn-for-windows",
  linux: "/vpn-for-linux",
};

const seo = { android, ios, macos, windows, linux };

export function platformMetadata(key: PlatformKey): Metadata {
  return buildSeoMetadata(seo[key]);
}

export async function PlatformRoute({ platform }: { platform: PlatformKey }) {
  let data = platformPages[platform];
  if (process.env.NODE_ENV === "development" || (process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    try {
      const result = await client.queries.platformPage({ relativePath: `${platform}.json` }, { fetchOptions: { cache: "no-store" } });
      data = resolveTinaImageUrls(result.data.platformPage) as typeof data;
    } catch {
      // Keep the platform page available from bundled content when Tina Cloud is unavailable.
    }
  }
  return <main className="kit blog-page blog-neiden-page"><SiteHeader/><PlatformDownloadContent platform={{ ...data, key: platform }}/></main>;
}
