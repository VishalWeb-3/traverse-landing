/**
 * SEO Structured Data Schemas for Security Page
 * These are used to generate JSON-LD markup for search engines
 */

export const securityPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "VPN Security & Privacy Features | Traverse VPN",
  description:
    "Learn how Traverse VPN protects your internet connection with advanced security features",
  url: "https://traversevpn.com/security",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Traverse VPN",
    description:
      "A privacy-first VPN service designed for secure internet browsing",
    applicationCategory: "SecurityApplication",
    operatingSystem: ["Windows", "macOS", "iOS", "Android"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://traversevpn.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Security",
        item: "https://traversevpn.com/security",
      },
    ],
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why use a VPN for security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VPN helps protect your connection by creating a more private path between your device and the internet. This is especially useful on public or shared networks, where the risk of exposure is higher.",
      },
    },
    {
      "@type": "Question",
      name: "Does a VPN make me anonymous?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A VPN improves privacy and connection security, but it does not make someone invisible online. Websites, accounts, browser settings, and user behavior still matter.",
      },
    },
    {
      "@type": "Question",
      name: "Why does public Wi-Fi need extra protection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Public networks are convenient, but they are not always trustworthy. A VPN helps reduce the risk of unwanted visibility into your traffic when using networks you do not control.",
      },
    },
    {
      "@type": "Question",
      name: "Can a VPN help reduce tracking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VPN can help reduce some forms of tracking by masking your IP address and making it harder to link your browsing directly to your physical network location. It should be viewed as one part of a broader privacy strategy.",
      },
    },
  ],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Traverse VPN",
  url: "https://traversevpn.com",
  logo: "https://traversevpn.com/logo.png",
  description: "Privacy-first VPN service for secure internet browsing",
  sameAs: [
    "https://www.instagram.com/traverse.vpn/",
    "https://www.youtube.com/@TraverseVPN",
    "https://www.linkedin.com/in/traverse-vpn-7188a53b5/",
    "https://www.facebook.com/people/Traverse-Vpn/pfbid0jm3HDEcCYSvkXYHbJrFVDMqZMno8LCmZ1Z6tcDwhzUjiMktjGfYSr67swYbQ5zCbl/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: "https://traversevpn.com/contact-us",
  },
};
