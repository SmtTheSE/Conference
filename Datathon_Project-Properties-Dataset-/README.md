# Ultimate Byteme: Pan-Asian Real Estate Intelligence
**A Computational Intelligence Platform for Addressing Information Asymmetry in Emerging Real Estate Markets.**

Developed for the Synergia International Conference 2026.
Theme: "Weaving Ideas, Celebrating Cultures, Shaping the Future"

---

## 1. Research Overview
Information asymmetry in Southeast Asian real estate markets creates significant barriers to equitable investment and sustainable growth. Fragmentation in rental records and private transaction data often obscures true market value and fair-yield potential.

Ultimate Byteme is a multi-layered computational intelligence platform designed to bridge these informational gaps. By integrating a LightGBM framework with Proxy Yield Modeling and localized Large Language Models (LLMs), the system establishes a computational ground truth. It democratizes institutional-grade intelligence for local stakeholders and promotes a transparent investment ecosystem tailored to the Southeast Asian cultural context.

---

## 2. Core Modules and Services

### Product 1: Global Market Intelligence (Valuation Engine)
* **Predictive Pricing:** Estimates fair market value based on physical attributes using LightGBM.
* **Cross-Border Comparisons:** Compares property values across HCMC, Bangkok, Kuala Lumpur, and Manila.

### Product 2: Investment Opportunity Scanner
* **Proxy Yield Modeling:** Uses Transfer Learning to apply yield curves from data-rich regions (e.g., Vietnam) to data-sparse markets (e.g., Philippines).
* **Market Efficiency Index (MEI):** Identifies "Value Gaps" where localized demand outpaces listing prices.

### Product 3: Cultural & Legal AI Assistant
* **Nuance Detection:** Locally-hosted LLM (Qwen 2.5) provides heritage-sensitive analysis of land laws and cultural risks.

### ByteMe PH Valuator (Quality Remediation Layer)
* **Dual-Track Metrics:** Displays live computed Demo MAE alongside JLL 2025 Research benchmarks.
* **Feature Importance:** Visualizes the impact of the Cultural Intelligence layer on property valuation.

---

## 3. Data Synchronization (Git LFS)

This project utilizes Git Large File Storage (LFS) to manage large CSV datasets and trained model binaries. To ensure the application is fully functional, these files must be retrieved correctly.

### Installation
Ensure Git LFS is installed on your local machine:
```bash
# For macOS using Homebrew
brew install git-lfs

# For Linux (Debian/Ubuntu)
sudo apt-get install git-lfs
```

### Initialization and Retrieval
Run the following commands within the repository root to initialize LFS and pull the required assets:
```bash
git lfs install
git lfs pull
```

---

## 4. Technical Stack

* **Frontend**: Next.js 15+, TypeScript, Tailwind CSS, Framer Motion.
* **Backend**: Python 3.9+, Flask, LightGBM, XGBoost, Scikit-Learn.
* **Intelligence**: Ollama (Qwen 2.5), Google Gemini 2.0 Flash (Optional).

---

## 5. Deployment Guide: Fully Loaded Startup

To operate the full intelligence suite, follow this sequence to initialize all backend clusters and the frontend dashboard.

### Phase 1: Environment Setup
Initialize a Python virtual environment and install the required service dependencies:
```bash
# Navigate to the project root
pip install flask pandas numpy lightgbm xgboost scikit-learn requests python-dotenv
```

### Phase 2: Launch Backend Microservices
The backend architecture consists of four distinct service clusters. Use the provided master script or launch them manually:

**Master Script Execution:**
```bash
bash launch_demo.sh
```

**Individual Service Ports:**
* **Product 1 (Valuation):** Port 5001
* **Product 2 (Scanner):** Port 5002
* **Product 3 (Cultural AI):** Port 5003
* **ByteMe PH Valuator:** Port 5004 (`python byteme_api_server.py`)

### Phase 3: Launch Frontend Dashboard
Navigate to the web directory and start the Next.js development server:
```bash
cd frontend-web
npm install
npm run dev -- -p 3001
```

### Phase 4: Access and Interaction
The platform is accessible at **http://localhost:3001**.
* Ensure **Ollama** is running locally with the `qwen2.5:7b` model for Product 3.
* The system will automatically perform cold-start model training on the CSV datasets retrieved via Git LFS in the previous step.

---

## 6. Project structure
```text
├── Product_1_Global_Market_Intelligence/ # Valuation Engine Cluster
├── Product_2_Investment_Opportunity_Scanner/# Yield & MEI Analysis
├── Product_3_Cultural_AI_Assistant/      # Cultural Intelligence API
├── byteme_api_server.py                  # PH Valuator Remediation Engine
├── datasets/                             # LFS-managed Market Datasets
├── frontend-web/                         # Next.js Intelligence Dashboard
└── launch_demo.sh                        # Service Orchestration Script
```

---
*Computational Ground Truth for Emerging Markets.*
