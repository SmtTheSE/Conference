import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ByteMe - ASEAN Property Intelligence",
  description: "Research-grade AI-powered property valuation and cross-border intelligence for ASEAN secondary markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-[#F5F6F8]`}>

        <SiteHeader />

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-[#E2E8F0] mt-20">
          {/* Red accent top line */}
          <div className="h-1 bg-asean-red w-full" />
          <div className="container-asean pt-24 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-asean-red flex items-center justify-center text-white font-bold text-xs">
                    BM
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[#0A0A0A]">ByteMe</span>
                </div>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  AI-powered real estate intelligence for the ASEAN region. Synthesizing market efficiency, cultural context, and predictive valuation.
                </p>
              </div>
 
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-5 text-asean-red">Core Systems</h4>
                <ul className="text-xs text-[#4A5568] space-y-3">
                  <li><a href="#" className="hover:text-asean-red transition-colors">Market Valuator</a></li>
                  <li><a href="#" className="hover:text-asean-red transition-colors">Yield Scanner</a></li>
                  <li><a href="#" className="hover:text-asean-red transition-colors">Cultural Intelligence</a></li>
                  <li><a href="#" className="hover:text-asean-red transition-colors">Data Laboratory</a></li>
                </ul>
              </div>
 
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-5 text-asean-red">Markets</h4>
                <ul className="text-xs text-[#4A5568] space-y-3">
                  <li><a href="#" className="hover:text-asean-red transition-colors">Philippines</a></li>
                  <li><a href="#" className="hover:text-asean-red transition-colors">Vietnam</a></li>
                  <li><a href="#" className="hover:text-asean-red transition-colors">Thailand</a></li>
                  <li><a href="#" className="hover:text-asean-red transition-colors">Malaysia</a></li>
                </ul>
              </div>
 
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-5 text-asean-red">Technical</h4>
                <ul className="text-xs text-[#4A5568] space-y-3">
                  <li className="text-[#0A0A0A]">Next.js 15 / TypeScript</li>
                  <li className="text-[#0A0A0A]">LightGBM Core Engine</li>
                  <li className="text-[#0A0A0A]">Transfer Learning (SG→PH)</li>
                  <li className="text-[#0A0A0A]">Community Sentinel NLP</li>
                </ul>
              </div>
            </div>
 
            <div className="pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[11px] text-[#718096] uppercase tracking-wider">
                © 2026 ByteMe · Synergia 2026 Research Project
              </p>
              <div className="flex gap-8 text-[11px] text-[#718096] uppercase tracking-wider">
                <span className="hover:text-asean-red cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-asean-red cursor-pointer transition-colors">Terms</span>
                <span className="hover:text-asean-red cursor-pointer transition-colors">Contact</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
