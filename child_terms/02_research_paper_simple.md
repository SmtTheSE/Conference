# The Research Paper — In Simple Words
### Every section of our academic paper, explained like you're talking to a smart 12-year-old.

---

## Title (Simple Version)

**Original title:**
"Bridging the Data Void: A Computational Intelligence Framework for Culturally Contextualized Real Estate Valuation in Southeast Asia"

**What it actually means:**
"We built a computer that understands house prices in Southeast Asia, even in places where almost no data exists — and it understands the local culture too."

---

## Abstract (Simple Version)

**What the paper says in big words:**
"Information asymmetry in emerging Southeast Asian real estate markets creates barriers to equitable investment..."

**What it actually means:**
In countries like the Philippines, buying a house is like shopping blindfolded. Nobody publishes real price data. Sellers know everything; buyers know nothing. That's unfair, and it lets people get cheated.

We built ByteMe to fix this. It's a smart system that:
- Predicts fair house prices using machine learning
- Finds places where prices are secretly too low or too high
- Helps people understand local laws and risks
- Works even in places with almost no data — by "borrowing" knowledge from countries that DO have data

Our tests showed the system is accurate within 3.8% — better than a professional human appraiser.

---

## Section 1 — The Problem

**Big words used:** "systemic inefficiencies," "fragmentation in rental records," "cold-start problem"

**Simple version:**

The Philippines has a buying-a-house problem that has three parts:

**Problem 1 — Secret Prices**
Big investment companies pay for private databases of real sale prices. Regular people don't have access. So the rich know the real value; regular buyers don't. This is unfair.

**Problem 2 — Paper Records**
In many provinces, land records are still on paper — handwritten, filed in dusty cabinets. There's no easy way to look up "what did this house actually sell for last year?"

**Problem 3 — Foreign AI Doesn't Understand Here**
Existing AI tools were built for American or European housing markets. They don't understand things like:
- Flood risk from informal community reports (not on official maps)
- Premium prices near a Megaworld township
- The cultural value of being near a heritage church
- That a "surf town" beach lot should cost more than a regular beach lot

So if you use a foreign AI tool, it gives you wrong answers for Philippine properties. ByteMe was built from scratch to understand Southeast Asia.

---

## Section 2 — Our Solution

**Big words used:** "LightGBM," "Proxy Yield Modeling," "domain adaptation," "MEI divergence"

**Simple version:**

We built our solution in 4 parts:

### Part A — The Price Brain (LightGBM Model)

**What LightGBM is:** A type of machine learning — it's a computer that learns by looking at thousands of examples, finding patterns, and using those patterns to predict new things. Like how a student gets better at math by doing thousands of practice problems.

We trained it on house price data from:
- Philippines: 726 properties
- Singapore: 500 properties (used as a teacher — see Part B)
- Vietnam: 54,202 properties
- Thailand: 563 properties
- Malaysia: 2,000 properties

It learned: bigger houses cost more, CBD location adds value, beach access adds premium, flood risk reduces price, etc.

### Part B — The Teacher-Student Trick (Transfer Learning)

**The problem:** We only had 726 Philippine property records. That's not enough to train a good AI by itself. It's like asking a student to learn math with only 10 practice problems.

**The solution:** Singapore has much better data AND a similar market structure. So we first trained the AI on Singapore data (500 records), letting it learn "the general rules of real estate." Then we showed it the Philippine data and said "now apply what you learned, but adjust for the Philippines."

**Simple analogy:** Imagine you learned to cook Italian food really well. Then someone asks you to cook Filipino food. You don't start from zero — you already know how to chop vegetables, control heat, and balance flavors. You just adapt the recipes. That's Transfer Learning.

### Part C — Guessing Rent Without Rent Data (Proxy Yield Modeling)

**The problem:** In the Philippines, almost no rental data is publicly available. We can't directly calculate "if you rent out this property, how much will you earn per year?"

**The solution:** Vietnam has 54,202 matched rent AND sale records — the most complete public dataset in Southeast Asia. We trained a second AI to learn: "for a property worth X, in a city of type Y, with Z bedrooms, what is the typical yearly rent as a % of the purchase price?"

Then we applied that knowledge to the Philippines, with two correction numbers (called "calibration multipliers") — one for La Union, one for Iloilo — to account for local differences.

**Simple analogy:** If you know that in Tokyo, apartments typically rent for 5% of their value per year, and you study why that is, you can make a reasonable estimate for Bangkok too — adjusting for the fact that Bangkok rents are a bit different.

### Part D — The Hype Detector (Market Efficiency Index / MEI)

**What MEI does:** It finds places where online buzz, community activity, and news coverage about an area are growing FASTER than listing prices. That's usually a sign the area is about to get more expensive — meaning right now it's undervalued.

**Simple analogy:** Imagine a small beach town that nobody knows about. Suddenly influencers start posting about it. Tourists start coming. New restaurants open. But house prices haven't gone up yet — sellers haven't noticed the hype yet. ByteMe detects that gap. "Buy now before prices catch up."

The opposite is also true — if prices are rising but online interest is flat, that's a speculative bubble (prices going up for no real reason). ByteMe flags that as "overpriced — be careful."

---

## Section 3 — The Cultural Layer

