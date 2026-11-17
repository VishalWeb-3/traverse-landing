import type { Metadata } from "next";
import "./globals.css";
import BottomGlassBar from "./bottom-glass-bar";
import { SITE_URL } from "../lib/seo";

// SEO and marketing tags below are carried over unchanged from the original traversevpn.com site
// (verification, icons, GA4, GTM, Clarity), so the redesign does not affect tracking or indexing.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Traverse VPN",
  description: "Secure VPN",
  verification: {
    google: "google900c9a43832bc520",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#010101",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <head>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-RV53DPG3LZ" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RV53DPG3LZ');
            `,
        }}
      />
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PHG846SL');`,
        }}
      />
      {/* End Google Tag Manager */}
      {/* Microsoft Clarity */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wnrbh6kh5s");
            `,
        }}
      />
      {/* End Microsoft Clarity */}
    </head>
    <body>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PHG846SL" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      {children}
      <BottomGlassBar />
    </body>
  </html>;
}
