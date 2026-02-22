"use client";

import { useState, useEffect } from "react";

const API_PRODUCT2 = "http://localhost:5002";

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
    interest_density: number;
    location: string;
    median_price: number;
    search_volume: number;
    supply_count: number;
}

export default function OpportunityScanner() {
    const [country, setCountry] = useState("");
    const [yields, setYields] = useState<YieldData[]>([]);
    const [gaps, setGaps] = useState<GapData[]>([]);
    const [loading, setLoading] = useState(true);

    // Pagination states
    const [yieldPage, setYieldPage] = useState(1);
    const [gapPage, setGapPage] = useState(1);
    const itemsPerPage = 6;

    const fetchData = async () => {
        setLoading(true);
        const query = country ? `?country=${encodeURIComponent(country)}` : "";

        try {
            const [yieldRes, gapRes] = await Promise.all([
                fetch(`${API_PRODUCT2}/get_yields${query}`),
                fetch(`${API_PRODUCT2}/gap_analysis${query}`)
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
    };

    useEffect(() => {
        fetchData();
    }, [country]);

    // Derived arrays for pagination
    const currentYields = yields.slice((yieldPage - 1) * itemsPerPage, yieldPage * itemsPerPage);
    const currentGaps = gaps.slice((gapPage - 1) * itemsPerPage, gapPage * itemsPerPage);

    const formatUsd = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-asean-navy mb-2">Opportunity Scanner</h1>
                    <p className="text-text-muted">Identify high-yield zones and market inefficiencies.</p>
                </div>

                <div className="flex gap-4 items-center">
                    <select
                        className="border border-border-light rounded px-4 py-2 text-sm focus:outline-none focus:border-asean-navy font-medium bg-white shadow-sm"
                        value={country} onChange={e => setCountry(e.target.value)}
                    >
                        <option value="">All Markets</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Malaysia">Malaysia</option>
                    </select>
                    <button
                        onClick={fetchData}
                        className="bg-asean-navy text-white px-6 py-2 rounded-sm text-sm font-bold hover:bg-asean-navy-light transition-colors"
                    >
                        Refresh Intel
                    </button>
                </div>
            </div>

            {loading && (
                <div className="animate-pulse space-y-8">
                    <div className="h-64 bg-gray-200 rounded"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            )}

            {!loading && (
                <>
                    {/* Yields Section */}
                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-asean-navy mb-6 border-b-2 border-border-light pb-2 inline-block">Top Yield Zones</h3>

                        {yields.length === 0 ? (
                            <div className="bg-white border border-border-light p-8 text-center text-text-muted">No yield data available.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {currentYields.map((item, i) => (
                                    <div key={i} className="bg-white border text-left border-border-light shadow-sm hover:shadow-md transition-shadow">
                                        <div className="border-t-4 border-green-500 p-5">
                                            <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-3">High Yield ⚡</span>
                                            <h4 className="text-lg font-bold text-asean-navy mb-4 truncate" title={`${item.location}, ${item.country}`}>{item.location}</h4>

                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Gross Return</div>
                                                    <div className="text-3xl font-black text-green-600">{item.annual_yield_pct.toFixed(1)}%</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Entry Price</div>
                                                    <div className="text-sm font-bold text-asean-navy">{formatUsd(item.median_sale_price_usd)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Yields */}
                        {yields.length > itemsPerPage && (
                            <div className="flex justify-center items-center gap-4">
                                <button
                                    disabled={yieldPage === 1} onClick={() => setYieldPage(p => p - 1)}
                                    className="px-4 py-2 border border-border-light bg-white disabled:opacity-50 text-asean-navy font-bold hover:bg-gray-50"
                                >←</button>
                                <span className="text-sm text-text-muted">Page {yieldPage} of {Math.ceil(yields.length / itemsPerPage)}</span>
                                <button
                                    disabled={yieldPage === Math.ceil(yields.length / itemsPerPage)} onClick={() => setYieldPage(p => p + 1)}
                                    className="px-4 py-2 border border-border-light bg-white disabled:opacity-50 text-asean-navy font-bold hover:bg-gray-50"
                                >→</button>
                            </div>
                        )}
                    </div>

                    {/* Gaps Section */}
                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-asean-navy mb-6 border-b-2 border-border-light pb-2 inline-block">Market Divergence (Value Gaps)</h3>

                        {gaps.length === 0 ? (
                            <div className="bg-white border border-border-light p-8 text-center text-text-muted">No gap data available.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {currentGaps.map((item, i) => (
                                    <div key={i} className="bg-white border text-left border-border-light shadow-sm hover:shadow-md transition-shadow">
                                        <div className="border-t-4 border-asean-red p-5">
                                            <span className="inline-block px-2 py-1 bg-red-50 text-asean-red text-xs font-bold uppercase tracking-wider mb-3">Value Gap 💎</span>
                                            <h4 className="text-lg font-bold text-asean-navy mb-4 truncate" title={`${item.location}, ${item.country}`}>{item.location}, {item.country}</h4>

                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-xs text-text-muted uppercase tracking-wider mb-1">MEI Score</div>
                                                    <div className="text-3xl font-black text-asean-red">{Math.round(item.gap_score)}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Listing Supply</div>
                                                    <div className="text-sm font-bold text-asean-navy">{item.supply_count} units</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Gaps */}
                        {gaps.length > itemsPerPage && (
                            <div className="flex justify-center items-center gap-4">
                                <button
                                    disabled={gapPage === 1} onClick={() => setGapPage(p => p - 1)}
                                    className="px-4 py-2 border border-border-light bg-white disabled:opacity-50 text-asean-navy font-bold hover:bg-gray-50"
                                >←</button>
                                <span className="text-sm text-text-muted">Page {gapPage} of {Math.ceil(gaps.length / itemsPerPage)}</span>
                                <button
                                    disabled={gapPage === Math.ceil(gaps.length / itemsPerPage)} onClick={() => setGapPage(p => p + 1)}
                                    className="px-4 py-2 border border-border-light bg-white disabled:opacity-50 text-asean-navy font-bold hover:bg-gray-50"
                                >→</button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
