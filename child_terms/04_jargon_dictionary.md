# Jargon Dictionary — Every Big Word, Explained Simply
### When a judge uses a scary term, look it up here and answer confidently.

---

## A

**Abstract** (in a research paper)
The "summary box" at the top of an academic paper. It's 200–300 words that tell you what the paper is about without making you read the whole thing. Think of it like the description on the back of a book.

**Algorithm**
A set of step-by-step instructions a computer follows. Like a recipe. A baking recipe tells you: mix flour, add eggs, bake at 180°C. An algorithm tells the computer: look at the data, find patterns, make predictions.

**Alpha Potential**
Our word for "how much hidden upside does this property have?" If a property scores high on Alpha Potential, it means our data says it's undervalued today and likely to go up. Named after "alpha" in investing, which means returns above the market average.

**ASEAN**
Association of Southeast Asian Nations. The group of 10 countries: Philippines, Vietnam, Thailand, Malaysia, Singapore, Indonesia, Myanmar, Laos, Cambodia, Brunei. When we say "ASEAN markets," we mean this region.

**Automated Schema Discovery**
When you upload a CSV spreadsheet to our system, it automatically figures out what each column means (price? area? location?) without you having to label everything. Like a smart assistant that reads your data and understands it.

---

## B

**Baseline Model**
The simplest, most obvious version of something you build first, just to compare against. Our baseline model is plain XGBoost with no special tricks. We built it so we could say "our fancy model is 2.0× better than the basic one." It's the thing you beat to prove your idea works.

**BPO (Business Process Outsourcing)**
Call centers and tech support companies where large foreign companies (US, UK, Australia) hire Filipino workers to handle customer service, data processing, etc. Iloilo has been growing as a BPO hub. BPO parks create demand for nearby housing.

**BTB (BTS in Bangkok)**
BTS = Bangkok Transit System. The elevated train/skytrain that runs through Bangkok. Properties near BTS stations command a premium because Bangkok's road traffic is extremely bad — being near a train station saves hours of commuting.

---

## C

**Calibration Multiplier**
A correction number we apply to adjust predictions from one market to another. Example: our Vietnam-based yield model predicts yields at a certain level. But Philippine yields are systematically lower than Vietnam's. So we multiply by 0.828 (La Union) or 0.737 (Iloilo) to bring the prediction into line with reality. It's like converting currencies — you need a conversion factor.

**Cap Rate (Gross Yield)**
The percentage of a property's value that you earn as rent each year. Example: a ₱10,000,000 condo that earns ₱500,000/year in rent has a 5% cap rate/gross yield. Higher yield = better return on investment. Think of it like interest rate on a savings account, but for a property.

**Cold-Start Problem**
When an AI has no data to learn from and needs to start predicting from scratch. A common challenge in new or underdeveloped markets. We solved this using Transfer Learning — giving the AI "pre-loaded knowledge" from a better-documented market.

**Computational Intelligence**
A fancy phrase for "smart computer systems." It covers machine learning, AI, and data analysis. When we say "computational intelligence framework" we mean: a system of computer programs that work together to analyze data and produce smart outputs.

**Cross-Validation (5-Fold)**
A way of testing if your AI actually learned real patterns or just memorized the training data. You split your data into 5 groups. Train on 4 groups, test on the 1 leftover. Repeat 5 times with a different group left out each time. If the AI is accurate each time, it genuinely learned. If it's only accurate sometimes, it got lucky. We used 5-Fold Cross-Validation and got consistent results all 5 times.

**Cultural Intelligence Layer**
The part of our system that understands local culture, laws, and community signals. It knows things like: "this area has informal flood reports," "this barangay has a heritage premium," "this location has township spillover." Standard AI ignores this. Ours doesn't.

---

## D

**Data Asymmetry / Information Asymmetry**
When one person in a transaction knows much more than the other. In property: sellers know the real history and risks of a property; buyers don't. This lets sellers charge more than fair value because buyers can't verify. ByteMe reduces this gap.

**Dataset**
A collection of data organized in rows and columns, like a spreadsheet. Our Thailand dataset has 563 rows (properties) and several columns (price, area, location, etc.).

**Democratize**
Make something available to everyone, not just the rich or powerful. "ByteMe democratizes institutional-grade intelligence" means: we give regular buyers the same data quality that only big investment firms had before.

**Divergence Score**
How far is the current listing price from what ByteMe's model says it should be worth? Positive divergence = overpriced. Negative divergence = underpriced. 0 = fair value.

