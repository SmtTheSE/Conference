# 30-Second Answers
### When a judge asks something mid-presentation and you need a fast, clean answer. Each answer is under 60 words.

---

**"What does ByteMe do?"**
It's a smart price-checker for houses in Southeast Asia. You enter a property's details, and it tells you the fair price, estimated rental income, and whether the listing is overpriced or a hidden deal — using real data from 57,000+ properties across 5 countries.

---

**"What problem does it solve?"**
In the Philippines, there's no public database of real property prices. Buyers trust agents who have a conflict of interest. ByteMe gives buyers an independent, data-backed valuation — the same quality of analysis that only big investment firms had before.

---

**"What is LightGBM?"**
It's the AI engine we used. Think of it as a student that learned patterns from thousands of house prices. When you show it a new house, it makes a prediction based on everything it learned. It was 2.0× more accurate than the standard alternative (XGBoost) on our data.

---

**"What is Transfer Learning?"**
We only had 726 Philippine property records — not enough to train a great AI. Singapore has better data. So we first taught the AI Singapore's real estate patterns, then showed it Philippine data. The AI "transferred" its Singapore knowledge to the Philippines.

---

**"What is MAE 3.8%?"**
On average, our prediction is off by 3.8% from the real price. For a ₱10M property, that's a ₱380,000 margin. Professional human appraisers in secondary markets are off by 5–8%. We're more accurate and instant.

---

**"Why is Iloilo 31% overpriced?"**
The Megaworld Business Park added a brand premium. Listings charge ₱85,000–₱95,000/sqm. But the annual rental return at that price is only 4.5% — below the 5.5% regional average. The price is driven by hype, not actual income potential.

---

**"What is Proxy Yield Modeling?"**
Philippine rental data barely exists publicly. Vietnam has 54,202 rental records. We trained an AI to learn the rent-to-price ratio from Vietnam, then applied it to the Philippines with a correction number for local differences.

---

**"What is the Cultural Layer?"**
It adds 5 signals standard AI ignores: flood risk from community reports, social media hype, heritage premiums, township proximity, and beach/surf access. Adding these 5 signals made predictions 50% less likely to be badly wrong.

---

**"Can foreigners buy property in the Philippines?"**
Not land — that's constitutionally banned. Foreigners can own condo units (up to 40% of a building) or lease land for 50 years, renewable for 25 more. Our Cultural AI chatbot answers these legal questions automatically.

---

**"What if your AI is wrong?"**
We always show a confidence range (low–mid–high price), not just one number. We also show a divergence score. If the model is uncertain, the range will be wider — it signals its own uncertainty rather than faking confidence.

---

**"How do you know it's accurate?"**
We validated against JLL Philippines 2025 transaction data — a completely external dataset from a real estate firm. When independent real-world transactions confirm your predictions, that's genuine accuracy, not just a lucky test result.

---

**"Why not just use existing tools like Zillow?"**
Zillow doesn't cover the Philippines or most of ASEAN. And even if it did, it doesn't understand local culture: Megaworld township premiums, IPRA ancestral domain risks, surf tourism pricing, informal flood reports. ByteMe was built for Southeast Asia from scratch.

---

**"What are your limitations?"**
Honestly: we only deeply validated two Philippine cities. We can't see private/pre-selling transactions. And the model was trained on 2024–2025 conditions — a major economic shock would require retraining. We're not pretending to be perfect.

---

**"What would you build next?"**
Three things: add more Philippine provinces, connect to a live rental data feed for real-time yield updates, and add an explicit uncertainty score display so users can see when the model is less confident in its prediction.

---

*ByteMe — Synergia 2026 | Saigon Business School*
