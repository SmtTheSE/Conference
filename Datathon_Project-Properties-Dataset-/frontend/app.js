// API Configuration
const API_URLS = {
    product1: 'http://localhost:5001',
    product2: 'http://localhost:5002',
    product3: 'http://localhost:5003'
};

document.addEventListener('DOMContentLoaded', () => {
    const initFunctions = [
        { name: 'Tabs', fn: initTabs },
        { name: 'Market Intelligence', fn: initGlobalIntelligence },
        { name: 'Opportunity Scanner', fn: initOpportunityScanner },
        { name: 'Cultural Assistant', fn: initCulturalAssistant },
        { name: 'Dynamic Data Lab', fn: initDynamicDataLab },
        { name: 'Manage Data', fn: initManageData }
    ];

    initFunctions.forEach(module => {
        try {
            console.log(`🚀 Initializing ${module.name}...`);
            module.fn();
        } catch (err) {
            console.error(`❌ Failed to initialize ${module.name}:`, err);
        }
    });
});

/* --- Tab Navigation --- */
function initTabs() {
    const buttons = document.querySelectorAll('.nav-btn');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            buttons.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) targetContent.classList.add('active');

            // Refresh management lists if switching to manage tab
            if (tabId === 'manage' && typeof refreshManagementLists === 'function') {
                refreshManagementLists();
            }
        });
    });
}

