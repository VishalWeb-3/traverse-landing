import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  devIndicators: false,
};

export default nextConfig;

// Lets `next dev` read Cloudflare bindings; it does nothing in production builds.
initOpenNextCloudflareForDev();