**Domain Adaptation**
Taking knowledge that works in one area (domain) and making it work in another area. Our AI learned real estate patterns from Singapore data, then "adapted" that knowledge to work in the Philippines. Like adapting a recipe from Italian cuisine to Filipino cuisine — same cooking skills, different ingredients and adjustments.

**Dynamic Data Lab**
The part of our system where you can upload your own spreadsheet of property data from any country, and the AI automatically trains a new price model on it. You don't need to know how to code. You just upload and it builds the model for you.

---

## E

**Empirical**
Based on real data and evidence, not theory or guessing. "Empirically validated" means we tested it against real data and it worked. Judges use this word to sound rigorous — it just means "we have proof."

**Exchange Rate Normalization**
Converting all prices to USD so you can compare properties across countries fairly. A ₱10,000,000 Philippine condo and a 5,000,000 Thai Baht condo — you can't compare those numbers directly. But both convert to roughly the same USD amount, so you can compare.

---

## F

**False Positive**
In our context: when the AI confidently says "this is a good investment" but it's actually NOT — a misleadingly confident wrong answer. Our Cultural Layer reduced false positives by 50% because it catches risks (flood, speculative hype) that pure number-crunching misses.

**Feature**
Any piece of input data you give to an AI. For us: bedrooms, bathrooms, area (sqm), location, property type, flood flag, sentiment score — these are all "features." The AI looks at all features together to make a prediction.

**Feature Importance**
Which features (inputs) matter most for the prediction? In our model: Location matters most (45% of prediction weight), then Area (35%), then Bedrooms (15%). This makes intuitive sense — where a property is matters more than how big it is.

**Fragmented Data**
Data that exists but is scattered across many different sources and formats, making it hard to use. Philippine property records are fragmented: some are on government websites, some are in agent databases, some are on paper in provincial offices, some are on Lamudi. We aggregated (collected) data from all these places.

**Free, Prior, and Informed Consent (FPIC)**
The legal requirement under IPRA (RA 8371) to get approval from indigenous communities before developing their ancestral land. "Free" = no pressure. "Prior" = before you start, not after. "Informed" = they fully understand what you're proposing.

---

## G

**Gradient Boosting**
The technique behind both LightGBM and XGBoost. It builds AI models by combining many small, simple decision-making steps into one powerful prediction. Each small step learns from the mistakes of the previous step. Like a student who reviews every wrong answer and keeps improving.

**Gross Yield**
See "Cap Rate." The annual rent as a % of property value, before expenses. "Gross" means we haven't subtracted taxes, maintenance, vacancies, etc. yet.

---

## H

**Hedonic Pricing Model**
A traditional way to value properties by breaking them into parts (like: how much does 1 extra bedroom add to price? How much does beach proximity add?). It's old-school statistics. We use LightGBM instead, which is more accurate for complex, non-linear relationships.

---

## I

**Information Gap / Data Void**
Places where almost no reliable data exists. The Philippines, especially secondary cities like La Union and Iloilo, has a "data void" in real estate — very few publicly available transaction records. Our system bridges this gap.

**IPRA (RA 8371)**
Indigenous Peoples Rights Act. Philippine law protecting the land rights of indigenous communities. Relevant for investors looking at highland or rural areas in the Philippines.

---

## J

**JLL**
Jones Lang LaSalle — one of the world's largest commercial real estate companies. They publish research on property markets globally including the Philippines. We used their 2025 PH transaction data to externally validate our model.

---

## L

**LightGBM**
"Light Gradient Boosting Machine." The specific AI algorithm we use as our core prediction engine. It's faster and more accurate than XGBoost on small-to-medium datasets. It builds decision trees "leaf by leaf" instead of "level by level," which helps it find important patterns more efficiently. Made by Microsoft.

**Longitudinal Study**
A study that watches things change over time. We trained our AI on 2024 property data and then checked if its predictions matched actual 2025 prices. This proves our model works in the real world, not just on the training data.

