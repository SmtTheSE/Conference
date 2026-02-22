"use client";

import { useState, useEffect } from "react";

const API_PRODUCT1 = "http://localhost:5001";

interface PredictionResult {
    predicted_price_local: number;
    predicted_price_usd: number;
    currency_local: string;
    crypto_price_btc: number;
    crypto_price_eth: number;
    nlp_insight: string;
    estimated_monthly_rent_local: number | null;
    demand_score: number;
    location: string;
    country: string;
}

interface ComparisonResult {
    comparisons: Array<{
        country: string;
        location: string;
        target_price_usd: number;
        difference_usd: number;
        difference_pct: number;
    }>;
}

export default function MarketIntelligence() {
    const [locationMap, setLocationMap] = useState<Record<string, string[]>>({});
    const [countries, setCountries] = useState<string[]>([]);

    // Form State
    const [country, setCountry] = useState<string>("");
    const [locationSearch, setLocationSearch] = useState("");
    const [location, setLocation] = useState<string>("");
    const [bedrooms, setBedrooms] = useState("1");
    const [bathrooms, setBathrooms] = useState("1");
    const [area, setArea] = useState("35");
    const [propertyType, setPropertyType] = useState("Condo");

    // Flow State
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [comparison, setComparison] = useState<ComparisonResult | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_PRODUCT1}/locations`)
            .then(res => res.json())
            .then(data => {
                setLocationMap(data);
                const countriesList = Object.keys(data).sort();
                setCountries(countriesList);
                if (countriesList.length > 0) {
                    setCountry(countriesList[0]);
                }
            })
            .catch(err => console.error("Failed to load locations:", err));
    }, []);

    // Update location when country changes
    useEffect(() => {
        if (country && locationMap[country]) {
            setLocationSearch("");
            setLocation(locationMap[country][0] || "");
        }
    }, [country, locationMap]);

    const filteredLocations = (locationMap[country] || []).filter(loc =>
        loc.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) {
            setError("Please select a location.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);
        setComparison(null);

        const payload = {
            country,
            location,
            bedrooms: parseInt(bedrooms),
            bathrooms: parseInt(bathrooms),
            area_sqm: parseFloat(area),
            property_type: propertyType
        };

        try {
            // 1. Prediction
            const res = await fetch(`${API_PRODUCT1}/predict_price`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Valuation failed to process");
            const data = await res.json();
            setResult(data);

            // 2. Comps
            const allTargets = [
                { country: "Thailand", location: "Sukhumvit" },
                { country: "Vietnam", location: "Quận 1, Hồ Chí Minh" },
                { country: "Malaysia", location: "Kuala Lumpur" },
                { country: "Philippines", location: "Makati" }
            ];
            const targets = allTargets.filter(t => t.country !== payload.country);

            const compRes = await fetch(`${API_PRODUCT1}/compare_markets`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source_location: payload.location,
                    source_country: payload.country,
                    target_locations: targets,
                    bedrooms: payload.bedrooms,
                    bathrooms: payload.bathrooms,
                    area_sqm: payload.area_sqm,
                    property_type: payload.property_type
                })
            });

            if (compRes.ok) {
                const compData = await compRes.json();
                setComparison(compData);
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred during valuation.");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrencyLocal = (val: number, cur: string) => {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(val);
    };
    const formatCurrencyUSD = (val: number) => {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-asean-navy mb-2">Global Market Intelligence</h1>
                <p className="text-text-muted">AI-powered property valuation and cross-border benchmarking.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Form */}
                <div className="lg:col-span-4">
                    <div className="bg-white border-t-4 border-asean-navy shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-bold text-asean-navy mb-4 border-b border-border-light pb-2">Valuation Engine</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Target State</label>
                                <select
                                    className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-asean-navy"
                                    value={country} onChange={e => setCountry(e.target.value)}
                                >
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">District / Zone</label>
                                <div className="flex border border-border-light rounded overflow-hidden">
                                    <input
                                        type="text" placeholder="🔍 Filter..."
                                        className="w-1/3 border-r border-border-light px-2 py-2 text-sm focus:outline-none bg-background-offwhite"
                                        value={locationSearch} onChange={e => setLocationSearch(e.target.value)}
                                    />
                                    <select
                                        className="w-2/3 px-3 py-2 text-sm focus:outline-none bg-white"
                                        value={location} onChange={e => setLocation(e.target.value)}
                                    >
                                        <option value="" disabled>Select location...</option>
                                        {filteredLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Bedrooms</label>
                                    <input
                                        type="number" min="0" className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-asean-navy"
                                        value={bedrooms} onChange={e => setBedrooms(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Bathrooms</label>
                                    <input
                                        type="number" min="0" className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-asean-navy"
                                        value={bathrooms} onChange={e => setBathrooms(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Area (sqm)</label>
                                    <input
                                        type="number" min="10" className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-asean-navy"
                                        value={area} onChange={e => setArea(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Prop Type</label>
                                    <select
                                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-asean-navy"
                                        value={propertyType} onChange={e => setPropertyType(e.target.value)}
                                    >
                                        <option value="Condo">Condominium</option>
                                        <option value="House">House / Villa</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-asean-red hover:bg-asean-red-dark text-white font-bold py-3 mt-4 transition-colors disabled:opacity-50"
                            >
                                {loading ? "Computing Fair Value..." : "Execute Valuation"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side: Results */}
                <div className="lg:col-span-8">
                    <div className="bg-white border-t-4 border-asean-yellow shadow-sm p-6 min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {error && <div className="text-asean-red font-bold mb-4 bg-red-50 p-4 rounded w-full">{error}</div>}

                        {!result && !loading && !error && (
                            <div className="text-text-muted flex flex-col items-center opacity-50">
                                <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p>Awaiting operational parameters.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                                <div className="h-16 bg-gray-200 rounded w-64 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                            </div>
                        )}

                        {result && !loading && (
                            <div className="w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <span className="inline-block px-3 py-1 bg-asean-navy text-white text-xs font-bold uppercase tracking-wider mb-6">AI Prediction Verified</span>

                                <div className="text-5xl md:text-6xl font-black text-asean-navy mb-2 tracking-tight">
                                    {formatCurrencyLocal(result.predicted_price_local, result.currency_local)}
                                </div>
                                <div className="text-xl text-text-muted font-medium mb-8">
                                    Intl Eqv: {formatCurrencyUSD(result.predicted_price_usd)}
                                </div>

                                <div className="bg-background-offwhite border-l-4 border-asean-red p-6 text-left mb-8 mx-auto max-w-2xl text-text-main text-lg italic leading-relaxed">
                                    "{result.nlp_insight}"
                                </div>

                                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
                                    <div className="bg-blue-50 border border-blue-100 p-4">
                                        <div className="text-xs font-bold text-asean-navy-light uppercase tracking-wider mb-1">Est. Gross Rent</div>
                                        <div className="text-xl font-black text-asean-navy">
                                            {result.estimated_monthly_rent_local ? `${formatCurrencyLocal(result.estimated_monthly_rent_local, result.currency_local)} /mo` : 'Data Unavailable'}
                                        </div>
                                    </div>
                                    <div className="bg-red-50 border border-red-100 p-4">
                                        <div className="text-xs font-bold text-asean-red uppercase tracking-wider mb-1">Local Demand Score</div>
                                        <div className="text-xl font-black text-asean-navy">
                                            {result.demand_score} / 100
                                        </div>
                                    </div>
                                </div>

                                {comparison && comparison.comparisons.length > 0 && (
                                    <div className="max-w-xl mx-auto border-t border-border-light pt-6 text-left">
                                        <h4 className="text-sm font-bold text-asean-navy uppercase tracking-wider mb-4 text-center">Cross-Border Valuation Benchmarks</h4>
                                        <div className="bg-white border border-border-light shadow-sm">
                                            {comparison.comparisons.map((comp, idx) => {
                                                const isPositive = comp.difference_pct >= 0;
                                                return (
                                                    <div key={idx} className="flex justify-between items-center p-3 border-b border-border-light last:border-0 hover:bg-gray-50">
                                                        <span className="text-sm font-medium text-text-main">vs. {comp.location}, {comp.country}</span>
                                                        <span className={`text-sm font-bold ${isPositive ? 'text-asean-red' : 'text-green-600'}`}>
                                                            {isPositive ? '+' : ''}{comp.difference_pct.toFixed(2)}%
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
