import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-[#F5F6F8]">

      {/* HERO SECTION */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="container-asean py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="section-label">Synergia 2026 Research Project</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] leading-tight mb-6">
              AI-Powered Real Estate Intelligence<br />
              for <span className="text-asean-red">ASEAN Secondary Markets</span>
            </h1>

            <p className="text-[15px] text-[#4A5568] leading-relaxed max-w-2xl mb-10">
              ByteMe synthesizes market efficiency indexing, transfer-learned valuation models,
              and cultural sentiment intelligence to deliver research-grade property insights
              across the Pan-Asian secondary corridor.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-asean-red text-white text-[13px] font-semibold px-6 py-3 hover:bg-asean-red-dark transition-colors"
              >
                Open Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#formula"
                className="inline-flex items-center gap-2 border border-[#E2E8F0] bg-white text-[#4A5568] text-[13px] font-medium px-6 py-3 hover:border-[#CBD5E0] hover:text-[#0A0A0A] transition-colors"
              >
                Explore Methodology
              </a>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#E2E8F0] mt-16 divide-x divide-[#E2E8F0]">
            {[
              { value: "4", label: "Markets Covered", note: "VN · TH · PH · MY" },
              { value: "3", label: "AI Core Engines", note: "Valuation · Scanner · Advisory" },
              { value: "0.93", label: "Peak R² Score", note: "LightGBM Regressor" },
              { value: "±4.2%", label: "Validation MAE", note: "JLL 2025 Audit" },
            ].map((s) => (
              <div key={s.label} className="py-8 px-6 text-center bg-white">
                <div className="text-3xl font-bold text-[#0A0A0A] metric-value mb-1">{s.value}</div>
                <div className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wide mb-1">{s.label}</div>
                <div className="text-[10px] text-asean-red font-medium uppercase tracking-widest">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE CARDS */}
      <section className="py-20" id="products">
        <div className="container-asean">
          <div className="mb-10">
            <span className="section-label">System Modules</span>
            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-3 mb-2">Intelligence Architecture</h2>
            <p className="text-[14px] text-[#4A5568]">
              Three specialized AI engines operating across ASEAN secondary property markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Module 01 */}
            <div className="bg-white border border-[#E2E8F0] border-t-4 border-t-asean-red p-8 group hover:shadow-md transition-shadow">
              <div className="text-[10px] font-bold text-[#718096] uppercase tracking-widest mb-6">Module 01</div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Global Market Valuator</h3>
              <p className="text-[13px] text-[#4A5568] leading-relaxed mb-8">
                LightGBM-powered valuation engine with transfer learning from Singapore, Malaysia, and Thailand to Philippine secondary markets.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["LightGBM", "Transfer Learning", "Cross-Border"].map(t => (
                  <span key={t} className="text-[10px] font-semibold bg-[#F5F6F8] text-[#4A5568] border border-[#E2E8F0] px-2 py-1 uppercase tracking-wide">{t}</span>
                ))}
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-asean-red hover:underline"
              >
                Launch Engine
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Module 02 */}
            <div className="bg-white border border-[#E2E8F0] border-t-4 border-t-[#0F2A4A] p-8 group hover:shadow-md transition-shadow">
              <div className="text-[10px] font-bold text-[#718096] uppercase tracking-widest mb-6">Module 02</div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Opportunity Scanner</h3>
              <p className="text-[13px] text-[#4A5568] leading-relaxed mb-8">
                Identifies high-yield zones and structural market inefficiencies using the ByteMe Market Efficiency Index across La Union and Iloilo.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["MEI Index", "Yield Analysis", "Gap Detection"].map(t => (
                  <span key={t} className="text-[10px] font-semibold bg-[#F5F6F8] text-[#4A5568] border border-[#E2E8F0] px-2 py-1 uppercase tracking-wide">{t}</span>
                ))}
              </div>
              <Link
                href="/dashboard/scanner"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0F2A4A] hover:underline"
              >
                Launch Scanner
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Module 03 */}
            <div className="bg-white border border-[#E2E8F0] border-t-4 border-t-[#059669] p-8 group hover:shadow-md transition-shadow">
              <div className="text-[10px] font-bold text-[#718096] uppercase tracking-widest mb-6">Module 03</div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Cultural AI Assistant</h3>
              <p className="text-[13px] text-[#4A5568] leading-relaxed mb-8">
                Pan-Asian real estate legal and cultural expert powered by local LLM with sentiment weighting across ASEAN jurisdictions.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["NLP Sentiment", "Legal Context", "Cultural Weight"].map(t => (
                  <span key={t} className="text-[10px] font-semibold bg-[#F5F6F8] text-[#4A5568] border border-[#E2E8F0] px-2 py-1 uppercase tracking-wide">{t}</span>
                ))}
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#059669] hover:underline"
              >
                Ask Assistant
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY FORMULA */}
      <section className="py-16 bg-white border-y border-[#E2E8F0]" id="formula">
        <div className="container-asean">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Core Methodology</span>
              <h2 className="text-2xl font-bold text-[#0A0A0A] mt-3 mb-4">Market Efficiency Index</h2>
              <p className="text-[14px] text-[#4A5568] leading-relaxed mb-6">
                The ByteMe MEI formula synthesizes Sentiment Volume Index, Infrastructure Density, and Market Price Score to surface structurally undervalued zones before regional market equilibrium occurs.
              </p>
              <p className="text-[14px] text-[#4A5568] leading-relaxed">
                Removing the cultural layer triples the false-positive rate. Culture is not decoration — it is high-fidelity data.
              </p>
            </div>
            <div className="bg-[#F5F6F8] border border-[#E2E8F0] p-10 text-center">
              <div className="text-[11px] font-bold text-[#718096] uppercase tracking-widest mb-6">Formula</div>
              <div className="text-3xl md:text-4xl font-bold text-[#0A0A0A] metric-value mb-6">
                MEI = (SVI + ID) / MPS
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-[11px]">
                <div>
                  <div className="font-bold text-asean-red text-sm metric-value">SVI</div>
                  <div className="text-[#718096] mt-1">Sentiment Volume Index</div>
                </div>
                <div>
                  <div className="font-bold text-asean-red text-sm metric-value">ID</div>
                  <div className="text-[#718096] mt-1">Infrastructure Density</div>
                </div>
                <div>
                  <div className="font-bold text-asean-red text-sm metric-value">MPS</div>
                  <div className="text-[#718096] mt-1">Market Price Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETS GRID */}
      <section className="py-20" id="markets">
        <div className="container-asean">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="section-label">Regional Coverage</span>
              <h2 className="text-2xl font-bold text-[#0A0A0A] mt-3">Market Intelligence Grid</h2>
            </div>
            <Link
              href="/dashboard"
              className="text-[13px] font-semibold text-asean-red hover:underline inline-flex items-center gap-1"
            >
              Access Full Data
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { flag: "🇻🇳", country: "Vietnam", cities: "HCMC · Hanoi · Nha Trang", metric: "Peak Yield: 20.4%", accent: "text-asean-red" },
              { flag: "🇹🇭", country: "Thailand", cities: "Bangkok · Sukhumvit · Phuket", metric: "Model R²: 0.93", accent: "text-[#0F2A4A]" },
              { flag: "🇵🇭", country: "Philippines", cities: "Makati · BGC · Iloilo", metric: "Secondary Markets: Active", accent: "text-asean-red" },
              { flag: "🇲🇾", country: "Malaysia", cities: "KL · Penang · Ipoh", metric: "MEI Score: 5.54", accent: "text-[#059669]" },
            ].map((m) => (
              <div
                key={m.country}
                className="bg-white border border-[#E2E8F0] p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{m.flag}</div>
                <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-1">{m.country}</h3>
                <p className="text-[11px] text-[#718096] mb-4 uppercase tracking-wide">{m.cities}</p>
                <div className={`text-[11px] font-bold uppercase tracking-wide ${m.accent}`}>{m.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
