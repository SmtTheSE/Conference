"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
      {/* Red accent top line */}
      <div className="h-1 bg-asean-red w-full" />

      <div className="container-asean h-16 flex items-center justify-between">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-asean-red flex items-center justify-center text-white font-bold text-xs">
            BM
          </div>
          <div>
            <div className="text-sm font-bold text-[#0A0A0A] leading-none tracking-wide uppercase">
              ByteMe
            </div>
            <div className="text-[10px] font-medium text-[#718096] tracking-widest uppercase mt-0.5">
              ASEAN Intelligence
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "AI Products", href: "/#products" },
            { label: "Market Stats", href: "/#stats" },
            { label: "Methodology", href: "/#formula" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium text-[#4A5568] hover:text-[#0A0A0A] transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/dashboard"
            className="text-[13px] font-semibold px-5 py-2 bg-asean-red text-white hover:bg-asean-red-dark transition-colors"
          >
            Open Dashboard
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#4A5568]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E2E8F0] px-6 py-4 space-y-3">
          {[
            { label: "AI Products", href: "/#products" },
            { label: "Market Stats", href: "/#stats" },
            { label: "Methodology", href: "/#formula" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-[13px] font-medium text-[#4A5568] hover:text-[#0A0A0A] py-1"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="block text-[13px] font-semibold px-5 py-2 bg-asean-red text-white text-center"
            onClick={() => setMenuOpen(false)}
          >
            Open Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
