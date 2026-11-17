import { PlatformRoute, platformMetadata } from "../downloads/platform-route";

export const dynamic = "force-dynamic";

export const metadata = platformMetadata("macos");

export default function Page() {
  return <PlatformRoute platform="macos" />;
}