/* --- Product 1: Global Market Intelligence --- */
function initGlobalIntelligence() {
    const form = document.getElementById('priceForm');
    const countrySelect = document.getElementById('country');
    const locationSelect = document.getElementById('location');
    const locationSearch = document.getElementById('locationSearch');
    const resultDisplay = document.querySelector('.big-price');
    const rentDisplay = document.getElementById('rentDisplay');
    const demandDisplay = document.getElementById('demandDisplay');

    // Store locations
    let locationMap = {};

    // Fetch Locations on Load
    fetch(`${API_URLS.product1}/locations`)
        .then(res => res.json())
        .then(data => {
            locationMap = data;

            // Populate country dropdown
            const countries = Object.keys(data).sort();
            countrySelect.innerHTML = countries.map(country =>
                `<option value="${country}">${country}</option>`
            ).join('');

            // Pre-select first country
            if (countries.length > 0) {
                countrySelect.value = countries[0];
                populateLocations(countries[0]);
            }
        })
        .catch(err => console.error("Failed to load locations:", err));

    countrySelect.addEventListener('change', () => {
        if (locationSearch) locationSearch.value = ''; // Reset search on country change
        populateLocations(countrySelect.value);
    });

    if (locationSearch) {
        locationSearch.addEventListener('input', () => {
            populateLocations(countrySelect.value, locationSearch.value);
        });
    }

    function populateLocations(country, filter = '') {
        if (!locationSelect) return;

        const currentSelection = locationSelect.value;
        locationSelect.innerHTML = '<option value="" disabled selected>Select location...</option>';

        if (locationMap[country]) {
            const localities = locationMap[country].filter(loc =>
                loc.toLowerCase().includes(filter.toLowerCase())
            );

            if (localities.length === 0) {
                locationSelect.innerHTML = '<option value="" disabled>No matches found</option>';
                return;
            }

            localities.forEach(loc => {
                const option = document.createElement('option');
                option.value = loc;
                option.textContent = loc;
                locationSelect.appendChild(option);
            });

            // Re-select previously selected if it still exists in the filtered list
            if (localities.includes(currentSelection)) {
                locationSelect.value = currentSelection;
            } else if (localities.length > 0 && filter === '') {
                // Auto-select first only if not filtering
                locationSelect.selectedIndex = 1;
            } else if (localities.length > 0 && filter !== '') {
                // If filtering and we have results, select the first match
                locationSelect.selectedIndex = 1;
            }
        } else {
            locationSelect.innerHTML = '<option value="" disabled>No locations found</option>';
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const selectedLoc = locationSelect ? locationSelect.value : document.getElementById('location').value;
        if (!selectedLoc) {
            alert("Please select a location.");
            return;
        }

        // Show loading state
        resultDisplay.textContent = "Calculating...";
        resultDisplay.classList.add('loading');
        if (rentDisplay) rentDisplay.style.display = 'none';
        if (demandDisplay) demandDisplay.style.display = 'none';

        const compareContainer = document.getElementById('comparisonContainer');
        if (compareContainer) compareContainer.style.display = 'none';

        const data = {
            country: countrySelect.value,
            location: selectedLoc,
            bedrooms: parseInt(document.getElementById('bedrooms').value),
            bathrooms: parseInt(document.getElementById('bathrooms').value),
            area_sqm: parseFloat(document.getElementById('area').value),
            property_type: document.getElementById('type').value
        };

        try {
            const response = await fetch(`${API_URLS.product1}/predict_price`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Prediction failed');

            const result = await response.json();

            // Format Price (Local)
            const formattedPriceLocal = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: result.currency_local,
                maximumFractionDigits: 0
            }).format(result.predicted_price_local);

            // Format Price (USD)
            const formattedPriceUSD = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(result.predicted_price_usd);

            // Handle Rent Display (Show N/A if null)
            let formattedRentLocal = "Data Unavailable";
            if (result.estimated_monthly_rent_local !== null) {
                formattedRentLocal = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: result.currency_local,
                    maximumFractionDigits: 0
                }).format(result.estimated_monthly_rent_local);
            }

            // Update UI
            resultDisplay.textContent = formattedPriceLocal;
            document.getElementById('usdDisplay').textContent = `(Approx. ${formattedPriceUSD})`;

            // Show NLP Insight
            const aiInsight = document.getElementById('aiInsight');
            if (aiInsight) {
                aiInsight.textContent = `"${result.nlp_insight}"`;
                aiInsight.style.display = 'block';
            }

            if (rentDisplay) {
                if (result.estimated_monthly_rent_local !== null) {
                    rentDisplay.textContent = `Est. Rent: ${formattedRentLocal} / mo`;
                    rentDisplay.style.color = 'var(--neon-purple)';
                } else {
                    rentDisplay.textContent = `Est. Rent: Data Not Available`;
                    rentDisplay.style.color = 'var(--text-muted)';
                }
                rentDisplay.style.display = 'block';
            }

            if (demandDisplay) {
                demandDisplay.textContent = `Demand Score: ${result.demand_score}/100`;
                demandDisplay.style.display = 'block';
            }

            // Trigger Comparison
            compareMarkets(data);

        } catch (error) {
            console.error(error);
            resultDisplay.textContent = "Error";
        } finally {
            resultDisplay.classList.remove('loading');
        }
    });

    async function compareMarkets(baseData) {
        const container = document.getElementById('comparisonContainer');
        if (!container) return;

        container.style.display = 'block';
        container.innerHTML = 'Analyzing regional competitors...';

        // Define targets based on selected country (compare to others)
        // Default targets (Capitals/Key Cities)
        const allTargets = [
            { country: 'Thailand', location: 'Sukhumvit' },
            { country: 'Vietnam', location: 'Quận 1, Hồ Chí Minh' },
            { country: 'Malaysia', location: 'Kuala Lumpur' },
            { country: 'Philippines', location: 'Makati' }
        ];

        // Filter out current country
        const targets = allTargets.filter(t => t.country !== baseData.country);

        try {
            const response = await fetch(`${API_URLS.product1}/compare_markets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source_location: baseData.location,
                    source_country: baseData.country,
                    target_locations: targets,
                    bedrooms: baseData.bedrooms,
                    bathrooms: baseData.bathrooms,
                    area_sqm: baseData.area_sqm,
                    property_type: baseData.property_type
                })
            });

            const result = await response.json();

            let html = '<table style="width:100%; text-align:left; margin-top:0.5rem; border-collapse: collapse;">';
            result.comparisons.forEach(comp => {
                const color = comp.difference_pct < 0 ? 'var(--neon-green)' : 'var(--neon-purple)';
                const sign = comp.difference_pct > 0 ? '+' : '';
                html += `
                    <tr>
                        <td style="padding:4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">vs. ${comp.location}, ${comp.country}</td>
                        <td style="text-align:right; color:${color}; font-weight:bold; border-bottom: 1px solid rgba(255,255,255,0.05);">
                            ${sign}${comp.difference_pct}%
                        </td>
                    </tr>
                `;
            });
            html += '</table>';

            container.innerHTML = html;

        } catch (e) {
            console.error(e);
            container.innerHTML = 'Comparison data unavailable.';
            if (yieldGrid) yieldGrid.innerHTML = '<div class="card"><h3>Scanner Offline</h3></div>';
        }
    }
}

/* --- Product 4: Dynamic Data Lab (New) --- */
function initDynamicDataLab() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const csvInput = document.getElementById('csvUpload');
    const keyInput = document.getElementById('apiKey');
    const resultCard = document.getElementById('analysisResult');
    const strategyContent = document.getElementById('aiStrategyContent');
    const modelMetrics = document.getElementById('modelMetrics');

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', async () => {
            const file = csvInput.files[0];
            const key = keyInput.value.trim();

            if (!file) {
                alert("Please upload a CSV file.");
                return;
            }
            if (!key) {
                alert("Please enter a Gemini API Key.");
                return;
            }

            // UI Loading State
            analyzeBtn.textContent = "Uploading & Analyzing...";
            analyzeBtn.disabled = true;
            resultCard.style.display = 'block';
            strategyContent.innerHTML = "Uploading dataset...";

            try {
                // 1. Upload File
                const formData = new FormData();
                formData.append('file', file);

                const upRes = await fetch(`${API_URLS.product1}/upload_dataset`, {
                    method: 'POST',
                    body: formData
                });

                if (!upRes.ok) throw new Error("Upload failed");
                const upData = await upRes.json();

                // Store upload data globally
                window.currentUpload = upData;

                // Display country detection if available
                if (upData.detected_country) {
                    strategyContent.innerHTML = `
                        <div style="background:rgba(0,217,255,0.1); padding:1rem; border-radius:8px; margin-bottom:1rem;">
                            <h4 style="color:var(--neon-blue); margin:0 0 0.5rem 0;">🌍 Country Detected</h4>
                            <p style="margin:0.25rem 0;"><strong>Country:</strong> ${upData.detected_country}</p>
                            <p style="margin:0.25rem 0;"><strong>Currency:</strong> ${upData.detected_currency}</p>
                            <p style="margin:0.25rem 0;"><strong>Confidence:</strong> ${upData.confidence}%</p>
                            <p style="margin:0.25rem 0;"><strong>Exchange Rate:</strong> 1 ${upData.detected_currency} = $${upData.exchange_rate_to_usd.toFixed(4)} USD</p>
                        </div>
                        <p>Analyzing schema...</p>
                    `;
                }

                // 2. Call Analyze Endpoint
                const azRes = await fetch(`${API_URLS.product1}/analyze_dataset`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        dataset_id: upData.dataset_id, // file path
                        api_key: key
                    })
                });

                if (!azRes.ok) throw new Error("Analysis failed");
                const azData = await azRes.json();

                // Check for errors from backend
                if (azData.strategy && azData.strategy.error) {
                    throw new Error(`Gemini API Error: ${azData.strategy.error}`);
                }

                const strat = azData.strategy;

                // Validate required fields
                if (!strat.target_variable || !strat.features || !Array.isArray(strat.features)) {
                    console.error("Invalid strategy response:", strat);
                    throw new Error("Gemini returned an invalid response. Please check the API key and try again.");
                }

                // 3. Render Strategy & Auto-Train
                strategyContent.innerHTML = `
                    <div style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px;">
                        <p><strong>🎯 Target:</strong> ${strat.target_variable}</p>
                        <p><strong>🔢 Features:</strong> ${strat.features.join(', ')}</p>
                        <p><strong>🤖 Suggested Model:</strong> ${strat.model_type}</p>
                        <p><i>"${strat.reasoning}"</i></p>
                        <hr style="border-color:rgba(255,255,255,0.1); margin:1rem 0;">
                        <p>🚀 <strong>Auto-Training Model...</strong></p>
                    </div>
                `;

                // 4. Call Training Endpoint
                const trainRes = await fetch(`${API_URLS.product1}/train_custom_model`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        dataset_id: upData.dataset_id,
                        strategy: strat
                    })
                });

                if (!trainRes.ok) throw new Error("Training failed");
                const trainData = await trainRes.json();

                // Show Success & Metrics
                document.getElementById('targetVar').textContent = strat.target_variable;
                document.getElementById('algoName').textContent = trainData.model_type_used;

                modelMetrics.innerHTML = `
                    <h4 style="color:var(--neon-green)">Model Trained Successfully 🚀</h4>
                    <div class="metric-row" style="display:flex; justify-content:space-between; margin-top:0.5rem;">
                        <span>RMSE Error:</span>
                        <span style="font-weight:bold; color:#fff">${trainData.metrics.rmse.toFixed(2)}</span>
                    </div>
                    <div class="metric-row" style="display:flex; justify-content:space-between;">
                        <span>R² Score:</span>
                        <span style="font-weight:bold; color:#fff">${(trainData.metrics.r2 * 100).toFixed(1)}%</span>
                    </div>
                    <div style="margin-top:1rem; padding:0.5rem; background:rgba(255,255,255,0.05); border-radius:4px;">
                        <strong>Sample Forecasts:</strong><br>
                        ${trainData.forecasts.map(f => `<small>Actual: ${f.actual.toFixed(0)} | Pred: ${f.predicted.toFixed(0)}</small>`).join('<br>')}
                    </div>
                `;
                modelMetrics.style.display = 'block';

                // Store model_id for download
                window.currentModelId = trainData.model_id;

                // Refresh management lists
                if (typeof refreshManagementLists === 'function') {
                    refreshManagementLists();
                }

                // Add integration button if country detected
                if (window.currentUpload && window.currentUpload.detected_country) {
                    const integrateBtn = document.createElement('button');
                    integrateBtn.className = 'primary-btn';
                    integrateBtn.style.cssText = 'width:100%; margin-top:1rem; background: linear-gradient(90deg, #7928CA, #FF0080);';
                    integrateBtn.textContent = `🌍 Add ${window.currentUpload.detected_country} to Platform`;
                    integrateBtn.id = 'integrateCountryBtn';

                    // Remove old button if exists
                    const oldBtn = document.getElementById('integrateCountryBtn');
                    if (oldBtn) oldBtn.remove();

                    modelMetrics.appendChild(integrateBtn);

                    // Add click handler
                    integrateBtn.addEventListener('click', async () => {
                        if (!confirm(`Add ${window.currentUpload.detected_country} to the Global Market Intelligence platform?`)) {
                            return;
                        }

                        integrateBtn.textContent = 'Integrating...';
                        integrateBtn.disabled = true;

                        try {
                            const res = await fetch(`${API_URLS.product1}/integrate_country`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    dataset_id: window.currentUpload.dataset_id,
                                    country_name: window.currentUpload.detected_country,
                                    currency: window.currentUpload.detected_currency
                                })
                            });

                            if (!res.ok) throw new Error('Integration failed');
                            const data = await res.json();

                            alert(`✅ ${data.country} successfully added to platform!\n\nYou can now select it in Global Market Intelligence.`);
                            integrateBtn.textContent = '✅ Integrated!';
                            integrateBtn.style.background = 'linear-gradient(90deg, #00D9FF, #00FF88)';

                            // Refresh management lists
                            if (typeof refreshManagementLists === 'function') {
                                refreshManagementLists();
                            }

                        } catch (error) {
                            alert(`Error: ${error.message}`);
                            integrateBtn.textContent = `🌍 Add ${window.currentUpload.detected_country} to Platform`;
                            integrateBtn.disabled = false;
                        }
                    });
                }

            } catch (error) {
                console.error(error);
                strategyContent.textContent = `Error: ${error.message}`;
            } finally {
                analyzeBtn.textContent = "⚡ Analyze & Build Model";
                analyzeBtn.disabled = false;
            }
        });
    }

    // Download Model Button
    const downloadModelBtn = document.getElementById('downloadModelBtn');
    if (downloadModelBtn) {
        downloadModelBtn.addEventListener('click', () => {
            if (!window.currentModelId) {
                alert("No model to download. Train a model first!");
                return;
            }

            // Trigger download
            const downloadUrl = `${API_URLS.product1}/download_model/${window.currentModelId}`;
            window.location.href = downloadUrl;
        });
    }

    // Predict with Uploaded Model
    const predictBtn = document.getElementById('predictBtn');
    if (predictBtn) {
        predictBtn.addEventListener('click', async () => {
            const modelFile = document.getElementById('modelUpload').files[0];
            const newDataFile = document.getElementById('newDataUpload').files[0];

            if (!modelFile || !newDataFile) {
                alert("Please upload both a model file and a new dataset.");
                return;
            }

            predictBtn.textContent = "Processing...";
            predictBtn.disabled = true;

            try {
                // 1. Upload new dataset
                const dataFormData = new FormData();
                dataFormData.append('file', newDataFile);

                const dataRes = await fetch(`${API_URLS.product1}/upload_dataset`, {
                    method: 'POST',
                    body: dataFormData
                });

                if (!dataRes.ok) throw new Error("Failed to upload dataset");
                const dataData = await dataRes.json();

                // 2. Upload model (extract model.txt from zip first)
                // For simplicity, we'll assume the model is uploaded as-is
                const modelFormData = new FormData();
                modelFormData.append('model', modelFile);

                const modelRes = await fetch(`${API_URLS.product1}/upload_model`, {
                    method: 'POST',
                    body: modelFormData
                });

                if (!modelRes.ok) throw new Error("Failed to upload model");
                const modelData = await modelRes.json();

                // 3. Call prediction endpoint
                const predRes = await fetch(`${API_URLS.product1}/predict_with_model`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model_id: modelData.model_id,
                        dataset_id: dataData.dataset_id
                    })
                });

                if (!predRes.ok) throw new Error("Prediction failed");
                const predData = await predRes.json();

                // 4. Display results
                const resultsDiv = document.getElementById('predictionResults');
                const contentDiv = document.getElementById('predictionContent');

                contentDiv.innerHTML = `
                    <div style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px; margin-top:1rem;">
                        <p><strong>Target:</strong> ${predData.target}</p>
                        <p><strong>Predictions Generated:</strong> ${predData.count} rows</p>
                        <div style="max-height:200px; overflow-y:auto; margin-top:0.5rem;">
                            <table style="width:100%; color:#fff; font-size:0.9rem;">
                                <thead>
                                    <tr style="border-bottom:1px solid rgba(255,255,255,0.2);">
                                        <th>Row</th>
                                        <th>Predicted Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${predData.predictions.map(p => `
                                        <tr>
                                            <td>${p.row}</td>
                                            <td>${p.predicted_value.toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

                resultsDiv.style.display = 'block';

            } catch (error) {
                console.error(error);
                alert(`Error: ${error.message}`);
            } finally {
                predictBtn.textContent = "🎯 Predict on New Data";
                predictBtn.disabled = false;
            }
        });
    }
}

/* --- Product 2: Opportunity Scanner --- */
/* --- Product 2: Opportunity Scanner --- */
function initOpportunityScanner() {
    const scanBtn = document.getElementById('scanBtn');
    const yieldGrid = document.getElementById('yieldGrid');
    const gapGrid = document.getElementById('gapGrid');
    const yieldPagination = document.getElementById('yieldPagination');
    const gapPagination = document.getElementById('gapPagination');
    const scannerCountry = document.getElementById('scannerCountry');

    let scannerState = {
        yields: [],
        gaps: [],
        yieldPage: 1,
        gapPage: 1,
        itemsPerPage: 6
    };

    // Initial Load
    fetchScanData();

    if (scanBtn) scanBtn.addEventListener('click', fetchScanData);
    if (scannerCountry) scannerCountry.addEventListener('change', fetchScanData);

    async function fetchScanData() {
        if (yieldGrid) yieldGrid.innerHTML = '<div class="card" style="opacity:0.5"><h3>Loading Yields...</h3></div>';
        if (gapGrid) gapGrid.innerHTML = '<div class="card" style="opacity:0.5"><h3>Analyzing Gaps...</h3></div>';
        if (yieldPagination) yieldPagination.innerHTML = '';
        if (gapPagination) gapPagination.innerHTML = '';

        const country = scannerCountry ? scannerCountry.value : '';
        const queryParams = country ? `?country=${encodeURIComponent(country)}` : '';

        try {
            const [yieldRes, gapRes] = await Promise.all([
                fetch(`${API_URLS.product2}/get_yields${queryParams}`),
                fetch(`${API_URLS.product2}/gap_analysis${queryParams}`)
            ]);

            const yieldData = await yieldRes.json();
            const gapData = await gapRes.json();

            scannerState.yields = yieldData.data || [];
            scannerState.gaps = gapData.data || [];
            scannerState.yieldPage = 1;
            scannerState.gapPage = 1;

            renderScanner();

        } catch (error) {
            console.error(error);
            if (yieldGrid) yieldGrid.innerHTML = '<div class="card"><h3>Scanner Offline</h3></div>';
        }
    }

    function renderScanner() {
        renderGrid('yield', yieldGrid, yieldPagination, scannerState.yields, scannerState.yieldPage);
        renderGrid('gap', gapGrid, gapPagination, scannerState.gaps, scannerState.gapPage);
    }

    function renderGrid(type, grid, pagination, data, page) {
        if (!grid) return;
        grid.innerHTML = '';

        if (data.length === 0) {
            grid.innerHTML = '<div class="card"><h3>No Data Found</h3></div>';
            return;
        }

        const start = (page - 1) * scannerState.itemsPerPage;
        const end = start + scannerState.itemsPerPage;
        const pageItems = data.slice(start, end);

        pageItems.forEach(item => {
            let card;
            if (type === 'yield') {
                card = createCard(
                    'High Yield Zone ⚡',
                    item.location,
                    `${item.annual_yield_pct.toFixed(1)}% ROI`,
                    'Gross Return',
                    `Entry: $${Math.round(item.median_sale_price_usd / 1000)}k`,
                    'var(--neon-green)'
                );
            } else {
                card = createCard(
                    'Market Gap 💎',
                    `${item.location}, ${item.country}`,
                    `Score: ${Math.round(item.gap_score)}`,
                    'Gap Potential',
                    `Supply: ${item.supply_count} units`,
                    'var(--neon-purple)'
                );
            }
            grid.appendChild(card);
        });

        renderPaginationControls(type, pagination, data.length, page);
    }

    function renderPaginationControls(type, container, totalItems, currentPage) {
        if (!container) return;
        container.innerHTML = '';

        const totalPages = Math.ceil(totalItems / scannerState.itemsPerPage);
        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.innerText = '←';
        prevBtn.className = 'action-btn';
        prevBtn.style.padding = '5px 15px';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (type === 'yield') scannerState.yieldPage--;
            else scannerState.gapPage--;
            renderScanner();
        };

        const pageLabel = document.createElement('span');
        pageLabel.innerText = `Page ${currentPage} of ${totalPages} (${totalItems} total)`;
        pageLabel.style.color = 'var(--text-secondary)';

        const nextBtn = document.createElement('button');
        nextBtn.innerText = '→';
        nextBtn.className = 'action-btn';
        nextBtn.style.padding = '5px 15px';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (type === 'yield') scannerState.yieldPage++;
            else scannerState.gapPage++;
            renderScanner();
        };

        container.appendChild(prevBtn);
        container.appendChild(pageLabel);
        container.appendChild(nextBtn);
    }

    function createCard(badgeText, title, value, label, subtext, color) {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <span class="badge" style="color:${color}; border-color:${color}">${badgeText}</span>
            <h3>${title}</h3>
            <div class="stat">
                <span class="label">${label}</span>
                <span class="value" style="color:${color}">${value}</span>
            </div>
            <div style="margin-top:0.5rem; font-size:0.875rem; color:var(--text-muted)">${subtext}</div>
        `;
        return div;
    }
}

/* --- Product 3: Cultural Assistant --- */
function initCulturalAssistant() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatWindow = document.getElementById('chatWindow');

    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        // Add User Message
        appendMessage('user', text);
        input.value = '';

        try {
            const response = await fetch(`${API_URLS.product3}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            appendMessage('bot', data.response);

        } catch (error) {
            appendMessage('bot', "Connection error with Cultural Assistant.");
        }
    };

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(sender, text) {
        if (!chatWindow) return;
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.textContent = text;
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

/* --- Manage Data Tab --- */
function initManageData() {
    const refreshCountriesBtn = document.getElementById('refreshCountries');
    const refreshModelsBtn = document.getElementById('refreshModels');
    const countriesTable = document.getElementById('countriesTable');
    const modelsTable = document.getElementById('modelsTable');

    async function loadCountries() {
        try {
            const res = await fetch(`${API_URLS.product1}/list_dynamic_countries`);
            const data = await res.json();

            if (data.countries && data.countries.length > 0) {
                countriesTable.innerHTML = `
                    <table style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <th style="padding:0.5rem; text-align:left;">Country</th>
                                <th style="padding:0.5rem; text-align:left;">Currency</th>
                                <th style="padding:0.5rem; text-align:left;">Added</th>
                                <th style="padding:0.5rem; text-align:center;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.countries.map(c => `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:0.5rem;">${c.name}</td>
                                    <td style="padding:0.5rem;">${c.currency}</td>
                                    <td style="padding:0.5rem; opacity:0.6;">${new Date(c.added_at).toLocaleDateString()}</td>
                                    <td style="padding:0.5rem; text-align:center;">
                                        <button onclick="deleteCountry('${c.name}')" class="btn-danger" style="padding:0.3rem 0.8rem; font-size:0.9rem;">🗑️ Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            } else {
                countriesTable.innerHTML = '<p style="opacity:0.5;">No dynamic countries added yet.</p>';
            }
        } catch (err) {
            countriesTable.innerHTML = `<p style="color:var(--neon-red);">Error: ${err.message}</p>`;
        }
    }

    async function loadModels() {
        try {
            const res = await fetch(`${API_URLS.product1}/list_saved_models`);
            const data = await res.json();

            if (data.models && data.models.length > 0) {
                modelsTable.innerHTML = `
                    <table style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <th style="padding:0.5rem; text-align:left;">Target</th>
                                <th style="padding:0.5rem; text-align:left;">Type</th>
                                <th style="padding:0.5rem; text-align:left;">RMSE</th>
                                <th style="padding:0.5rem; text-align:left;">R²</th>
                                <th style="padding:0.5rem; text-align:center;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.models.map(m => `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:0.5rem;">${m.target}</td>
                                    <td style="padding:0.5rem; opacity:0.7;">${m.model_type}</td>
                                    <td style="padding:0.5rem;">${m.rmse ? m.rmse.toFixed(2) : 'N/A'}</td>
                                    <td style="padding:0.5rem;">${m.r2 ? m.r2.toFixed(3) : 'N/A'}</td>
                                    <td style="padding:0.5rem; text-align:center;">
                                        <button onclick="downloadModel('${m.model_id}')" class="btn-primary" style="padding:0.3rem 0.6rem; font-size:0.85rem; margin-right:0.3rem;">💾</button>
                                        <button onclick="deleteModel('${m.model_id}')" class="btn-danger" style="padding:0.3rem 0.6rem; font-size:0.85rem;">🗑️</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            } else {
                modelsTable.innerHTML = `
                    <div style="text-align:center; padding:2rem; opacity:0.5;">
                        <p>No custom models trained yet.</p>
                        <p style="font-size:0.9rem;">Go to 🧬 <strong>Dynamic Data Lab</strong> to train your first model!</p>
                    </div>
                `;
            }
        } catch (err) {
            modelsTable.innerHTML = `<p style="color:var(--neon-red);">Error: ${err.message}</p>`;
        }
    }

    // Global functions for delete actions
    window.deleteCountry = async function (countryName) {
        if (!confirm(`Delete ${countryName}? This will remove all data.`)) return;

        try {
            const res = await fetch(`${API_URLS.product1}/delete_country/${countryName}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (res.ok) {
                alert(`✅ ${data.message}`);
                loadCountries();
            } else {
                alert(`❌ ${data.error}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    window.deleteModel = async function (modelId) {
        if (!confirm('Delete this model?')) return;

        try {
            const res = await fetch(`${API_URLS.product1}/delete_model/${modelId}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (res.ok) {
                alert(`✅ ${data.message}`);
                loadModels();
            } else {
                alert(`❌ ${data.error}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    window.downloadModel = function (modelId) {
        window.location.href = `${API_URLS.product1}/download_model/${modelId}`;
    };

    // Event listeners
    refreshCountriesBtn.addEventListener('click', loadCountries);
    refreshModelsBtn.addEventListener('click', loadModels);

    // Load on init
    loadCountries();
    loadModels();

    // Export for external trigger
    window.refreshManagementLists = () => {
        loadCountries();
        loadModels();
    };
}
