import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ultimate Byteme - ASEAN Intelligence",
  description: "Pan-Asian Real Estate Intelligence, Valuation, and Cultural AI Interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        {/* Simple ASEAN-style top header */}
        <header className="bg-asean-navy text-white text-sm font-medium border-b-4 border-asean-red">
          <div className="container-asean h-12 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/" className="hover:text-asean-yellow transition-colors">Home</a>
              <a href="https://synergia.slc-sflu.edu.ph/" className="hover:text-asean-yellow transition-colors">About Synergia</a>
              <a href="#markets" className="hover:text-asean-yellow transition-colors">Markets</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="opacity-80">Welcome to Ultimate Byteme Portal</span>
            </div>
          </div>
        </header>

        {/* Main Brand Header */}
        <div className="bg-white border-b border-border-light shadow-sm sticky top-0 z-50">
          <div className="container-asean h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-asean-navy rounded flex items-center justify-center text-white font-bold text-xl">
                UB
              </div>
              <div>
                <h1 className="text-xl font-bold text-asean-navy leading-none">ULTIMATE BYTEME</h1>
                <span className="text-xs text-text-muted font-medium tracking-wider">REAL ESTATE INTELLIGENCE</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 font-semibold text-text-main">
              <a href="#products" className="hover:text-asean-navy transition-colors">AI Products</a>
              <a href="#stats" className="hover:text-asean-navy transition-colors">Market Stats</a>
              <a href="#formula" className="hover:text-asean-navy transition-colors">MEI Formula</a>
              <a href="/dashboard" className="bg-asean-red text-white px-6 py-2 rounded-sm hover:bg-asean-red-dark transition-colors">
                Launch System
              </a>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* ASEAN style dense footer */}
        <footer className="bg-asean-navy-dark text-white pt-16 pb-8 mt-20 border-t-8 border-asean-red">
          <div className="container-asean grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-asean-yellow text-sm font-bold uppercase tracking-wider mb-4">About Project</h4>
              <p className="text-sm text-gray-300 opacity-90 leading-relaxed">
                Ultimate Byteme is a Pan-Asian Real Estate Intelligence platform built for the SYNERGIA 2026 Datathon. It provides proxy yields, legal AI analysis, and market efficiency indexing for 4 key nations.
              </p>
            </div>
            <div>
              <h4 className="text-asean-yellow text-sm font-bold uppercase tracking-wider mb-4">Core AI Products</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li><a href="#" className="hover:text-white">Global Market Intelligence</a></li>
                <li><a href="#" className="hover:text-white">Investment Scanner</a></li>
                <li><a href="#" className="hover:text-white">Cultural AI Assistant</a></li>
                <li><a href="#" className="hover:text-white">Dynamic Data Lab</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-asean-yellow text-sm font-bold uppercase tracking-wider mb-4">Covered Markets</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li><a href="#" className="hover:text-white">Vietnam (HCMC, Hanoi)</a></li>
                <li><a href="#" className="hover:text-white">Thailand (Bangkok, Phuket)</a></li>
                <li><a href="#" className="hover:text-white">Philippines (Makati, BGC)</a></li>
                <li><a href="#" className="hover:text-white">Malaysia (KL, Penang)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-asean-yellow text-sm font-bold uppercase tracking-wider mb-4">Technology Stack</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Next.js / TypeScript App Router</li>
                <li>LightGBM Regressor Models</li>
                <li>Gemini 1.5 Flash (Cloud)</li>
                <li>qwen2.5:7b (Local Ollama)</li>
              </ul>
            </div>
          </div>
          <div className="container-asean pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2026 Ultimate Byteme. SYNERGIA Research Project.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
              <span>Contact Team</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
