# 🌏 Pan-Asian Real Estate Intelligence Dashboard
**A Data-Driven Investment Platform for the 2026 Research Conference**

This platform is a comprehensive financial intelligence suite designed to analyze, predict, and scan real estate opportunities across the Pan-Asian market (Vietnam, Thailand, Philippines, and Malaysia). It leverages machine learning to bridge data gaps and provide actionable investment signals.

---

## 🚀 Core Features (Products)

### 1. 📊 Global Market Intelligence (Product 1)
*   **Benchmarking**: Compare price-per-square-meter across different Southeast Asian borders.
*   **Demand Analysis**: AI-driven demand proxies based on listing density and supply turnover.
*   **Cross-Border Estimates**: Estimate rental income and market demand for any city in the supported regions.

### 2. 💎 Investment Opportunity Scanner (Product 2)
*   **High Yield Zones**: Identifies cities with the highest ROI (Return on Investment). Uses **Proxy Yield Modeling** to calculate returns even in regions with sparse rental data.
*   **Market Gap Detection**: Scores locations based on the "Price-to-Supply" ratio, finding undervalued "hidden gems."
*   **Full Data Browsing**: Paginated access to over 2,600+ analyzed investment zones.

### 3. 🤖 Cultural AI Assistant (Product 3)
*   **Nuance Detection**: A localized LLM-powered chatbot that explains regional property laws, cultural nuances (e.g., land ownership rules in Thailand vs. Vietnam), and market jargon.
*   **Interactive Insights**: Query the assistant for deep-dives into specific scanner results.

### 4. 🧪 Dynamic Data Lab
*   **Dynamic CSV Upload**: Upload any new country dataset. The system auto-detects headers, fetches live exchange rates, and integrates the data into the global dashboard.
*   **Model Management**: Train custom models, save them to disk, and use them for future predictions.

---

## 🧠 Underlying Logic & Math

### 🧬 Proxy Yield Modeling
One of the key technical innovations for this research is how we handle **Data-Sparse Markets**. In regions like the Philippines where explicit rental data is often private, we use **Transfer Learning**:
1.  We train a model on **50,000+ listings** from Vietnam (where Rent/Sale data is matched).
2.  The model learns the mathematical curve of how area, price, and rooms affect yield.
3.  We apply this curve as a financial proxy to Thailand and the Philippines to estimate investment returns with high accuracy.

### 📈 Market Gap Scoring
The Gap Score identifies "Market Friction":
`Gap Score = (Price_Potential * Yield_Potential) / Supply_Density`
High scores indicate areas that are **undersupplied** but have **high intrinsic value**, signaling a "Market Gap" ripe for investment.

---

## 🛠️ Technology Stack
*   **Backend**: Python (Flask, Pandas, NumPy, LightGBM)
*   **Frontend**: Vanilla HTML5, CSS3, JavaScript (Glassmorphism UI)
*   **Data Storage**: Unified CSV Processing (Data Lake architecture)
*   **NLP**: Specialized Cultural Real Estate LLM

---

## 🚦 How to Run the Demo
1.  Ensure you have Python 3.9+ installed.
2.  Install dependencies: `pip install flask pandas numpy lightgbm xgboost scikit-learn`
3.  Launch the unified dashboard:
    ```bash
    ./launch_demo.sh
    ```
4.  Open your browser to: **`http://localhost:8000`**

---

## 📂 Documentation & Audits
Detailed technical documentation can be found in the [`/docs`](./docs) folder:
*   [**Investment Scanner User Guide**](./docs/investment_scanner_guide.md): Plain English explanation of the scanner metrics.
*   [**Data Authenticity Audit**](./docs/data_authenticity_audit.md): Traceability report linking dashboard values back to raw CSV listings.

---
**Developed for the 2026 Pan-Asian Datathon & Research Conference.** 🌏📈💎
