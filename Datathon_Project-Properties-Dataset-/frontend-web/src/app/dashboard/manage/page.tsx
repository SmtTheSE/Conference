"use client";

import { useState, useEffect } from "react";

const API_PRODUCT1 = "http://localhost:5001";

interface Country {
    name: string;
    currency: string;
    added_at: string;
}

interface Model {
    model_id: string;
    target: string;
    model_type: string;
    rmse: number | null;
    r2: number | null;
}

export default function ManageData() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [loadingModels, setLoadingModels] = useState(true);

    const fetchCountries = async () => {
        setLoadingCountries(true);
        try {
            const res = await fetch(`${API_PRODUCT1}/list_dynamic_countries`);
            const data = await res.json();
            setCountries(data.countries || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingCountries(false);
        }
    };

    const fetchModels = async () => {
        setLoadingModels(true);
        try {
            const res = await fetch(`${API_PRODUCT1}/list_saved_models`);
            const data = await res.json();
            setModels(data.models || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingModels(false);
        }
    };

    useEffect(() => {
        fetchCountries();
        fetchModels();
    }, []);

    const deleteCountry = async (name: string) => {
        if (!confirm(`Delete ${name}? All corresponding models and data will be removed.`)) return;
        try {
            const res = await fetch(`${API_PRODUCT1}/delete_country/${name}`, { method: 'DELETE' });
            const data = await res.json();
            if (res.ok) {
                alert(`✅ ${data.message}`);
                fetchCountries();
            } else {
                alert(`❌ ${data.error}`);
            }
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    const deleteModel = async (id: string) => {
        if (!confirm('Delete this model?')) return;
        try {
            const res = await fetch(`${API_PRODUCT1}/delete_model/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (res.ok) {
                alert(`✅ ${data.message}`);
                fetchModels();
            } else {
                alert(`❌ ${data.error}`);
            }
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-asean-navy mb-2">Dataset & Model Vault</h1>
                <p className="text-text-muted">Manage provisioned registry environments and custom inference models.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Countries Table */}
                <div className="bg-white border-t-4 border-asean-navy shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-border-light pb-2">
                        <h3 className="text-lg font-bold text-asean-navy">Registered Market Vectors</h3>
                        <button
                            onClick={fetchCountries} disabled={loadingCountries}
                            className="text-xs font-bold bg-background-offwhite hover:bg-gray-200 text-asean-navy px-3 py-1 rounded transition-colors"
                        >
                            {loadingCountries ? 'Syncing...' : 'Refresh Registry'}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-border-light text-xs uppercase tracking-wider text-text-muted">
                                    <th className="py-2 px-2">Country</th>
                                    <th className="py-2 px-2">Currency</th>
                                    <th className="py-2 px-2">Added</th>
                                    <th className="py-2 px-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countries.length === 0 && !loadingCountries && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-6 text-text-muted italic">No dynamic countries registered.</td>
                                    </tr>
                                )}
                                {countries.map(c => (
                                    <tr key={c.name} className="border-b border-border-light last:border-0 hover:bg-background-offwhite transition-colors">
                                        <td className="py-3 px-2 font-bold text-text-main">{c.name}</td>
                                        <td className="py-3 px-2 font-mono text-sm">{c.currency}</td>
                                        <td className="py-3 px-2 text-sm text-text-muted">{new Date(c.added_at).toLocaleDateString()}</td>
                                        <td className="py-3 px-2 text-right">
                                            <button
                                                onClick={() => deleteCountry(c.name)}
                                                className="text-xs font-bold text-asean-red hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Models Table */}
                <div className="bg-white border-t-4 border-asean-navy shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-border-light pb-2">
                        <h3 className="text-lg font-bold text-asean-navy">Compiled Models Matrix</h3>
                        <button
                            onClick={fetchModels} disabled={loadingModels}
                            className="text-xs font-bold bg-background-offwhite hover:bg-gray-200 text-asean-navy px-3 py-1 rounded transition-colors"
                        >
                            {loadingModels ? 'Syncing...' : 'Refresh Models'}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-border-light text-xs uppercase tracking-wider text-text-muted">
                                    <th className="py-2 px-2">Target Variable</th>
                                    <th className="py-2 px-2">Type</th>
                                    <th className="py-2 px-2">R²</th>
                                    <th className="py-2 px-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {models.length === 0 && !loadingModels && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-6 text-text-muted italic">No custom models compiled.</td>
                                    </tr>
                                )}
                                {models.map(m => (
                                    <tr key={m.model_id} className="border-b border-border-light last:border-0 hover:bg-background-offwhite transition-colors">
                                        <td className="py-3 px-2 font-bold text-text-main">{m.target}</td>
                                        <td className="py-3 px-2 text-sm text-text-muted truncate max-w-[100px]" title={m.model_type}>{m.model_type}</td>
                                        <td className="py-3 px-2 font-mono text-sm text-green-600">{m.r2 ? m.r2.toFixed(3) : 'N/A'}</td>
                                        <td className="py-3 px-2 text-right space-x-2">
                                            <a
                                                href={`${API_PRODUCT1}/download_model/${m.model_id}`}
                                                className="inline-block text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 transition-colors"
                                                title="Download Weights (.zip)"
                                            >
                                                ⬇️
                                            </a>
                                            <button
                                                onClick={() => deleteModel(m.model_id)}
                                                className="inline-block text-xs font-bold bg-red-50 text-asean-red px-2 py-1 rounded hover:bg-red-100 transition-colors"
                                                title="Delete Model"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
