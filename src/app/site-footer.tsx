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
        <a className="footer-pill footer-pill-light" href="/download"><span>{copy.secondaryCta.label}</span><i aria-hidden="true">↗</i></a>
      </div>
    </div>
    <FooterHands />
    <div className="visuvate-footer-content">
      <div className="visuvate-social-grid">
        <a href="/" aria-label="Traverse VPN">◎ <span>Traverse VPN</span><i>↗</i></a>
        <a href="/download" aria-label="VPN apps">in <span>VPN apps</span><i>↗</i></a>
        <a href="/privacy-policy" aria-label="Privacy Policy">𝕏 <span>Privacy Policy</span><i>↗</i></a>
        <a href="/support" aria-label="VPN support">◉ <span>Support</span><i>↗</i></a>
      </div>
      <div className="visuvate-footer-columns">
        <div className="visuvate-footer-group"><h3>Company</h3><a href="/about-us">About Us</a><a href="/contact-us">Contact Us</a><a href="/refund-policy">Refund Policy</a><a href="/support">Support</a></div>
        <div className="visuvate-footer-group visuvate-footer-group--platforms"><h3>Platforms</h3><div className="footer-platform-links"><a href="/download">Download VPN Apps</a><a href="/download/android">VPN for Android</a><a href="/download/ios">VPN for iPhone</a><a href="/vpn-for-business">VPN for Business</a><a href="/vpn-for-streaming">VPN for Streaming</a><a href="/vpn-for-gaming">VPN for Gaming</a><a href="/security">VPN for Security</a><a href="/download/macos">VPN for Mac</a><a href="/download/windows">VPN for Windows</a><a href="/download/linux">VPN for Linux</a></div></div>
      </div>
      <div className="visuvate-footer-legal"><span>© 2026 Traverse VPN. All rights reserved.</span><nav aria-label="Legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms of Use</a><a href="/sitemap">Sitemap</a></nav></div>
    </div>
  </footer>;
}
