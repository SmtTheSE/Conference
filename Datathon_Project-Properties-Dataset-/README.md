# 🌏 Ultimate Byteme: Pan-Asian Real Estate Intelligence
**A Computational Intelligence Web-based Solution for Bridging Information Asymmetry in Emerging Real Estate Markets.**

*Developed for the 1st Synergia International Conference 2026.*  
**Theme:** "Weaving Ideas, Celebrating Cultures, Shaping the Future"

---

## 📖 1. Research Purpose & Context
Information asymmetry in emerging Southeast Asian real estate markets (notably the Philippines, Thailand, Vietnam, and Malaysia) creates significant barriers to equitable investment and sustainable growth. Fragmentation in rental records and private transaction data often obscures true market value and fair-yield potential.

**Ultimate Byteme** is a multi-layered computational intelligence platform designed to bridge these informational gaps. By integrating a state-of-the-art LightGBM framework with proprietary Proxy Yield Modeling and localized Large Language Models (LLMs), the system establishes a computational ground truth. It democratizes institutional-grade intelligence for local stakeholders, fosters long-term economic stability, reduces speculative inflation, and promotes a transparent investment ecosystem tailored specifically to the Southeast Asian cultural context.

---

## 🚀 2. Core Architecture & Products

The platform is architected around four synergistic AI modules unified under a modern Next.js dashboard featuring a clean, authoritative ASEAN-inspired design language.

### 📊 Product 1: Global Market Intelligence (Valuation Engine)
* **Predictive Pricing:** Estimates fair market value based on physical attributes (Area, Bedrooms, Bathrooms, Type) and geographic location using LightGBM.
* **Cross-Border Rent Estimates:** Provides rental income projections for any city in the supported regions.
* **Benchmark Comparisons:** Compares Price-Per-Square-Meter against national and regional averages.

### 💎 Product 2: Investment Opportunity Scanner
* **Proxy Yield Modeling:** The standout technical innovation. Handles "Data-Sparse Markets" like the Philippines by using *Transfer Learning*. The model learns the yield curve from 50,000+ matched listings in Vietnam, applying it as a financial proxy to accurately estimate returns in other nations.
* **Market Efficiency Index (MEI):** Scans for "Value Gaps" to identify undervalued hidden gems. 
  * `MEI = (Search Volume Index + Interest Density) / Median Price Per Sqm`
  * Instead of just finding "cheap" land, MEI flags zones where localized demand is rapidly outpacing current listing prices (e.g., La Union, Iloilo).

### 🏛️ Product 3: Cultural & Legal AI Assistant
* **Nuance Detection:** A locally-hosted LLM (`qwen2.5:7b` via Ollama) combined with optional Gemini 2.0 Flash integration. 
* **Heritage-Sensitive Analysis:** Interprets localized land laws (e.g., Philippines RA 7042, Thailand Land Code) and highlights cultural risks (indigenous domains, heritage districts). 
* **RAG-lite Grounding:** Injects live market data from Products 1 & 2 directly into the AI's prompt for purely data-backed legal and cultural guidance.

### 🧪 Product 4: Dynamic Data Lab (AutoML)
* **Automated Curation:** Upload raw CSV datasets for new markets. The system uses AI to auto-detect schema, headers, and the target variable.
* **Model Management:** Automatically trains a bespoke LightGBM model (80/20 split), evaluates RMSE and R², and allows users to download the trained weights or execute batch inference.

---

## 🛠️ 3. Technology Stack

**Frontend Framework**
* **Next.js 14+ (App Router):** High-performance React framework.
* **TypeScript & Tailwind CSS:** Strict typing and an authoritative `asean.org`-inspired aesthetic (Deep Navy, Action Red, strict grid layouts).

**Backend Engines**
* **Python 3.9+ (Flask):** Three distinct microservices (Ports `5001`, `5002`, `5003`) handling the heavy lifting.
* **Data Science:** `pandas`, `numpy`, `lightgbm`, `scikit-learn`.
* **AI/LLM:** Local `Ollama` hosting `qwen2.5:7b`, with fallback to Google `Gemini`.

---

## 🚦 4. How to Run the Platform Locally

To experience the Ultimate Byteme analytical dashboard, you must run both the Python backend services and the Next.js frontend.

### Prerequisites
* Python 3.9+
* Node.js v18+ & npm
* [Ollama](https://ollama.com/) installed and running locally with the `qwen2.5:7b` model pulled (`ollama run qwen2.5:7b`).

### Step 1: Boot the Python AI Microservices
The backend consists of three Flask APIs that need to run concurrently.

1. Open a terminal in the root `Datathon_Project-Properties-Dataset-` directory.
2. Install pip dependencies:
   ```bash
   pip install flask pandas numpy lightgbm xgboost scikit-learn requests python-dotenv
   ```
3. Run the master boot script to launch all three products:
   ```bash
   bash launch_demo.sh
   ```
   *(This launches Product 1 on :5001, Product 2 on :5002, and Product 3 on :5003)*

### Step 2: Boot the Next.js Frontend Dashboard
1. Open a second terminal and navigate to the new frontend web directory:
   ```bash
   cd frontend-web
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

### Step 3: Access the Platform
* Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**
* Click "Launch System" to enter the main intelligence dashboard.

---

## 📂 5. Project Structure Overview
```text
├── Product_1_Global_Market_Intelligence/ # Valuation Engine API (:5001)
├── Product_2_Investment_Opportunity_Scanner/# MEI & Yield API (:5002)
├── Product_3_Cultural_AI_Assistant/      # Ollama/Gemini Chat API (:5003)
├── frontend-web/                         # Next.js/Tailwind UI App (:3000)
├── docs/                                 # Research Papers & Technical Specs
│   └── SYNERGIA_2026_Research_Paper.md   # Core algorithmic methodology
├── datasets/                             # Cleaned market CSVs
└── launch_demo.sh                        # Bash script to boot backends
```

---
*Elevating Southeast Asian real estate through computational ground truth.* 🌏📈💎