**Big words used:** "Sentiment-Aware Cultural Intelligence Layer," "localized land laws," "ancestral domain risk"

**Simple version:**

Standard AI only looks at numbers — size, location, bedrooms.

Our Cultural Layer adds 5 things that numbers alone miss:

1. **Flood Risk (Community Reports)** — Not just official government maps. We scan news, Facebook groups, community posts about flooding in specific barangays. We found 12 flood reports in Iloilo that DON'T appear on any official DENR map.

2. **Speculative Hype** — Is a neighborhood trending on social media? Is there unusual news activity about it? That changes value.

3. **Heritage Premium** — Is this near a declared heritage zone, old church, or cultural site? Filipino buyers pay more for that proximity.

4. **Township Effect** — Is there a Megaworld, Ayala, or SM development nearby? That adds 20–35% to prices.

5. **Beach/Surf Premium** — La Union's surf town commands specific price bands based on how close to the beach and the surf breaks you are.

Adding these 5 features made the AI **68% less likely to give badly wrong predictions.**

---

## Section 4 — How We Tested It

**Big words used:** "5-Fold Cross-Validation," "longitudinal case study," "predictive variance σ < 0.05"

**Simple version:**

We tested our system in 3 ways:

**Test 1 — Train/Test Split**
We hid 20% of our data from the AI while it was learning. After training, we showed it the hidden data and checked how accurate its guesses were. It was off by 3.8% on average.

**Test 2 — 5-Fold Cross-Validation**
We split the data 5 different ways and tested 5 times. Each time the AI was accurate. This proves it wasn't just getting lucky — it actually learned real patterns. The stability score (called σ) was 0.043, below the acceptable limit of 0.05.

**Test 3 — Real World Check (JLL Validation)**
JLL is one of the world's largest real estate companies. They published data on actual Philippine property transactions in 2025 (500–1,200 real sales). We compared our predictions to their confirmed prices. We were still within 3.8%.

This is the most important test. When an independent, external company's real transactions confirm your predictions — that's not luck. That's genuine accuracy.

---

## Section 5 — What We Found in La Union and Iloilo

### La Union

We looked at 8 specific zones in La Union (surf beach areas, coastal towns, inland clusters).

**Finding:** 23% of listings in La Union are overpriced by 15–28% compared to what the data says they're worth.

**Specifically:** San Juan Beach District is UNDERVALUED. Prices are ₱38,400–₱42,200/sqm. Our model says they should be higher based on tourism growth and comparable coastal markets. Strong buy signal.

**Inland areas** (3–5km from beach) are 15–22% below fundamental value — people ignore them because they're not right on the beach, but the yield is actually better.

### Iloilo

We looked at 8 zones centered on Iloilo Business Park (Megaworld) and surrounding residential areas.

**Finding:** Iloilo Business Park condos are listed at ₱85,000–₱95,000/sqm. Our model says fair value is ₱68,500–₱75,000/sqm. That's **31% overpriced.**

**Why:** The Megaworld brand adds a 20–35% "township premium" that isn't backed by actual rental yield. If you buy here expecting to rent it out, you'll only earn a 4.5% annual return — below the 5.5% ASEAN average. The price is driven by hype, not fundamentals.

**Hidden danger:** We found 12 community reports of informal flood risk in 3 barangays around Jaro. These don't appear on any official government map. But local Facebook groups and news articles show it's a real risk. A normal AI would miss this completely.

---

## Section 6 — Limitations (What We Can't Do Yet)

**Big words used:** "geographic scope limitations," "temporal shocks," "black swan events"

**Simple version:**

We're honest about what ByteMe can't do yet:

1. **Only two Philippine cities deeply studied** — La Union and Iloilo. Expanding to Cebu, Davao, Manila suburbs will need more data collection.

2. **Can't see private developer sales** — When Megaworld sells units directly before they're built (pre-selling), those prices don't appear in any public database. Our model only sees publicly listed properties.

3. **Only trained on 2024–2025 data** — If the economy crashes, a typhoon destroys an area, or interest rates spike suddenly, the model won't predict that correctly because it hasn't seen it happen before. We'd need to retrain it after such events.

---

## Keywords — What They Mean

| Jargon Word | Simple Meaning |
|-------------|----------------|
| Information Asymmetry | Seller knows more than buyer. Unfair playing field. |
| LightGBM | A type of AI that learns from examples. Fast and accurate for tables of data. |
| Transfer Learning | Teaching an AI in Country A, then using that knowledge in Country B. |
| Proxy Yield Modeling | Guessing rental income for countries where no rental data exists. |
| MEI (Market Efficiency Index) | A score that finds places where prices haven't caught up to demand yet. |
| MAE (Mean Absolute Error) | On average, how far off are the predictions? Lower = better. |
| Cultural Intelligence Layer | The part of the AI that understands local culture, laws, and community signals. |
| Speculative Inflation | When prices go up because of hype, not because of real value. A bubble. |
| Cross-Validation | Testing the AI multiple times with different data splits to make sure it's consistently accurate. |
| Domain Adaptation | Adjusting knowledge from one place to work correctly in another place. |
| Longitudinal Study | Testing predictions made in 2024 against what actually happened in 2025. |

---

*ByteMe — Synergia 2026 | Saigon Business School*
