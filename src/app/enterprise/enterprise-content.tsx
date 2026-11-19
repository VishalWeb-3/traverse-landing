import fallback from "../../../content/enterprise/enterprise.json";
import SiteFooter from "../site-footer";
import KitMotion from "../kit/kit-motion";
import Accordion from "../kit/kit-accordion";
import { Band, Button, Cells, Hero, List, Photos, Split, Statement } from "../kit/kit";

type EnterprisePageData = typeof fallback;

const CONTACT_URL = "/contact-us";

export default function EnterpriseContent({ content = fallback }: { content?: EnterprisePageData }) {
  return <>
    <KitMotion />
    <Hero
      section="Enterprise"
      title="Secure access for distributed teams."
      lead="Traverse VPN provides IT teams and security leaders with a secure, scalable foundation for remote access, multi-site connectivity, and centralized network control."
      actions={[{ label: "Talk to our team", href: CONTACT_URL }, { label: "Explore the model", href: "#needs", ghost: true, icon: "↓" }]}
      bar={<><a href="#content">For IT &amp; security leaders <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M2 8l5 5 5-5" /></svg></a><span>Access, designed to scale</span></>}
    />
    <Photos images={[
      { src: "/images/vpn/photos/cafe-collaboration.webp", alt: "Colleagues working together on laptops at a café" },
      { src: "/images/vpn/photos/airport-work.webp", alt: "Traveler with a laptop at an airport window overlooking a plane" },
      { src: "/images/vpn/photos/travel-desk.webp", alt: "Laptop, tablet and phone together on a desk" },
    ]} />

    <div id="content" />
    <Band tone="white" label="Who it is for">
      <Split label="Who it is for" title={<>Built for the people who own access.</>}>
        <List items={content.audiences.map(({ title, text }) => ({ title, text }))} />
      </Split>
    </Band>

    <Band id="needs" label="Requirements">
      <Split label="Requirements" title={<>What a business VPN needs to do.</>}>
        <Accordion items={content.expectations.map(({ title, text }) => ({ question: title, answer: text }))} />
      </Split>
    </Band>

    <Band tone="dark" label="Support">
      <Split label="Support" title={<>A team beside you, from planning to rollout.</>}>
        <Cells two items={content.support.map(({ title, text }) => ({ title, text }))} />
      </Split>
    </Band>

    <Band tone="soft" label="Enterprise questions">
      <Split xl title={<>Good to<br />know.</>}>
        <Accordion items={content.questions.map(({ question, answer }) => ({ question, answer }))} />
      </Split>
    </Band>

    <Band tone="white" label="Contact">
      <Statement title={<>Start with a conversation.</>}>
        <Button label="Talk to our team" href={CONTACT_URL} />
      </Statement>
    </Band>
    <SiteFooter />
  </>;
}
