import { PlatformRoute } from "../downloads/platform-route";

export const dynamic = "force-dynamic";

// Metadata and JSON-LD for this route live in ./layout.tsx, exactly as on the original site.
export default function Page() {
  return <PlatformRoute platform="windows" />;
}
