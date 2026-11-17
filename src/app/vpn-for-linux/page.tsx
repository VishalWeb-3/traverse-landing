import { PlatformRoute, platformMetadata } from "../downloads/platform-route";

export const dynamic = "force-dynamic";

export const metadata = platformMetadata("linux");

export default function Page() {
  return <PlatformRoute platform="linux" />;
}
