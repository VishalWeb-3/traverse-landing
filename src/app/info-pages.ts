export type InfoPageSection = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  points?: { title: string; text: string; href?: string }[];
};

export type InfoPage = {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  sections: InfoPageSection[];
  links?: { label: string; href: string; group: string }[];
  actions?: { label: string; href: string }[];
};

const platformLinks = [
  { label: "Download VPN Apps", href: "/download", group: "Platforms" },
  { label: "VPN for Android", href: "/download/android", group: "Platforms" },
  { label: "VPN for iPhone", href: "/download/ios", group: "Platforms" },
  { label: "VPN for Business", href: "/vpn-for-business", group: "Platforms" },
  { label: "VPN for Streaming", href: "/vpn-for-streaming", group: "Platforms" },
  { label: "VPN for Gaming", href: "/vpn-for-gaming", group: "Platforms" },
  { label: "VPN for Security", href: "/security", group: "Platforms" },
  { label: "VPN for Mac", href: "/download/macos", group: "Platforms" },
  { label: "VPN for Windows", href: "/download/windows", group: "Platforms" },
  { label: "VPN for Linux", href: "/download/linux", group: "Platforms" },
];

const companyLinks = [
  { label: "About Us", href: "/about-us", group: "Company" },
  { label: "Contact Us", href: "/contact-us", group: "Company" },
  { label: "Refund Policy", href: "/refund-policy", group: "Company" },
  { label: "Support", href: "/support", group: "Company" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy", group: "Legal" },
  { label: "Terms of Use", href: "/terms-and-conditions", group: "Legal" },
  { label: "Sitemap", href: "/sitemap", group: "Legal" },
];

export const footerNavigation = [...companyLinks, ...platformLinks, ...legalLinks];

export const infoPages: InfoPage[] = [
  {
    slug: "about-us",
    title: "An internet that feels open.",
    kicker: "ABOUT TRAVERSE",
    intro: "Traverse VPN was created to make strong connection protection easier to use. The company’s original About page focuses on practical privacy across the devices, places, and activities people rely on every day.",
    actions: [{ label: "Explore features", href: "/features" }, { label: "See the plans", href: "/plans" }],
    sections: [
      { eyebrow: "WHY WE'RE HERE", title: "Make privacy easier to use.", paragraphs: ["Traverse says it set out to bridge a gap between complicated privacy tools and services that trade user data for convenience. Its goal is a VPN experience that pairs everyday usability with strong connection protection."] },
      { eyebrow: "OUR MISSION", title: "Keep personal data in your hands.", paragraphs: ["The company describes its mission as helping people protect their personal information at home, in cafés, and while travelling. Its tools are designed to reduce exposure to hackers, trackers, and other unwanted observers on the networks people use."] },
      { eyebrow: "FOR EVERY SCREEN", title: "Protection that moves with you.", paragraphs: ["Traverse offers apps across mobile and desktop platforms, so people can use one account on the devices they rely on. Each platform page includes app details and setup information."], points: [{ title: "Find your app", text: "Browse supported platforms and setup information.", href: "/download" }, { title: "For teams", text: "Explore Traverse VPN for business and enterprise needs.", href: "/enterprise" }] },
      { eyebrow: "MADE FOR REAL ROUTINES", title: "Choose a connection for the moment.", paragraphs: ["The original site highlights streaming, gaming, and everyday security as common reasons people use Traverse. Server selection and network conditions affect results, so the best connection can vary by activity and location."], points: [{ title: "Streaming", text: "Learn about private connections while streaming.", href: "/vpn-for-streaming" }, { title: "Gaming", text: "See guidance for gaming connections.", href: "/vpn-for-gaming" }, { title: "Security", text: "Explore connection safeguards.", href: "/security" }] },
      { eyebrow: "FOR ORGANIZATIONS", title: "Protection for teams as well.", paragraphs: ["Traverse also offers business and enterprise options for organizations that need to manage secure connections across a team. Enterprise arrangements can include tailored deployment and support."], points: [{ title: "Business VPN", text: "Explore team plans and organization support.", href: "/vpn-for-business" }, { title: "Enterprise VPN", text: "Discuss a tailored deployment.", href: "/enterprise" }] },
      { eyebrow: "HERE TO HELP", title: "A team behind the service.", paragraphs: ["The company invites users to contact its support team for account, setup, and general questions."], points: [{ title: "Contact Traverse", text: "Email info@traversevpn.com or see the support page.", href: "/support" }] },
    ],
  },
  {
    slug: "vpn-for-business",
    title: "Private connections for your team.",
    kicker: "TRAVERSE BUSINESS VPN",
    intro: "Give your team a straightforward way to protect work connections across the devices and networks they use every day.",
    actions: [{ label: "Talk to the team", href: "mailto:info@traversevpn.com?subject=Traverse%20Business%20VPN" }, { label: "Compare plans", href: "/plans" }],
    sections: [
      { eyebrow: "FOR EVERYDAY WORK", title: "Protection that travels with your people.", paragraphs: ["Use an encrypted VPN connection on shared Wi-Fi at the office, at home, or while travelling. Traverse Business is designed to make connection protection easy to adopt across a team's routine."], points: [{ title: "Supported apps", text: "Review setup information for supported devices.", href: "/download" }] },
      { eyebrow: "TEAM SETUP", title: "A plan for the way your team works.", paragraphs: ["Share your organization size, device mix, and deployment needs with the Traverse team. They can help identify the right setup and answer questions about managing access for your organization."], points: [{ title: "Contact the team", text: "Email info@traversevpn.com to discuss Business VPN.", href: "mailto:info@traversevpn.com?subject=Traverse%20Business%20VPN" }] },
      { eyebrow: "LARGER DEPLOYMENTS", title: "Need a tailored deployment?", paragraphs: ["For larger organizations or custom deployment requirements, the Enterprise team can discuss onboarding, administration, and support options."], points: [{ title: "Enterprise VPN", text: "Explore tailored organization deployments.", href: "/enterprise" }] },
    ],
  },
  {
    slug: "contact-us",
    title: "Talk to Traverse.",
    kicker: "CONTACT",
    intro: "Questions about plans, account help, or using Traverse with your team? Send a note and we’ll help direct it to the right place.",
    actions: [{ label: "Email Traverse", href: "mailto:info@traversevpn.com" }, { label: "Visit support", href: "/support" }],
    sections: [
      { eyebrow: "GENERAL QUESTIONS", title: "Start with a message.", paragraphs: ["Email info@traversevpn.com with a short description of what you need. The team can direct sales, technical, billing, and general questions to the right people. Please leave out passwords and payment-card details."], points: [{ title: "Email", text: "info@traversevpn.com", href: "mailto:info@traversevpn.com?subject=Traverse%20VPN%20inquiry" }] },
      { eyebrow: "SALES & TEAMS", title: "Planning a team deployment?", paragraphs: ["Include your organization size, the devices you need to cover, and any deployment requirements. The sales team can discuss business plans, pricing, and setup."], points: [{ title: "Business VPN", text: "See the team and enterprise information.", href: "/enterprise" }, { title: "Plans", text: "Compare the personal plan options.", href: "/plans" }] },
      { eyebrow: "RESPONSE TIMES", title: "When to expect a reply.", paragraphs: ["The original contact page lists replies within one business day for sales and standard support, faster handling for critical technical issues, and up to two business days for press inquiries. Timing can vary during weekends and holidays."] },
      { eyebrow: "COMPANY", title: "Find Traverse in India.", paragraphs: ["Traverse VPN lists its team at NPX Tower, Sector 153, Noida, Uttar Pradesh 201310, India."], points: [{ title: "NPX Tower", text: "Sector 153, Noida, Uttar Pradesh 201310, India", href: "https://www.google.com/maps/search/?api=1&query=NPX+Tower%2C+Sector+153%2C+Noida%2C+Uttar+Pradesh+201310%2C+India" }] },
    ],
  },
  {
    slug: "support",
    title: "Let’s get you connected.",
    kicker: "TRAVERSE SUPPORT",
    intro: "Traverse’s support team helps with mobile and desktop setup, connection issues, app features, and business deployments. Start with the device or activity you need help with, or contact the team directly.",
    actions: [{ label: "Browse FAQs", href: "/faqs" }, { label: "Contact support", href: "mailto:info@traversevpn.com?subject=Traverse%20VPN%20support" }],
    sections: [
      { eyebrow: "QUICK START", title: "Start with your device.", paragraphs: ["Choose your platform for app details and setup information. If a connection issue continues, include your device and app version when you contact support."], points: [
        { title: "iPhone and iPad", text: "Open the iOS app page.", href: "/download/ios" }, { title: "Android", text: "Open the Android app page.", href: "/download/android" }, { title: "Desktop", text: "Browse Windows, macOS, and Linux options.", href: "/download" },
      ] },
      { eyebrow: "TROUBLESHOOTING", title: "A few things to check.", paragraphs: ["Confirm that your internet connection works with Traverse disconnected, update the app, then try reconnecting to another available server. If the issue remains, email support with the steps that reproduce it."], points: [{ title: "Common questions", text: "Search answers about accounts, privacy, plans, and connections.", href: "/faqs" }] },
      { eyebrow: "STREAMING, GAMING & SECURITY", title: "Get help with how you connect.", paragraphs: ["The original support page offers help with streaming access, gaming latency, and security settings. Results can depend on your server, location, device, and the service you are using."], points: [{ title: "Streaming", text: "Troubleshoot streaming connections.", href: "/vpn-for-streaming" }, { title: "Gaming", text: "Review gaming connection guidance.", href: "/vpn-for-gaming" }, { title: "Security", text: "Learn about protection settings.", href: "/security" }] },
      { eyebrow: "BUSINESS SUPPORT", title: "Support for teams.", paragraphs: ["For deployment planning or business account questions, contact the team with your organization name and a brief description of your needs."], points: [{ title: "Business VPN", text: "Explore team options.", href: "/vpn-for-business" }, { title: "Enterprise", text: "Discuss a tailored deployment.", href: "/enterprise" }, { title: "Contact Traverse", text: "Send a message to the team.", href: "/contact-us" }] },
      { eyebrow: "COMMON QUESTIONS", title: "Getting started and account help.", paragraphs: ["Download the app from the supported platform page, then follow the device setup steps. If streaming is slow, try a nearby server and check that your base internet connection is stable. For Business plan details, contact sales. If gaming latency changes, compare nearby servers and test the connection on your usual network."], points: [{ title: "Browse FAQs", text: "Read answers about VPN setup, accounts, and connections.", href: "/faqs" }] },
      { eyebrow: "CONTACT", title: "Talk to a person.", paragraphs: ["For help beyond the guides, email info@traversevpn.com. Include the platform, app version, and a short description of the issue so the team can investigate. Do not share passwords or full payment information."], points: [{ title: "Email support", text: "info@traversevpn.com", href: "mailto:info@traversevpn.com?subject=Traverse%20VPN%20support" }] },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refunds and subscriptions.",
    kicker: "REFUND POLICY",
    intro: "The right place to request a refund depends on where the subscription was purchased. Check the original purchase channel first.",
    actions: [{ label: "Review plan options", href: "/plans" }, { label: "Ask for help", href: "/contact-us" }],
    sections: [
      { eyebrow: "APPLE PURCHASES", title: "Subscriptions from Apple.", paragraphs: ["Apple handles billing for subscriptions purchased through the iPhone app, and Traverse cannot issue these refunds directly. Sign in to your Apple account and submit a request through Apple’s Report a Problem page or your device’s purchase settings. Apple decides eligibility under its current refund rules."], points: [{ title: "Apple purchase help", text: "Open Apple’s refund request page.", href: "https://reportaproblem.apple.com/" }] },
      { eyebrow: "GOOGLE PLAY PURCHASES", title: "Subscriptions from Google Play.", paragraphs: ["Google Play manages Android app purchases, so refund requests need to be submitted through the Google account used for the subscription. Google’s current policy determines whether a purchase qualifies and how quickly it is processed."], points: [{ title: "Google Play help", text: "Review Google Play purchase and refund guidance.", href: "https://support.google.com/googleplay/answer/2479637" }] },
      { eyebrow: "DIRECT BUSINESS AGREEMENTS", title: "Business and enterprise plans.", paragraphs: ["For a direct business agreement, contact your account representative or the Traverse team. The terms of your agreement apply to billing and refund requests."] },
      { eyebrow: "CANCELLATION", title: "Manage renewal where you subscribed.", paragraphs: ["Removing the app does not stop a subscription. Turn off auto-renewal in the Apple App Store or Google Play settings for the account that made the purchase. The original policy advises cancelling at least 24 hours before the current period ends to avoid the next renewal; check the store’s latest instructions and renewal date."] },
      { eyebrow: "REFUND QUESTIONS", title: "Need help finding the right place?", paragraphs: ["Mobile refunds are decided by the store that processed the payment. Direct business agreements follow their own written billing terms. If you are unsure where you subscribed, contact Traverse and include the purchase channel and approximate date, but never send full card details."], points: [{ title: "Contact support", text: "Email info@traversevpn.com.", href: "mailto:info@traversevpn.com?subject=Refund%20question" }] },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Your privacy, clearly explained.",
    kicker: "PRIVACY POLICY",
    intro: "This page brings the published Traverse VPN privacy information into the new site, including the activity the company says it does not log and the limited information used to operate accounts and support.",
    actions: [{ label: "Explore privacy features", href: "/features" }, { label: "Ask a privacy question", href: "mailto:info@traversevpn.com?subject=Privacy%20question" }],
    sections: [
      { eyebrow: "VPN ACTIVITY", title: "The published policy says browsing activity is not logged.", paragraphs: ["Traverse’s policy says it does not record the sites or apps used through the VPN, streaming or gaming activity, the original IP address or selected VPN server, or the files and messages carried through the connection. The policy describes this as a strict no-logs commitment."] },
      { eyebrow: "ACCOUNT INFORMATION", title: "A small amount of information supports your account.", paragraphs: ["The policy says an email address may be used to create an account, send receipts, and help recover access. App-store providers or payment partners process purchases; Traverse says it does not keep full payment-card numbers on its own servers."] },
      { eyebrow: "DIAGNOSTICS & SERVICE", title: "Limited operational information helps maintain the app.", paragraphs: ["The published policy says mobile apps may send anonymous crash reports to help diagnose bugs. Basic account information is used to check premium status and respond to support requests. Aggregate server-load information helps the team understand where capacity may be needed."] },
      { eyebrow: "BUSINESS ACCOUNTS", title: "Team plans follow the same activity policy.", paragraphs: ["For Business and Enterprise accounts, the policy describes collecting account-manager contact and billing information needed to administer the agreement. It says the no-logs commitment also applies to employee VPN connections."] },
      { eyebrow: "SHARING", title: "Information is not sold to advertisers.", paragraphs: ["Traverse says it does not sell personal information. Limited information may be shared with service providers that support payments, email, or other business operations. The policy says these providers are expected to protect the information they handle."] },
      { eyebrow: "SECURITY", title: "Safeguards protect information in transit and at work.", paragraphs: ["The policy points to encryption for network traffic and restricted access to internal systems. No online service can promise absolute security, so use a unique password and contact support if you think your account has been exposed."] },
      { eyebrow: "YOUR RIGHTS", title: "Ask to review, correct, or delete account information.", paragraphs: ["The published policy invites users to ask what account information is held, request corrections, or ask for account deletion. Send requests to the address below. Traverse says it will remove requested details from its active database; some records may still need to be retained where required for business or legal reasons."] },
      { eyebrow: "POLICY UPDATES", title: "Check this page for the latest version.", paragraphs: ["Traverse says it may revise the policy as the service changes, update the effective date, and notify users about significant changes through the app."] },
      { eyebrow: "CONTACT", title: "Questions about privacy?", paragraphs: ["For questions or requests about personal information, email the Traverse team. Do not include passwords, payment-card numbers, or other sensitive credentials."], points: [{ title: "Privacy contact", text: "info@traversevpn.com", href: "mailto:info@traversevpn.com?subject=Privacy%20request" }] },
    ],
  },
  {
    slug: "terms-of-use",
    title: "Terms of use.",
    kicker: "TERMS & CONDITIONS",
    intro: "This page brings the published Traverse VPN Terms and Conditions into the new site. It covers service use, subscriptions, acceptable use, and the limitations described in the original terms.",
    actions: [{ label: "View plans", href: "/plans" }, { label: "Contact Traverse", href: "/contact-us" }],
    sections: [
      { eyebrow: "ACCEPTANCE & SCOPE", title: "These terms cover the site, apps, and paid service.", paragraphs: ["The published terms apply when you visit the website, download or use a Traverse app, or subscribe to premium features. If you accept them for a company account, you confirm that you can agree on that organization’s behalf. Stop using the service if you do not agree."] },
      { eyebrow: "ACCOUNT & SERVICE", title: "Keep account information accurate and secure.", paragraphs: ["You are responsible for activity under your account and for providing accurate information. Traverse describes the VPN service as protecting internet traffic and says it does not log browsing activity. The service may be paused or changed for maintenance and operational reasons."] },
      { eyebrow: "LICENSE", title: "Use the app for personal or authorized business purposes.", paragraphs: ["A subscription gives you a limited right to use Traverse while the service is available. The published terms prohibit copying, reselling, reverse engineering, or attempting to compromise the app or network. The technology and materials remain the company’s property."] },
      { eyebrow: "SUBSCRIPTIONS & BILLING", title: "Review renewal and cancellation details at checkout.", paragraphs: ["The price and billing interval are shown in the app store or checkout used for purchase. Mobile plans may renew automatically. To stop a renewal, use the relevant store settings and cancel at least 24 hours before the current period ends, as stated in the published terms. Business plans may have separate agreed billing terms."] },
      { eyebrow: "REFUNDS", title: "Refund requests follow the purchase channel.", paragraphs: ["Apple handles refund decisions for iOS purchases and Google Play handles Android purchases. Contact Traverse for direct Enterprise or Business agreements. Read the local Refund Policy page for the purchase-specific steps."], points: [{ title: "Refund policy", text: "See where and how to request a refund.", href: "/refund-policy" }] },
      { eyebrow: "ACCEPTABLE USE", title: "Do not use Traverse to harm others or break the law.", paragraphs: ["The published terms prohibit illegal activity, sending spam or harmful files, attacking or disrupting the network, and using the service to obtain copyrighted material unlawfully. The original terms reserve the right to end service for violations."] },
      { eyebrow: "WARRANTIES & LIABILITY", title: "Service availability is not guaranteed.", paragraphs: ["The original terms say the service is provided as available and may not be error-free or uninterrupted. They limit liability for indirect losses and describe a cap tied to the amount paid for the service. These clauses should be reviewed with the company’s legal counsel before publication."] },
      { eyebrow: "CHANGES & CONTACT", title: "Updates may change these terms.", paragraphs: ["The published terms may be revised, with the effective date updated when changes are made. Continued use after an update is treated under the original terms as acceptance of the revised rules. For questions, contact info@traversevpn.com."], points: [{ title: "Contact Traverse", text: "Email the team with questions about these terms.", href: "mailto:info@traversevpn.com?subject=Terms%20question" }] },
    ],
  },
  {
    slug: "vpn-for-streaming",
    title: "A more private stream, wherever you are.",
    kicker: "TRAVERSE FOR STREAMING",
    intro: "Keep your connection protected while you watch, travel, or switch between screens. Content availability depends on the streaming service and your location.",
    actions: [{ label: "Explore plans", href: "/plans" }, { label: "Choose your app", href: "/download" }],
    sections: [
      { eyebrow: "ON THE MOVE", title: "Take your usual privacy with you.", paragraphs: ["Connect through a VPN when using shared Wi-Fi at a hotel, airport, or café. Your traffic travels through an encrypted connection between your device and the VPN server."] },
      { eyebrow: "YOUR CONNECTION", title: "A steadier way to get online.", paragraphs: ["Network speed depends on your internet provider, distance to the server, device, and streaming service. Try a nearby server if playback feels slow, and check the service’s own terms and availability when travelling."] },
      { eyebrow: "ONE ACCOUNT", title: "Switch between supported screens.", paragraphs: ["Use Traverse on supported phones and computers. Visit the app guide to see platform-specific information."], points: [{ title: "All supported apps", text: "Browse platform pages.", href: "/download" }] },
    ],
  },
  {
    slug: "vpn-for-gaming",
    title: "Keep your connection in the game.",
    kicker: "TRAVERSE FOR GAMING",
    intro: "Add an encrypted route to your online gaming connection, with the choice of server location in your hands. Actual latency depends on your route and network conditions.",
    actions: [{ label: "See plans", href: "/plans" }, { label: "Get the app", href: "/download" }],
    sections: [
      { eyebrow: "YOUR ROUTE", title: "Choose a server with care.", paragraphs: ["A VPN adds a routing step, so it may increase or reduce latency depending on the route. Start with a nearby server and compare your in-game connection before settling on one."] },
      { eyebrow: "SHARED NETWORKS", title: "Play on public Wi-Fi with more confidence.", paragraphs: ["Encrypting your traffic can help protect your connection on networks you do not control. It does not replace account security, device updates, or a strong password."] },
      { eyebrow: "GET SET UP", title: "Find Traverse for your device.", paragraphs: ["Choose a supported platform to see installation details and app information."], points: [{ title: "Browse apps", text: "Windows, macOS, Linux, iOS, and Android.", href: "/download" }, { title: "Connection protection", text: "See the full feature list.", href: "/features" }] },
    ],
  },
  {
    slug: "security",
    title: "Protection for the connections you make.",
    kicker: "TRAVERSE SECURITY",
    intro: "Traverse brings encryption, IP masking, and connection safeguards together to help protect everyday browsing on the networks you use.",
    actions: [{ label: "View all features", href: "/features" }, { label: "Read the FAQs", href: "/faqs" }],
    sections: [
      { eyebrow: "ENCRYPTION", title: "Protect traffic in transit.", paragraphs: ["A VPN encrypts traffic between your device and the VPN server, helping reduce exposure on shared or untrusted networks. Protection depends on the VPN being connected and configured correctly."] },
      { eyebrow: "IP & LEAK SAFEGUARDS", title: "Keep your connection details private.", paragraphs: ["Traverse includes IP masking and leak protection features designed to reduce accidental exposure of DNS, WebRTC, and IP details while using the VPN."] },
      { eyebrow: "WHEN A CONNECTION DROPS", title: "A safeguard for interrupted tunnels.", paragraphs: ["A Kill Switch can pause internet traffic if the VPN connection drops, helping prevent traffic from continuing outside the protected tunnel. Check your app settings to confirm the feature is enabled."] },
    ],
  },
];

export const sitemapGroups = [
  { title: "Explore Traverse", links: [{ label: "Home", href: "/" }, { label: "Features", href: "/features" }, { label: "Plans", href: "/plans" }, { label: "Enterprise", href: "/enterprise" }, { label: "Blog", href: "/blog" }, { label: "FAQs", href: "/faqs" }] },
  { title: "Company", links: companyLinks },
  { title: "Platforms & use cases", links: platformLinks },
  { title: "Legal", links: legalLinks.slice(0, 2) },
];
