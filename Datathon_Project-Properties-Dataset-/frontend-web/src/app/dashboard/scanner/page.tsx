"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const API_PRODUCT2 = "http://localhost:5002";

// ─── Types ───────────────────────────────────────────────────────────────────

interface YieldData {
  annual_yield_pct: number;
  country: string;
  location: string;
  median_monthly_rent_usd: number;
  median_sale_price_usd: number;
}

interface GapData {
  country: string;
  gap_score: number;
  interest_density?: number;
  location: string;
  median_price?: number;
  search_volume?: number;
  supply_count?: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatUsd = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);

const COUNTRY_FLAG: Record<string, string> = {
  Vietnam: "🇻🇳",
  Philippines: "🇵🇭",
  Thailand: "🇹🇭",
  Malaysia: "🇲🇾",
  Singapore: "🇸🇬",
  Indonesia: "🇮🇩",
};

function flag(country: string) {
  return COUNTRY_FLAG[country] ?? "🌏";
}

// ─── Yield Zone Modal ─────────────────────────────────────────────────────────

function YieldModal({
  item,
  onClose,
}: {
  item: YieldData;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Derive a rough tier label
  const tier =
    item.annual_yield_pct >= 9
      ? { label: "PREMIUM YIELD", color: "#16a34a", bg: "#14532d" }
      : item.annual_yield_pct >= 6
      ? { label: "HIGH YIELD", color: "#22c55e", bg: "#15803d" }
      : item.annual_yield_pct >= 4
      ? { label: "MODERATE YIELD", color: "#facc15", bg: "#854d0e" }
      : { label: "LOW YIELD", color: "#f87171", bg: "#7f1d1d" };

  // Monthly → annual cross-check
  const annualRentUsd = item.median_monthly_rent_usd * 12;
  const grossYieldCalc =
    item.median_sale_price_usd > 0
      ? (annualRentUsd / item.median_sale_price_usd) * 100
      : null;

  // Gauge: yield mapped to 0-100 (cap at 15%)
  const gaugeWidth = Math.min(100, (item.annual_yield_pct / 15) * 100);
  const gaugeColor =
    item.annual_yield_pct >= 9
      ? "#16a34a"
      : item.annual_yield_pct >= 6
      ? "#22c55e"
      : item.annual_yield_pct >= 4
      ? "#eab308"
      : "#ef4444";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl"
        style={{
          background: "#000000",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="sticky top-0 z-10 px-6 py-5 flex items-start justify-between"
          style={{
            background: "#000000",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "#22c55e15", border: "1px solid #22c55e35" }}
            >
              📈
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full"
                  style={{
                    background: `${tier.color}20`,
                    color: tier.color,
                    border: `1px solid ${tier.color}50`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: tier.color }}
                  />
                  {tier.label}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {flag(item.country)} {item.country}
                </span>
              </div>
              <h2 className="text-xl font-black text-white leading-tight">
                {item.location}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Top Yield Zone · ASEAN Opportunity Scanner
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 mt-1"
          >
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-6 space-y-5">

          {/* Yield Hero */}
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "#22c55e10", border: "1px solid #22c55e30" }}
          >
            <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1">
              Annual Gross Yield
            </p>
            <div
              className="text-6xl font-black"
              style={{ color: gaugeColor }}
            >
              {item.annual_yield_pct.toFixed(1)}
              <span className="text-2xl">%</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cross-checked via median rent ÷ sale price methodology
            </p>
          </div>

          {/* Yield Gauge */}
          <div
            className="rounded-xl p-4"
            style={{ background: "#ffffff06", border: "1px solid #ffffff10" }}
          >
            <div className="flex justify-between text-[9px] text-slate-500 mb-1.5">
              <span>0%</span>
              <span className="font-bold text-slate-400">
                Yield Strength (vs 15% cap)
              </span>
              <span>15%+</span>
            </div>
            <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${gaugeWidth}%`,
                  background: `linear-gradient(90deg, ${gaugeColor}80, ${gaugeColor})`,
                }}
              />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Full Financial Profile
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Median Sale Price",
                  value: formatUsd(item.median_sale_price_usd),
                  sub: "Market entry cost",
                  color: "#60a5fa",
                },
                {
                  label: "Monthly Rent (Est.)",
                  value: formatUsd(item.median_monthly_rent_usd),
                  sub: "Median rental income",
                  color: "#34d399",
                },
                {
                  label: "Annual Rent Income",
                  value: formatUsd(annualRentUsd),
                  sub: "Monthly × 12",
                  color: "#a78bfa",
                },
                {
                  label: "Computed Gross Yield",
                  value: grossYieldCalc != null ? `${grossYieldCalc.toFixed(2)}%` : "—",
                  sub: "Annual rent ÷ sale price",
                  color: gaugeColor,
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-4"
                  style={{ background: "#ffffff08", border: "1px solid #ffffff12" }}
                >
                  <div className="text-xl font-black mb-0.5" style={{ color: m.color }}>
                    {m.value}
                  </div>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Location + Country */}
          <div
            className="rounded-xl p-4 flex items-center justify-between"
            style={{ background: "#ffffff06", border: "1px solid #ffffff10" }}
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Market Location
              </p>
              <p className="text-lg font-black text-white">{item.location}</p>
              <p className="text-xs text-slate-400">
                {flag(item.country)} {item.country} — ASEAN Secondary Market
              </p>
            </div>
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ background: "#ffffff0a" }}
            >
              {flag(item.country)}
            </div>
          </div>

          {/* Signal Assessment */}
          <div
            className="rounded-xl p-4"
            style={{ background: "#22c55e08", border: "1px solid #22c55e30" }}
          >
            <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-2">
              ASEAN Intelligence Signal
            </p>
            <p className="text-sm text-white leading-relaxed">
              {item.annual_yield_pct >= 8
                ? `${item.location} ranks as a premium yield zone within the ASEAN secondary market corridor. At ${item.annual_yield_pct.toFixed(1)}% gross, it outperforms the regional average by a significant margin. Entry price of ${formatUsd(item.median_sale_price_usd)} provides strong capital efficiency with a monthly rental income of ${formatUsd(item.median_monthly_rent_usd)}.`
                : item.annual_yield_pct >= 5
                ? `${item.location} presents a solid yield opportunity at ${item.annual_yield_pct.toFixed(1)}% gross annual return. This market balances income stability with accessible entry pricing. Monthly rental income of ${formatUsd(item.median_monthly_rent_usd)} against a ${formatUsd(item.median_sale_price_usd)} median price signals a well-functioning rental market.`
                : `${item.location} shows moderate yield characteristics at ${item.annual_yield_pct.toFixed(1)}%. Lower yields may reflect capital appreciation potential or market maturity. Consider for long-term hold strategy rather than yield-first positioning.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Gap / Divergence Modal ───────────────────────────────────────────────────

function GapModal({
  item,
  onClose,
}: {
  item: GapData;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Gap score tier (0–100 range assumed)
  const gapTier =
    item.gap_score >= 75
      ? { label: "CRITICAL GAP", color: "#ef4444", accent: "#dc2626" }
      : item.gap_score >= 50
      ? { label: "HIGH GAP", color: "#f97316", accent: "#ea580c" }
      : item.gap_score >= 25
      ? { label: "MODERATE GAP", color: "#eab308", accent: "#ca8a04" }
      : { label: "LOW GAP", color: "#94a3b8", accent: "#64748b" };

  const gaugeWidth = Math.min(100, item.gap_score);
  const supplyCount = item.supply_count ?? 0;
  const searchVolume = item.search_volume ?? 0;
  const interestDensity = item.interest_density ?? 0;
  const medianPrice = item.median_price ?? 0;

  const demandSupplyRatio =
    supplyCount > 0
      ? (searchVolume / supplyCount).toFixed(1)
      : "∞";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          border: `2px solid ${gapTier.color}40`,
        }}
      >
        {/* ── Header ── */}
        <div
          className="sticky top-0 z-10 px-6 py-5 flex items-start justify-between"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderBottom: `1px solid ${gapTier.color}25`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: `${gapTier.color}15`,
                border: `1px solid ${gapTier.color}35`,
              }}
            >
              💎
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full"
                  style={{
                    background: `${gapTier.color}20`,
                    color: gapTier.color,
                    border: `1px solid ${gapTier.color}50`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: gapTier.color }}
                  />
                  {gapTier.label}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {flag(item.country)} {item.country}
                </span>
              </div>
              <h2 className="text-xl font-black text-white leading-tight">
                {item.location}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Market Divergence Zone · ASEAN Opportunity Scanner
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 mt-1"
          >
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-6 space-y-5">

          {/* MEI Score Hero */}
          <div
            className="rounded-xl p-5 text-center"
            style={{
              background: `${gapTier.color}10`,
              border: `1px solid ${gapTier.color}30`,
            }}
          >
            <p
              className="text-[10px] font-black uppercase tracking-widest mb-1"
              style={{ color: gapTier.color }}
            >
              Market Efficiency Index (MEI) Score
            </p>
            <div
              className="text-6xl font-black"
              style={{ color: gapTier.color }}
            >
              {Math.round(item.gap_score)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Higher score = greater market inefficiency = higher opportunity
            </p>
          </div>

          {/* Gap Score Bar */}
          <div
            className="rounded-xl p-4"
            style={{ background: "#ffffff06", border: "1px solid #ffffff10" }}
          >
            <div className="flex justify-between text-[9px] text-slate-500 mb-1.5">
              <span>Low Divergence</span>
              <span className="font-bold text-slate-400">Market Divergence Gauge</span>
              <span>Critical Gap</span>
            </div>
            <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${gaugeWidth}%`,
                  background: `linear-gradient(90deg, #22c55e, #eab308, #ef4444)`,
                }}
              />
            </div>
            <div className="flex justify-center mt-2">
              <span
                className="inline-block px-3 py-1 text-xs font-black rounded tracking-widest text-white"
                style={{ background: gapTier.accent }}
              >
                {gapTier.label} · Score {Math.round(item.gap_score)}
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Full Market Intelligence
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Median Listing Price",
                  value: formatUsd(medianPrice),
                  sub: "Mid-market entry cost",
                  color: "#60a5fa",
                },
                {
                  label: "Listing Supply",
                  value: `${supplyCount.toLocaleString()} units`,
                  sub: "Active inventory count",
                  color: "#f472b6",
                },
                {
                  label: "Search Volume",
                  value: searchVolume.toLocaleString(),
                  sub: "Buyer interest signals",
                  color: "#a78bfa",
                },
                {
                  label: "Interest Density",
                  value: interestDensity.toFixed(2),
                  sub: "Search ÷ area normalization",
                  color: "#fb923c",
                },
                {
                  label: "Demand / Supply Ratio",
                  value: `${demandSupplyRatio}×`,
                  sub: "Search volume ÷ supply count",
                  color: gapTier.color,
                },
                {
                  label: "MEI Gap Score",
                  value: Math.round(item.gap_score).toString(),
                  sub: "Market efficiency index",
                  color: gapTier.color,
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-4"
                  style={{ background: "#ffffff08", border: "1px solid #ffffff12" }}
                >
                  <div className="text-xl font-black mb-0.5" style={{ color: m.color }}>
                    {m.value}
                  </div>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div
            className="rounded-xl p-4 flex items-center justify-between"
            style={{ background: "#ffffff06", border: "1px solid #ffffff10" }}
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Market Location
              </p>
              <p className="text-lg font-black text-white">{item.location}</p>
              <p className="text-xs text-slate-400">
                {flag(item.country)} {item.country} — ASEAN Secondary Market
              </p>
            </div>
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ background: "#ffffff0a" }}
            >
              {flag(item.country)}
            </div>
          </div>

          {/* Signal Assessment */}
          <div
            className="rounded-xl p-4"
            style={{
              background: `${gapTier.color}08`,
              border: `1px solid ${gapTier.color}30`,
            }}
          >
            <p
              className="text-[10px] font-black uppercase tracking-widest mb-2"
              style={{ color: gapTier.color }}
            >
              ASEAN Intelligence Signal
            </p>
            <p className="text-sm text-white leading-relaxed">
              {item.gap_score >= 75
                ? `${item.location} is flagged as a CRITICAL divergence zone. Buyer demand (${searchVolume.toLocaleString()} signals) massively outpaces supply (${supplyCount} units) — demand/supply ratio at ${demandSupplyRatio}×. This market inefficiency creates a structural pricing advantage for early-entry investors before equilibrium is reached.`
                : item.gap_score >= 50
                ? `${item.location} shows significant market divergence with ${searchVolume.toLocaleString()} interest signals against ${supplyCount} supply units. The ${demandSupplyRatio}× demand-to-supply ratio indicates supply constraints that typically precede a pricing uplift. MEI score of ${Math.round(item.gap_score)} places this zone in the high-priority acquisition tier.`
                : item.gap_score >= 25
                ? `${item.location} presents moderate market inefficiency. While demand and supply are not yet critically mismatched, the gap score of ${Math.round(item.gap_score)} suggests opportunity for yield optimization. Monitor interest density trends for early correction signals.`
                : `${item.location} shows low divergence characteristics at MEI score ${Math.round(item.gap_score)}. Market appears relatively efficient. Consider this as a defensive, stability-oriented position rather than an aggressive value-gap play.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OpportunityScanner() {
  const [country, setCountry] = useState("");
  const [yields, setYields] = useState<YieldData[]>([]);
  const [gaps, setGaps] = useState<GapData[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedYield, setSelectedYield] = useState<YieldData | null>(null);
  const [selectedGap, setSelectedGap] = useState<GapData | null>(null);

  // Pagination
  const [yieldPage, setYieldPage] = useState(1);
  const [gapPage, setGapPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = useCallback(async () => {
    setLoading(true);
    const query = country ? `?country=${encodeURIComponent(country)}` : "";

    try {
      const [yieldRes, gapRes] = await Promise.all([
        fetch(`${API_PRODUCT2}/get_yields${query}`),
        fetch(`${API_PRODUCT2}/gap_analysis${query}`),
      ]);

      const yieldData = await yieldRes.json();
      const gapData = await gapRes.json();

      setYields(yieldData.data || []);
      setGaps(gapData.data || []);
      setYieldPage(1);
      setGapPage(1);
    } catch (err) {
      console.error("Scanner failed:", err);
    } finally {
      setLoading(false);
    }
  }, [country]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentYields = yields.slice(
    (yieldPage - 1) * itemsPerPage,
    yieldPage * itemsPerPage
  );
  const currentGaps = gaps.slice(
    (gapPage - 1) * itemsPerPage,
    gapPage * itemsPerPage
  );

  return (
    <div className="animate-in fade-in duration-500">

      {/* Modals */}
      {selectedYield && (
        <YieldModal item={selectedYield} onClose={() => setSelectedYield(null)} />
      )}
      {selectedGap && (
        <GapModal item={selectedGap} onClose={() => setSelectedGap(null)} />
      )}

      {/* ── Page Header ── */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-1 h-5 bg-asean-red" />
            <span className="text-[10px] font-black text-asean-red uppercase tracking-[0.3em]">
              Scanner Intel Terminal
            </span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">
            Opportunity Scanner
          </h1>
          <p className="text-white/50 text-sm font-medium uppercase tracking-widest">
            Identifying high-yield zones and market inefficiencies.{" "}
            <span className="text-asean-red">
              Execute card for deep intelligence.
            </span>
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <select
            className="bg-black border border-white/20 rounded-none px-4 py-2 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-asean-red text-white shadow-sm"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="Vietnam">🇻🇳 Vietnam</option>
            <option value="Philippines">🇵🇭 Philippines</option>
            <option value="Thailand">🇹🇭 Thailand</option>
            <option value="Malaysia">🇲🇾 Malaysia</option>
          </select>
          <button
            onClick={fetchData}
            className="bg-white text-black px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm border border-white"
          >
            Refresh Logs
          </button>
        </div>

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="h-8 bg-gray-200 rounded w-56 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* ── Yield Zones ── */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">
                Top Yield Corridors
              </h3>
              <span className="text-[10px] text-white/40 font-black uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1">
                {yields.length} Logs
              </span>
            </div>

            {yields.length === 0 ? (
              <div className="bg-white border border-border-light p-8 text-center text-text-muted rounded-xl">
                No yield data available.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {currentYields.map((item, i) => {
                  const tier =
                    item.annual_yield_pct >= 9
                      ? { color: "#16a34a", bg: "#f0fdf4", border: "#86efac", label: "Premium ⚡" }
                      : item.annual_yield_pct >= 6
                      ? { color: "#22c55e", bg: "#f0fdf4", border: "#86efac", label: "High Yield ⚡" }
                      : item.annual_yield_pct >= 4
                      ? { color: "#ca8a04", bg: "#fefce8", border: "#fde68a", label: "Moderate" }
                      : { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", label: "Low Yield" };
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedYield(item)}
                      className="group text-left w-full glass-card transition-all duration-300 red-glow border border-white/10 relative overflow-hidden"
                    >
                      {/* Technical Accent line */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-asean-red opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="p-5">
                        {/* Country + Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                            {flag(item.country)} {item.country}
                          </span>
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full"
                            style={{
                              background: tier.bg,
                              color: tier.color,
                              border: `1px solid ${tier.border}`,
                            }}
                          >
                            {tier.label}
                          </span>
                        </div>

                        {/* Location Name */}
                        <h4
                          className="text-base font-black text-asean-navy mb-4 truncate group-hover:underline decoration-dotted decoration-2 underline-offset-2"
                          title={`${item.location}, ${item.country}`}
                        >
                          {item.location}
                        </h4>

                        {/* Core Metrics */}
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">
                              Gross Return
                            </div>
                            <div
                              className="text-3xl font-black tech-value"
                              style={{ color: tier.color }}
                            >
                              {item.annual_yield_pct.toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">
                              Entry Price
                            </div>
                            <div className="text-sm font-black text-white tech-value">
                              {formatUsd(item.median_sale_price_usd)}
                            </div>
                            <div className="text-[9px] font-bold text-white/30 uppercase">
                              {formatUsd(item.median_monthly_rent_usd)}/mo
                            </div>
                          </div>
                        </div>

                        {/* CTA */}
                        <div
                          className="w-full flex items-center justify-center gap-1.5 py-3 rounded-none text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 transition-all text-white/50"
                        >
                          Access Deep Intel
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Yield Pagination */}
            {yields.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-4">
                <button
                  disabled={yieldPage === 1}
                  onClick={() => setYieldPage((p) => p - 1)}
                  className="px-6 py-2 border border-white/10 bg-black disabled:opacity-20 text-white font-black uppercase tracking-widest transition-all text-[10px]"
                >
                  Prev
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A]">
                  Log {yieldPage} // {Math.ceil(yields.length / itemsPerPage)}
                </span>
                <button
                  disabled={yieldPage === Math.ceil(yields.length / itemsPerPage)}
                  onClick={() => setYieldPage((p) => p + 1)}
                  className="px-6 py-2 border border-white/10 bg-black disabled:opacity-20 text-white font-black uppercase tracking-widest transition-all text-[10px]"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* ── Market Divergence (Gap) Zones ── */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">
                Value Divergence Logs
              </h3>
              <span className="text-[10px] text-white/40 font-black uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1">
                {gaps.length} Signals
              </span>
            </div>

            {gaps.length === 0 ? (
              <div className="bg-white border border-border-light p-8 text-center text-text-muted rounded-xl">
                No gap data available.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {currentGaps.map((item, i) => {
                  const gapColor =
                    item.gap_score >= 75
                      ? "#ef4444"
                      : item.gap_score >= 50
                      ? "#f97316"
                      : item.gap_score >= 25
                      ? "#eab308"
                      : "#94a3b8";
                  const gapLabel =
                    item.gap_score >= 75
                      ? "Critical Gap 🚨"
                      : item.gap_score >= 50
                      ? "High Gap 💎"
                      : item.gap_score >= 25
                      ? "Moderate Gap"
                      : "Low Gap";
                  const gapBg =
                    item.gap_score >= 50 ? "#fef2f2" : item.gap_score >= 25 ? "#fffbeb" : "#f8fafc";
                  const gapBorder =
                    item.gap_score >= 50 ? "#fecaca" : item.gap_score >= 25 ? "#fde68a" : "#e2e8f0";

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedGap(item)}
                      className="group text-left w-full glass-card transition-all duration-300 red-glow border border-white/10 relative overflow-hidden"
                    >
                      {/* Technical Accent line */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-asean-red opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="p-5">
                        {/* Country + Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                            {flag(item.country)} {item.country}
                          </span>
                          <span
                            className="inline-flex items-center gap-1 px-3 py-0.5 text-[9px] font-black uppercase tracking-widest"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              color: gapColor,
                              border: `1px solid ${gapBorder}40`,
                            }}
                          >
                            {gapLabel}
                          </span>
                        </div>

                        {/* Location Name */}
                        <h4
                          className="text-base font-black text-white mb-6 uppercase tracking-tighter"
                          title={`${item.location}, ${item.country}`}
                        >
                          {item.location}
                        </h4>

                        {/* MEI Score + Gap Bar */}
                        <div className="mb-6">
                          <div className="flex justify-between items-end mb-4">
                            <div>
                              <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">
                                MEI Signal
                              </div>
                              <div
                                className="text-4xl font-black tech-value"
                                style={{ color: gapColor }}
                              >
                                {Math.round(item.gap_score)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">
                                Listing Load
                              </div>
                              <div className="text-sm font-black text-white tech-value">
                                {(item.supply_count ?? 0)} units
                              </div>
                              <div className="text-[9px] font-bold text-white/30 uppercase">
                                {(item.search_volume ?? 0).toLocaleString()} Intel
                              </div>
                            </div>
                          </div>
                          {/* Mini bar */}
                          <div className="h-1 bg-white/5 overflow-hidden">
                            <div
                              className="h-full transition-all duration-1000"
                              style={{
                                width: `${Math.min(100, item.gap_score)}%`,
                                background: gapColor,
                              }}
                            />
                          </div>
                        </div>

                        {/* CTA */}
                        <div
                          className="w-full flex items-center justify-center gap-1.5 py-3 rounded-none text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 transition-all text-white/50"
                        >
                          Execute Intelligence
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Gap Pagination */}
            {gaps.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-4">
                <button
                  disabled={gapPage === 1}
                  onClick={() => setGapPage((p) => p - 1)}
                  className="px-4 py-2 border border-border-light bg-white disabled:opacity-40 text-asean-navy font-bold rounded transition-colors"
                >
                  ←
                </button>
                <span className="text-sm text-text-muted">
                  Page {gapPage} of {Math.ceil(gaps.length / itemsPerPage)}
                </span>
                <button
                  disabled={gapPage === Math.ceil(gaps.length / itemsPerPage)}
                  onClick={() => setGapPage((p) => p + 1)}
                  className="px-4 py-2 border border-border-light bg-white disabled:opacity-40 text-asean-navy font-bold rounded transition-colors"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {/* ── Thesis Footer ── */}
      <div className="bg-white border-t-4 border-t-asean-red py-20 px-10 text-center mt-20 -mx-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-asean-red mb-6">ByteMe Core Thesis Statement</p>
          <p className="text-3xl md:text-5xl font-black leading-none uppercase tracking-tighter italic text-[#0A0A0A]">
            "Computational Rigor + Cultural Intelligence = Market Transparency."
          </p>
          <p className="text-sm font-bold text-[#4A5568] mt-10 uppercase tracking-[0.3em] leading-relaxed">
            Remove the cultural layer → false-positive rate triples. <span className="text-asean-red">The culture is not decoration. It is high-fidelity data.</span>
          </p>
        </div>
      </div>

    </div>
  );
}
