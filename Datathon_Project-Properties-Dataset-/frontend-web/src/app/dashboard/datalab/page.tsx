"use client";

import { useState } from "react";

const API_PRODUCT1 = "http://localhost:5001";

export default function DynamicDataLab() {
    // Train State
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [apiKey, setApiKey] = useState("AIzaSyAnx2QJ9awa1pBjMVNwOXbWojqYrKsWjOw");
    const [trainLoading, setTrainLoading] = useState(false);
    const [trainStatus, setTrainStatus] = useState("");
    const [trainResult, setTrainResult] = useState<any>(null);
    const [currentUpload, setCurrentUpload] = useState<any>(null);

    // Predict State
    const [modelFile, setModelFile] = useState<File | null>(null);
    const [newDataFile, setNewDataFile] = useState<File | null>(null);
    const [predictLoading, setPredictLoading] = useState(false);
    const [predictResult, setPredictResult] = useState<any>(null);

    const handleTrain = async () => {
        if (!csvFile) return alert("Please upload a CSV dataset.");
        if (!apiKey) return alert("Please enter your Gemini API Key.");

        setTrainLoading(true);
        setTrainStatus("Uploading dataset to secure lab...");
        setTrainResult(null);
        setCurrentUpload(null);

        try {
            // 1. Upload
            const formData = new FormData();
            formData.append("file", csvFile);
            const upRes = await fetch(`${API_PRODUCT1}/upload_dataset`, { method: "POST", body: formData });
            if (!upRes.ok) throw new Error("Upload failed");
            const upData = await upRes.json();
            setCurrentUpload(upData);

            setTrainStatus("Analyzing schema with AI Context Engine...");

            // 2. Analyze
            const azRes = await fetch(`${API_PRODUCT1}/analyze_dataset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataset_id: upData.dataset_id, api_key: apiKey })
            });
            if (!azRes.ok) throw new Error("Analysis failed");
            const azData = await azRes.json();

            if (azData.strategy?.error) throw new Error(`AI Error: ${azData.strategy.error}`);

            setTrainStatus(`Auto-training LightGBM model for target [${azData.strategy.target_variable}]...`);

            // 3. Train
            const trainRes = await fetch(`${API_PRODUCT1}/train_custom_model`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataset_id: upData.dataset_id, strategy: azData.strategy })
            });
            if (!trainRes.ok) throw new Error("Training failed");
            const trainData = await trainRes.json();

            setTrainResult({ strategy: azData.strategy, metrics: trainData });
            setTrainStatus("Model Compiled Successfully.");

        } catch (err: any) {
            console.error(err);
            setTrainStatus(`Error: ${err.message}`);
        } finally {
            setTrainLoading(false);
        }
    };

    const handleIntegrate = async () => {
        if (!currentUpload || !currentUpload.detected_country) return;
        if (!confirm(`Add ${currentUpload.detected_country} to intelligence platform?`)) return;

        try {
            const res = await fetch(`${API_PRODUCT1}/integrate_country`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    dataset_id: currentUpload.dataset_id,
                    country_name: currentUpload.detected_country,
                    currency: currentUpload.detected_currency
                })
            });
            if (!res.ok) throw new Error("Integration failed");
            alert(`✅ ${currentUpload.detected_country} integrated!`);
        } catch (err: any) {
            alert(`Error integrating country: ${err.message}`);
        }
    };

    const handlePredict = async () => {
        if (!modelFile || !newDataFile) return alert("Upload both model (.zip) and dataset (.csv)");

        setPredictLoading(true);
        setPredictResult(null);

        try {
            const dataForm = new FormData();
            dataForm.append("file", newDataFile);
            const dataRes = await fetch(`${API_PRODUCT1}/upload_dataset`, { method: "POST", body: dataForm });
            if (!dataRes.ok) throw new Error("Data upload failed");
            const dataData = await dataRes.json();

            const modelForm = new FormData();
            modelForm.append("model", modelFile);
            const modelRes = await fetch(`${API_PRODUCT1}/upload_model`, { method: "POST", body: modelForm });
            if (!modelRes.ok) throw new Error("Model upload failed");
            const modelData = await modelRes.json();

            const predRes = await fetch(`${API_PRODUCT1}/predict_with_model`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model_id: modelData.model_id, dataset_id: dataData.dataset_id })
            });

            if (!predRes.ok) throw new Error("Prediction failed");
            const predData = await predRes.json();
            setPredictResult(predData);

        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setPredictLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-asean-navy mb-2">Dynamic Data Lab</h1>
                <p className="text-text-muted">Authorize automated LightGBM model training and batch processing on sovereign datasets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Train Card */}
                <div className="bg-white border-t-4 border-asean-navy shadow-sm p-8">
                    <h3 className="text-lg font-bold text-asean-navy mb-6 border-b border-border-light pb-2">Initialize Core Model</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Raw Dataset (.csv)</label>
                            <input
                                type="file" accept=".csv"
                                className="w-full text-sm border border-border-light p-2 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-asean-navy/10 file:text-asean-navy hover:file:bg-asean-navy/20"
                                onChange={e => setCsvFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Analyzer AI Key (Gemini required)</label>
                            <input
                                type="password"
                                className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-asean-navy"
                                value={apiKey} onChange={e => setApiKey(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleTrain} disabled={trainLoading}
                            className="w-full bg-asean-navy hover:bg-asean-navy-light text-white font-bold py-3 mt-4 transition-colors disabled:opacity-50"
                        >
                            {trainLoading ? "Processing Request..." : "Launch Training Sequence"}
                        </button>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-sm font-bold text-asean-navy mb-2 uppercase tracking-wider">Telemetry Output</h4>
                        <div className={`p-4 rounded border text-sm ${trainResult ? 'border-green-200 bg-green-50 text-green-800' : 'border-border-light bg-background-offwhite text-text-main'}`}>
                            {trainStatus || "Awaiting dataset upload..."}

                            {trainResult && (
                                <div className="mt-4 pt-4 border-t border-green-200">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold">Target Variable:</span>
                                        <span>{trainResult.strategy.target_variable}</span>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold">Model Engine:</span>
                                        <span>{trainResult.metrics.model_type_used}</span>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold">R² Accuracy:</span>
                                        <span>{(trainResult.metrics.metrics.r2 * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="font-bold">RMSE:</span>
                                        <span>{trainResult.metrics.metrics.rmse.toFixed(2)}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <a
                                            href={`${API_PRODUCT1}/download_model/${trainResult.metrics.model_id}`}
                                            className="flex-1 bg-white border border-green-300 text-green-700 text-center py-2 font-bold text-xs uppercase tracking-wider hover:bg-green-100 transition-colors"
                                        >
                                            Download Weights (.zip)
                                        </a>
                                        {currentUpload?.detected_country && (
                                            <button
                                                onClick={handleIntegrate}
                                                className="flex-1 bg-asean-red text-white py-2 font-bold text-xs uppercase tracking-wider hover:bg-asean-red-dark transition-colors"
                                            >
                                                Publish to Intel Hub
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Predict Card */}
                <div className="bg-white border-t-4 border-asean-yellow shadow-sm p-8">
                    <h3 className="text-lg font-bold text-asean-navy mb-6 border-b border-border-light pb-2">Batch Inference Engine</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Compiled Model (.zip)</label>
                            <input
                                type="file" accept=".zip"
                                className="w-full text-sm border border-border-light p-2 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-asean-navy/10 file:text-asean-navy hover:file:bg-asean-navy/20"
                                onChange={e => setModelFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Target Application Array (.csv)</label>
                            <input
                                type="file" accept=".csv"
                                className="w-full text-sm border border-border-light p-2 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-asean-navy/10 file:text-asean-navy hover:file:bg-asean-navy/20"
                                onChange={e => setNewDataFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        <button
                            onClick={handlePredict} disabled={predictLoading}
                            className="w-full border-2 border-asean-navy text-asean-navy hover:bg-asean-navy hover:text-white font-bold py-3 mt-4 transition-colors disabled:opacity-50"
                        >
                            {predictLoading ? "Processing Array..." : "Execute Batch Prediction"}
                        </button>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-sm font-bold text-asean-navy mb-2 uppercase tracking-wider">Inference Output</h4>
                        <div className={`p-4 rounded border text-sm max-h-64 overflow-y-auto ${predictResult ? 'border-asean-navy-light bg-[#f0f7fc] text-asean-navy' : 'border-border-light bg-background-offwhite text-text-main'}`}>
                            {!predictResult && "Awaiting inference execution..."}

                            {predictResult && (
                                <div>
                                    <div className="font-bold mb-2">Target: {predictResult.target} | Processed: {predictResult.count} records</div>
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-blue-200">
                                                <th className="py-2">Index</th>
                                                <th className="py-2">Predicted Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {predictResult.predictions.map((p: any) => (
                                                <tr key={p.row} className="border-b border-blue-100 last:border-0">
                                                    <td className="py-1">Row {p.row}</td>
                                                    <td className="py-1 font-mono font-bold">{p.predicted_value.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
