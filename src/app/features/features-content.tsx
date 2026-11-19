import fallback from "../../../content/features/features.json";
import SiteFooter from "../site-footer";
import KitMotion from "../kit/kit-motion";
import { Band, Button, Cells, Hero, List, Photos, Points, Rows, Split, Statement, pad } from "../kit/kit";

type FeaturesPageData = typeof fallback;

export default function FeaturesContent({ content = fallback }: { content?: FeaturesPageData }) {
  const features = content.features;
  return <>
    <KitMotion />
    <Hero
      section="Features"
      title="Browse privately and securely"
      lead="Traverse VPN creates an encrypted tunnel between your device and the internet, so your traffic can’t be easily read or intercepted by others on the network."
      actions={[{ label: "Explore Traverse", href: "/downloads" }]}
    />
    <Photos images={[features[1], features[4], features[3]].filter(Boolean).map((feature) => ({ src: feature.image, alt: feature.alt }))} />

    <div id="content" />
    <Band tone="white" label="At a glance">
      <Split label="At a glance" title={<>What you get<br />with Traverse VPN</>}>
        <List items={features.slice(0, 5).map((feature) => ({ title: feature.title, text: feature.points[0] || feature.copy }))} />
      </Split>
    </Band>

    <Band label="Traverse VPN feature details">
      <Split label="In detail" title={<>Built for café WiFi, airports and late nights</>} intro="One app: IP masking, encryption and leak protection in one place." meta={`${pad(features.length)} features`}>
        <Rows items={features.map((feature) => ({
          label: `${feature.number} / 09`,
          tag: feature.tag,
          title: feature.title,
          image: { src: feature.image, alt: feature.alt },
          text: feature.copy,
          points: feature.points,
        }))} />
      </Split>
    </Band>

    <Band tone="soft" label="The details">
      <Split label="The details" title={<>Protection, with controls you set</>} intro="Traverse VPN Pro brings everyday connection protections and controls into one app.">
        <Cells two items={content.safeguards.map((item) => ({ title: item.title, text: item.text, points: item.points }))} />
      </Split>
    </Band>

    <Band tone="dark" label="Support">
      <Split label="Here when you need us" title={<>Support when<br />you need it</>} actions={[{ label: "Visit support", href: "/support" }]}>
        <div className="kit-support">
          <p className="kit-copy">If something doesn’t work the way you expect, Traverse VPN provides clear, in‑app and store‑listed support channels so you can get help with setup, billing, or troubleshooting. You don’t have to guess what’s wrong or fix complex issues alone.</p>
          <Points check items={["Access to help guides and support from inside the app", "Assistance with configuration, connectivity, or account questions", "A smoother path from “something’s wrong” to “back to protected”"]} />
        </div>
      </Split>
    </Band>

    <Band tone="white" label="One app, several layers">
      <Statement title={<>Protect your internet with Traverse VPN</>}>
        <p className="kit-copy">Bring everything together in one app:</p>
        <Points check items={[
          "IP masking + strong, modern encryption",
          "DNS and WebRTC leak protection, plus digital fingerprint defenses",
          "Kill Switch, WiFi Protection, Auto-connect, and Split Tunneling",
          "Unlimited bandwidth on high-speed, premium servers",
          "A privacy-centric design with no premium data-sharing and chat that isn’t used for model training",
        ]} />
        <p className="kit-copy">Your internet stays yours — whether you’re on your home router, campus WiFi, or that random café hotspot your friend picked.</p>
        <Button label="Get Traverse VPN" href="/downloads" />
      </Statement>
    </Band>
    <SiteFooter />
  </>;
}
