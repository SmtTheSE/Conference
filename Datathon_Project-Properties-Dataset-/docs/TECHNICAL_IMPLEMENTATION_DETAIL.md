# Technical Implementation Detail: Pan-Asian Real Estate Intelligence

This document provides a deep-dive into the technical architecture, mathematical models, and implementation strategies used across all products for the **Synergia 2026 International Conference**.

---

## 1. Product 1: Global Market Intelligence (Pricing Engine)

### Concept
A multi-country price prediction engine that established fair market value by normalizing prices into USD and using Gradient Boosting to handle regional variance.

### Model Architecture
- **Algorithm**: LightGBM (Gradient Boosting Decision Tree)
- **Objective**: `regression`
- **Metric**: `rmse` (Root Mean Squared Error)
- **Optimization**: Early stopping (50 rounds) to prevent overfitting.

### Features (n=6)
1. `country` (Categorical)
2. `location_freq` (Frequency Encoded for high-cardinality)
3. `bedrooms` (Numeric)
4. `bathrooms` (Numeric)
5. `area_sqm` (Numeric)
6. `property_type` (Categorical)

### Math Formulas
#### Model Evaluation (RMSE)
$$RMSE = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2}$$
*Where $y_i$ is actual price and $\hat{y}_i$ is predicted price.*

#### Rent Estimation (Proxy Yield Logic)
When local rental data is missing (e.g., Thailand/Philippines), the engine uses a **Yield Curve Proxy**:
$$Estimated\ Monthly\ Rent = \frac{Predicted\ Asset\ Price \times \text{Predicted Yield}}{12}$$

#### Demand Score (Simulated NLP)
$$Demand\ Score = \text{max}(50, \text{min}(98, \text{floor}(\frac{Price}{100,000} \times 10) + \epsilon))$$
*Where $\epsilon$ is a stochastic noise factor to simulate market volatility.*

---

## 2. Product 2: Investment Opportunity Scanner

### Concept
Identifies investment "hotspots" by calculating regional ROI and detecting market inefficiencies (Gaps).

### Implementation: Yield Analysis
The scanner uses a **Hybrid Matrix**:
- **Real Yield**: Used when both Sale and Rent data exist in a micro-market.
- **Proxy Yield**: Predicted by a secondary LightGBM model trained on Vietnam's dual-dataset.

#### Mathematical Logic for Proxy Yield
$$Predicted\ Yield = f(Price\_per\_Sqm, Area, Bed/Bath)$$
The model predicts the **Cap Rate** (Yield %), acknowledging that smaller units typically command higher % yields.

### Implementation: Gap Analysis
Detects "undervalued" markets using the **Market Efficiency Index (MEI)** logic.

#### Gap Score Formula
$$Gap\ Score = (\frac{10,000}{Median\ Price\_per\_Sqm + 1}) \times (\text{tanh}(\frac{Supply\ Count}{50}) + 0.5)$$

- **Value Potential**: Reciprocal of Price per Sqm.
- **Supply Factor**: A hyperbolic tangent function to prioritize markets with healthy liquidity (avoiding low-data outliers).

---

## 3. Product 3: Cultural AI Assistant

### Concept
A heritage-sensitive interface that bridges the gap between raw data and local cultural context (Indigenous land laws, Feng Shui influence on valuation, etc.).

### Tech Stack
- **Engine**: Gemini 1.5 Flash
- **Logic**: Multi-turn conversation with a "Cultural Expert" persona.
- **Strategy**: RAG-lite (Retrieval Augmented Generation) where market findings are injected into the system prompt to ground the AI's "opinions."

---

## 4. Product 4: Dynamic Data Lab (Auto-ML)

### Concept
A "Senior Data Scientist in a Box" that allows users to upload custom CSVs and instantly generate production-ready forecasting models.

### Automated Workflow
1. **Schema Discovery**: Gemini analyzes the CSV header and 5 sample rows.
2. **Strategy Generation**: Gemini identifies the `target_variable` and relevant `features`.
3. **Country Detection (Heuristic)**:
   - Matches location names against a built-in database of 10,000+ Asian cities.
   - **Detection Logic**: $\text{max}(matches) \times \text{confidence}$.
4. **Auto-Training**:
   - Splits data 80/20.
   - Standardizes numerical inputs.
   - Trains LightGBM and returns **RMSE** and **R²** metrics instantly.

### Math: R² Score
$$R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$$
*Determines how much of the market variance is explained by the features.*

---

## 5. Summary of Model Performance
Based on the current unified dataset as of Feb 2026:
- **Global Pricing RMSE**: ~$950k USD (Highly sensitive to Luxury segment outliers).
- **Global Pricing R²**: ~0.49 (Improving as more dynamic data is added).
- **Vietnam Rental Yield Accuracy**: +/- 0.8% variance against historical benchmarks.

---
**Prepared by**: Antigravity AI Implementation Team
**Date**: Feb 13, 2026
