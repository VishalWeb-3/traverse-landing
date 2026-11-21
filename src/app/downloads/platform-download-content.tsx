import { PLATFORM_DOWNLOADS, type PlatformPageData } from "./platform-data";
import fallback from "../../../content/download/download.json";
import SiteFooter from "../site-footer";
import KitMotion from "../kit/kit-motion";
import { PlatformIcon } from "../site-header";
import { Band, Button, Cells, Head, Hero, List, Photos, Points, Split, Statement, pad } from "../kit/kit";

const platformArtwork: Record<string, { src: string; alt: string }> = {
  windows: { src: "/images/vpn/photos/airport-work.webp", alt: "Traveler with a laptop at an airport window overlooking a plane" },
  macos: { src: "/images/vpn/photos/travel-desk.webp", alt: "Laptop, tablet and phone together on a desk" },
  linux: { src: "/images/vpn/photos/cafe-laptop.webp", alt: "Woman working on a laptop at a café table" },
  android: { src: "/images/vpn/photos/city-phone.webp", alt: "Woman looking at her phone in a busy city at night" },
  ios: { src: "/images/vpn/photos/cafe-phone.webp", alt: "Person using a phone at a café table" },
};

const platformIcon: Record<string, string> = { macos: "mac", ios: "apple" };

export default function PlatformDownloadContent({ platform, content = fallback }: { platform: PlatformPageData | null; content?: typeof fallback }) {
  if (!platform) return <>
    <KitMotion />
    <Hero
      section="Download"
      title="One account. Everywhere you connect."
      lead="Traverse VPN is built for everyday users who want straightforward privacy online. Pick your platform, install the app, and use the same account across your supported devices."
      actions={[{ label: "Choose your device", href: "#platforms", icon: "↓" }, { label: "View plans", href: "/plans", ghost: true }]}
      bar={<><a href="#platforms">Find your app <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M2 8l5 5 5-5" /></svg></a><span>{pad(content.platforms.length)} platforms</span></>}
    />

    <Band tone="white" id="platforms" label="Find your app">
      <Head label="Find your app" title={<>Download Traverse<br />for your device.</>} intro="Choose a platform to see the app details, setup steps, and compatibility information." />
      <ul className="kit-platforms">{content.platforms.map((item, index) => <li key={item.key}><a href={item.href}>
        <span className="kit-platform-icon" aria-hidden="true"><PlatformIcon platform={platformIcon[item.key] ?? item.key} /></span>
        <span className="kit-meta">{pad(index + 1)}<span /><em>{item.family}</em></span>
        <h3>{item.name}</h3>
        <span className="kit-card-go">App details <span aria-hidden="true">↗</span></span>
      </a></li>)}</ul>
    </Band>

    <Band label="Get connected">
      <Split label="Get connected" title={<>Three quick steps. A better routine.</>}>
        <List items={content.steps.map(({ title, text }) => ({ title, text }))} />
      </Split>
    </Band>

    <Band tone="white" label="Plans">
      <Statement title={<>Privacy that fits your everyday.</>}>
        <p className="kit-copy">Find the right app, choose your plan, and connect with confidence.</p>
        <Button label="Explore plans" href="/plans" />
      </Statement>
    </Band>
    <SiteFooter />
  </>;

  const download = PLATFORM_DOWNLOADS[platform.key];
  const artwork = platformArtwork[platform.key] ?? { src: platform.image, alt: platform.imageAlt };
  return <>
    <KitMotion />
    <Hero
      section="Download"
      topic={platform.name}
      title={platform.title}
      lead={platform.lead}
      actions={[
        { label: `Download for ${platform.name}`, href: download?.href ?? "https://links.traversevpn.com/s/Ugp0lRJV", external: download?.external },
        { label: "View plans", href: "/plans", ghost: true },
      ]}
      bar={<><a href="#content">Getting started <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M2 8l5 5 5-5" /></svg></a><a href="/downloads">All apps</a></>}
    />
    <Photos wide images={[artwork]} />

    <div id="content" />
    <Band tone="white" label="A VPN, in everyday terms">
      <Split label="A VPN, in everyday terms" title={<>What is a VPN for {platform.name}?</>} intro={platform.description}>
        <List items={platform.highlights.map(({ title, text }) => ({ title, text }))} />
      </Split>
    </Band>

    <Band label="Getting started">
      <Split label="Getting started" title={<>Three steps to get connected.</>} intro={`Getting set up on ${platform.name} is straightforward.`}>
        <List items={platform.steps.map(({ title, text }) => ({ title, text }))} />
      </Split>
    </Band>

    <Band tone="soft" label="Why Traverse">
      <Split label="Why Traverse" title={platform.detailsTitle} intro={`${platform.name} tools for everyday privacy, with room to adjust your connection.`}>
        <Cells two items={platform.details.map(({ title, text }) => ({ title, text }))} />
      </Split>
    </Band>

    <Band tone="white" label="Check your setup">
      <Split label="Check your setup" title={<>Compatibility and details.</>} intro={platform.note}>
        <div className="kit-support"><Points check items={platform.compatibility} /></div>
      </Split>
    </Band>

    <Band label="Plans">
      <Statement title={<>Connect with more confidence.</>}>
        <p className="kit-copy">Choose your plan, install Traverse VPN for {platform.name}, and get connected.</p>
        <Button label="Explore plans" href="/plans" />
      </Statement>
    </Band>
    <SiteFooter />
  </>;
}
