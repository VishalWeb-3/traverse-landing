import type { Metadata } from "next";
import "./globals.css";
import BottomGlassBar from "./bottom-glass-bar";

export const metadata: Metadata = {
  title: "Traverse VPN — Secure Every Connection",
  description: "Protect your connection with Traverse VPN. Browse more privately with AES-256 encryption, IP masking, and fast global servers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<BottomGlassBar /></body></html>;
}