**Location Frequency Encoding**
How we teach the AI about location without using plain text (AI can't read words directly). We convert each location into a number based on how often it appears in the dataset and its average price characteristics. A high-frequency, high-price location like "Makati CBD" gets a very different encoding than "Tubao, La Union."

---

## M

**MAE (Mean Absolute Error)**
The average distance between our prediction and the real answer. If real price = ₱10M and we predict ₱9.62M, the error is 3.8%. We want this as small as possible.

**MEI (Market Efficiency Index)**
Our scoring system for finding undervalued zones. High MEI = community interest and demand is much higher than current prices, suggesting prices will rise = good buy. Low MEI = prices already reflect demand = no special opportunity.

**ML / Machine Learning**
Teaching a computer to learn from examples instead of programming every rule manually. Instead of writing "IF bedrooms > 3 THEN add ₱500,000 to price," we show the AI thousands of real examples and it figures out the patterns itself.

**Multi-variate Regression**
Finding a prediction based on multiple inputs at the same time. "Multi" = many. "Variate" = variables/inputs. We predict price using country + location + bedrooms + area + type + cultural factors ALL AT ONCE, not one at a time.

---

## P

**Predictive Stability (σ < 0.05)**
How consistent are the predictions across different test runs? σ (sigma) is the standard deviation — a measure of spread. σ < 0.05 means the predictions are very consistent — not jumping around wildly between tests. We achieved σ = 0.043.

**Property Type Encoding**
We convert property types (Condo, House, Lot, Townhouse) into numbers so the AI can understand them. Condo gets different treatment than a land lot, which gets different treatment from a standalone house.

**Proxy Yield Modeling**
Estimating rental income for markets that don't have rental data, by borrowing the mathematical relationship from a market that does. We use Vietnam's 54,202 rental records to estimate Philippine rental yields.

---

## R

**R-squared (R²)**
A measure of how well the AI's predictions match reality. R² = 1.0 means perfect prediction. R² = 0 means the AI is no better than random guessing. Our Thailand dataset scored R² = 0.9925 (nearly perfect). Our Philippines dataset scored lower (0.0936) because the data is sparse — this is why we needed Transfer Learning to improve it.

**RA 7042 (Foreign Investments Act)**
Philippine law governing foreign business ownership. Foreigners can own up to 40% of most businesses. Does NOT override the constitutional ban on foreigners owning land.

**RA 7652 (Investors Lease Act)**
Philippine law allowing foreigners to lease land for up to 50 years (renewable 25 more years). The workaround for the land ownership ban.

**RA 8371 (IPRA)**
See "IPRA" above.

**Regularization**
A technique to prevent the AI from over-memorizing training data. Like telling a student: "Don't just memorize the practice test answers — understand the concepts." We used lambda regularization in LightGBM to make sure the model generalizes to new data, not just the data it trained on.

---

## S

**Sentiment Analysis / NLP Pipeline**
Reading text (news articles, social media, community posts) automatically and figuring out whether it's positive, negative, or neutral about a topic. Our system reads Filipino-language community content about specific barangays and scores the sentiment — is the community positive or negative about this area?

**Speculative Inflation / Speculative Premium**
When prices rise not because of actual value, but because people are betting that prices will keep going up. Like a stock bubble. Iloilo Business Park listings have a "Megaworld township speculative premium" — people pay extra just because it has the Megaworld brand, not because the yield justifies the price.

**Synergistic Modules**
Fancy way to say: "four tools that work together." Synergistic just means "each part makes the whole better." Our four products (PH Valuator, Global Intel, Scanner, Cultural AI) share data and reinforce each other.

---

## T

**Transfer Learning**
Using knowledge gained from one problem to help solve a different but related problem. We trained our AI on Singapore data, then transferred that knowledge to the Philippines. See the teacher-student analogy in File 02.

**Temporal Shock / Black Swan**
An unexpected event that disrupts the market (COVID-19, a major typhoon, a global financial crisis). Our model is trained on 2024–2025 normal conditions. A black swan event would produce price movements the model hasn't seen and can't predict accurately. This is an honest limitation we acknowledge.

---

## U

**Unified Data Loader**
The part of our system that takes property data from any country, in any format (with different column names, currencies, units), and converts it all into one consistent format so the AI can work with all of it together.

---

## V

**Valuation-to-Listing Price Divergence**
The gap between what a property is LISTED for (asking price) and what our model says it's actually WORTH. Positive divergence = overpriced. Negative divergence = underpriced.

---

## X

**XGBoost**
"Extreme Gradient Boosting." Similar to LightGBM but less efficient on small datasets. We used it as a comparison model (baseline). LightGBM beat it by 2.0× on our data. Made by a team at University of Washington, widely used in data science competitions.

---

*ByteMe — Synergia 2026 | Saigon Business School*
