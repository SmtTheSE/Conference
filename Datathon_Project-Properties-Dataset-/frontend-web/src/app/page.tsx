import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION - 50/50 Split (Navy/Image) */}
      <section className="flex flex-col md:flex-row min-h-[500px]">
        {/* Left: Navy Content Block */}
        <div className="w-full md:w-[45%] bg-asean-navy text-white flex flex-col justify-center px-8 md:px-16 py-16 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-asean-red transform translate-x-12 -translate-y-12 rotate-45 opacity-20"></div>

          <div className="mb-6 fade-in-up">
            <span className="inline-block px-3 py-1 bg-asean-red text-white text-xs font-bold tracking-wider uppercase mb-4">
              Synergia 2026
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-white">
              Real Estate<br />Intelligence,<br />Redefined.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
              Harness AI-powered valuation, Market Efficiency Index scanning, and legal cultural guidance across Vietnam, Thailand, Philippines, and Malaysia.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/dashboard" className="bg-asean-yellow text-asean-navy font-bold px-8 py-3 hover:bg-white transition-colors">
                Launch Platform
              </a>
              <a href="#products" className="border border-white/30 text-white font-semibold px-8 py-3 hover:bg-white/10 transition-colors">
                Explore Products
              </a>
            </div>
          </div>
        </div>

        {/* Right: Visual Area */}
        <div className="w-full md:w-[55%] bg-gray-200 relative min-h-[400px]">
          <img
            src="https://rmaward.asia/wp-content/uploads/2024/08/Seal_of_ASEAN.svg-1.png"
            alt="ASEAN Seal"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply transition-opacity duration-1000"
          />
          {/* Fallback sophisticated gradient behind the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-asean-navy-light to-asean-navy-dark opacity-90 overflow-hidden -z-10">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          {/* ASEAN style floating stats overlapping the image */}
          <div className="absolute bottom-10 left-10 right-10 flex gap-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white p-5 shadow-xl border-l-4 border-asean-red flex-1">
              <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Top Yield Zone</p>
              <p className="text-3xl font-black text-asean-navy">20.4%</p>
              <p className="text-sm text-text-muted">Nhà Bè · HCMC</p>
            </div>
            <div className="bg-white p-5 shadow-xl border-l-4 border-asean-yellow flex-1 hidden sm:block">
              <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">MEI Index</p>
              <p className="text-3xl font-black text-asean-navy">5.54</p>
              <p className="text-sm text-text-muted">Ipoh · Malaysia</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS BANDS - White/Gray alternating */}
      <section className="bg-background-offwhite py-12 border-b border-border-light" id="stats">
        <div className="container-asean">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border-light">
            <div className="px-4">
              <p className="text-5xl font-black text-asean-red mb-2">4</p>
              <h3 className="text-sm font-bold text-asean-navy uppercase tracking-wider">Markets Covered</h3>
              <p className="text-xs text-text-muted mt-2">VN, TH, PH, MY</p>
            </div>
            <div className="px-4">
              <p className="text-5xl font-black text-asean-navy mb-2">3</p>
              <h3 className="text-sm font-bold text-asean-navy uppercase tracking-wider">AI Engines</h3>
              <p className="text-xs text-text-muted mt-2">Valuation, Scan, Culture</p>
            </div>
            <div className="px-4">
              <p className="text-5xl font-black text-asean-red mb-2">0.93</p>
              <h3 className="text-sm font-bold text-asean-navy uppercase tracking-wider">Peak R² Score</h3>
              <p className="text-xs text-text-muted mt-2">LightGBM Accuracy</p>
            </div>
            <div className="px-4">
              <p className="text-5xl font-black text-asean-navy mb-2">Live</p>
              <h3 className="text-sm font-bold text-asean-navy uppercase tracking-wider">Local Processing</h3>
              <p className="text-xs text-text-muted mt-2">Ollama qwen2.5:7b</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-PILLAR EDITORIAL CARDS */}
      <section className="py-20" id="products">
        <div className="container-asean">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-asean-navy mb-4">Three Pillars of Market Intelligence</h2>
            <div className="w-16 h-1 bg-asean-red mx-auto mb-6"></div>
            <p className="text-text-muted text-lg">
              Each product is a focused layer of insight, designed to provide investors with a comprehensive understanding of Pan-Asian real estate variants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-border-light shadow-sm hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-asean-navy p-6 flex items-end relative overflow-hidden">
                <div className="absolute top-4 right-4 text-white/20 font-black text-6xl">01</div>
                <h3 className="text-white text-xl font-bold relative z-10">Global Market Intelligence</h3>
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-asean-red uppercase tracking-wider mb-3 block">Valuation Engine</span>
                <p className="text-text-main mb-6 line-clamp-4">
                  LightGBM-powered valuation engine delivering Fair Market Values, proxy rent estimates, and demand scoring. Cross-country price benchmarking made instant.
                </p>
                <a href="#" className="inline-flex items-center text-asean-navy font-bold hover:text-asean-red transition-colors">
                  Launch Valuation <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-border-light shadow-sm hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-asean-navy-light p-6 flex items-end relative overflow-hidden">
                <div className="absolute top-4 right-4 text-white/20 font-black text-6xl">02</div>
                <h3 className="text-white text-xl font-bold relative z-10">Opportunity Scanner</h3>
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-asean-red uppercase tracking-wider mb-3 block">Yield Gap Analysis</span>
                <p className="text-text-main mb-6 line-clamp-4">
                  Scans thousands of listings to surface High Yield Zones and Value Gaps using the ByteMe Market Efficiency Index (MEI). Identifies where demand outpaces price.
                </p>
                <a href="#" className="inline-flex items-center text-asean-navy font-bold hover:text-asean-red transition-colors">
                  Launch Scanner <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-border-light shadow-sm hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-asean-navy-dark p-6 flex items-end relative overflow-hidden">
                <div className="absolute top-4 right-4 text-white/20 font-black text-6xl">03</div>
                <h3 className="text-white text-xl font-bold relative z-10">Cultural AI Assistant</h3>
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-asean-red uppercase tracking-wider mb-3 block">Legal & Cultural LLM</span>
                <p className="text-text-main mb-6 line-clamp-4">
                  A Pan-Asian real estate legal expert powered by a 3-tier LLM architecture. Ask about Feng Shui, RA 7042, leasehold structures, and navigating foreign ownership.
                </p>
                <a href="#" className="inline-flex items-center text-asean-navy font-bold hover:text-asean-red transition-colors">
                  Ask the AI <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEI FORMULA HIGHLIGHT - Red Impact Block */}
      <section className="bg-asean-red text-white py-20" id="formula">
        <div className="container-asean text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-asean-yellow mb-6">The Analytical Core</h2>
          <div className="text-3xl md:text-5xl font-black mb-8 font-mono bg-asean-red-dark inline-block px-8 py-4 border-2 border-white/20">
            MEI = (SVI + ID) / MPS
          </div>
          <p className="text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            The Market Efficiency Index combines the Search Volume Index and Interest Density, divided by the Median Price per Square Meter, to expose undervalued cross-border opportunities before regional market shifts occur.
          </p>
        </div>
      </section>

      {/* NATIONS / MARKETS GRID */}
      <section className="py-20 bg-background-offwhite" id="markets">
        <div className="container-asean">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-asean-navy pb-4">
            <div>
              <h2 className="text-3xl font-black text-asean-navy">Covered Member States</h2>
              <p className="text-text-muted mt-2">Unified intelligence modelling across 4 strategic regions.</p>
            </div>
            <a href="/dashboard" className="hidden md:inline-flex items-center font-bold text-asean-red hover:text-asean-navy transition-colors">
              View Specific Region Data →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border-t-4 border-asean-red shadow-sm">
              <div className="text-4xl mb-4">🇻🇳</div>
              <h3 className="text-xl font-bold text-asean-navy mb-2">Vietnam</h3>
              <p className="text-sm text-text-muted mb-4">Ho Chi Minh City, Hà Nội, Nha Trang</p>
              <div className="text-xs font-bold text-asean-red">PEAK YIELD: 20.4%</div>
            </div>
            <div className="bg-white p-6 border-t-4 border-asean-navy shadow-sm">
              <div className="text-4xl mb-4">🇹🇭</div>
              <h3 className="text-xl font-bold text-asean-navy mb-2">Thailand</h3>
              <p className="text-sm text-text-muted mb-4">Sukhumvit, Chiang Mai, Phuket</p>
              <div className="text-xs font-bold text-asean-navy">MODEL R²: 0.93</div>
            </div>
            <div className="bg-white p-6 border-t-4 border-asean-yellow shadow-sm">
              <div className="text-4xl mb-4">🇵🇭</div>
              <h3 className="text-xl font-bold text-asean-navy mb-2">Philippines</h3>
              <p className="text-sm text-text-muted mb-4">Makati, BGC, La Union, Iloilo</p>
              <div className="text-xs font-bold text-asean-yellow">RA 7042 MAPPED</div>
            </div>
            <div className="bg-white p-6 border-t-4 border-gray-800 shadow-sm">
              <div className="text-4xl mb-4">🇲🇾</div>
              <h3 className="text-xl font-bold text-asean-navy mb-2">Malaysia</h3>
              <p className="text-sm text-text-muted mb-4">Ipoh, Iskandar, KL Metro</p>
              <div className="text-xs font-bold text-gray-800">MEI HIGH: 5.54</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
