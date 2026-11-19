"use client";

import { useEffect, useState } from "react";

// Same destinations as the original site's useGetCtaHref: Play Store on Android, App Store on iOS,
// and the smart link (which routes itself) everywhere else. The smart link is also the pre-hydration default.
export const TRAVERSE_DEEP_LINK = "https://links.traversevpn.com/s/Ugp0lRJV";
export const TRAVERSE_PLAY_STORE = "https://play.google.com/store/apps/details?id=com.web3task.vpn&pcampaignid=web_share";
export const TRAVERSE_APP_STORE = "https://apps.apple.com/in/app/traversevpn-ai-app-with-vpn/id6754161193";

export function useGetAppHref() {
  const [href, setHref] = useState(TRAVERSE_DEEP_LINK);
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("android")) setHref(TRAVERSE_PLAY_STORE);
    else if (/iphone|ipad|ipod/.test(ua)) setHref(TRAVERSE_APP_STORE);
  }, []);
  return href;
}

