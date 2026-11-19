import defaultHomepage from "../../content/pages/home.json";
import FooterHands from "./footer-hands";

type FooterCopy = typeof defaultHomepage.footer;

export default function SiteFooter({ copy = defaultHomepage.footer }: { copy?: FooterCopy }) {
  return <footer className="visuvate-footer">
    <div className="visuvate-footer-wordmark" aria-hidden="true">Traverse</div>
    <div className="visuvate-footer-top">
      <p className="footer-eyebrow">{copy.eyebrow}</p>
      <h2>{copy.headlineLine1}<br />{copy.headlineLine2}</h2>
      <div className="visuvate-footer-actions">
        <a className="footer-pill footer-pill-muted" href="/features"><span>{copy.primaryCta.label}</span><i aria-hidden="true">↗</i></a>
        <a className="footer-pill footer-pill-light" href="/downloads"><span>{copy.secondaryCta.label}</span><i aria-hidden="true">↗</i></a>
      </div>
    </div>
    <FooterHands />
    <div className="visuvate-footer-content">
      <div className="visuvate-social-grid">
        {/* Official Traverse VPN profiles, as linked from the original site's footer. */}
        <a href="https://www.instagram.com/traverse.vpn/" target="_blank" rel="noopener noreferrer"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> <span>Instagram</span><i aria-hidden="true">↗</i></a>
        <a href="https://www.youtube.com/@TraverseVPN" target="_blank" rel="noopener noreferrer"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></svg> <span>YouTube</span><i aria-hidden="true">↗</i></a>
        <a href="https://www.linkedin.com/in/traverse-vpn-7188a53b5/" target="_blank" rel="noopener noreferrer"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.5v.01M12 17v-3.6c0-1.6 1-2.4 2.2-2.4S16 11.8 16 13.4V17M12 10.5V17"/></svg> <span>LinkedIn</span><i aria-hidden="true">↗</i></a>
        <a href="https://www.facebook.com/people/Traverse-Vpn/pfbid0jm3HDEcCYSvkXYHbJrFVDMqZMno8LCmZ1Z6tcDwhzUjiMktjGfYSr67swYbQ5zCbl/" target="_blank" rel="noopener noreferrer"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V9a1 1 0 0 1 1-1z"/></svg> <span>Facebook</span><i aria-hidden="true">↗</i></a>
      </div>
      <div className="visuvate-footer-columns">
        <div className="visuvate-footer-group"><h3>Company</h3><a href="/about-us">About Us</a><a href="/contact-us">Contact Us</a><a href="/refund-policy">Refund Policy</a><a href="/support">Support</a></div>
        <div className="visuvate-footer-group visuvate-footer-group--platforms"><h3>Platforms</h3><div className="footer-platform-links"><a href="/downloads">Download VPN Apps</a><a href="/vpn-for-android">VPN for Android</a><a href="/vpn-for-iphone">VPN for iPhone</a><a href="/vpn-for-business">VPN for Business</a><a href="/vpn-for-streaming">VPN for Streaming</a><a href="/vpn-for-gaming">VPN for Gaming</a><a href="/security">VPN for Security</a><a href="/vpn-for-mac">VPN for Mac</a><a href="/vpn-for-windows">VPN for Windows</a><a href="/vpn-for-linux">VPN for Linux</a></div></div>
      </div>
      <div className="visuvate-footer-legal"><span>© 2026 Traverse VPN. All rights reserved.</span><nav aria-label="Legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms of Use</a><a href="/sitemap">Sitemap</a></nav></div>
    </div>
  </footer>;
}
