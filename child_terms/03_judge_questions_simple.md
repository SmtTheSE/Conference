# Judge Questions — Simple Answers
### The original testing questions, rewritten so anyone can answer them confidently.

---

## CATEGORY 1 — Comparing Prices Across Countries

---

**Original question:** "Benchmark a 50sqm 1-bedroom condo in District 1, Ho Chi Minh City vs. Sukhumvit, Bangkok. Why is the International Equivalent significantly higher in Saigon?"

**Simple version:** "Why does a condo in Ho Chi Minh City cost more than a similar one in Bangkok when you convert both to USD?"

**Simple answer:**
Ho Chi Minh City's District 1 is Vietnam's single most important business district — it's like Manhattan inside a country of 100 million people. Land is physically scarce because it's surrounded by rivers. Bangkok's Sukhumvit is also premium, but Thailand has many more CBD alternatives, so the scarcity premium is lower. When you convert both to USD, HCMC District 1 commands a higher per-sqm price because supply is more restricted and foreign investment demand is concentrated in a smaller geographic footprint.

---

**Original question:** "Value a 120sqm house in Ladprao, Thailand. What happens to the gross rent estimate if I increase the bathroom count from 1 to 3?"

**Simple version:** "If I add more bathrooms to a Thai house, does the rent go up?"

**Simple answer:**
Yes, but not proportionally. Going from 1 bathroom to 2 bathrooms adds roughly 4–7% to the estimated monthly rent, because it unlocks the property for families and shared living. Going from 2 to 3 gives a smaller bump — maybe 2–3% — because beyond 2 bathrooms, the marginal value decreases. The model captures this through a bathroom coefficient in the feature set. In Thai markets specifically, 2-bathroom configurations have the highest occupancy rates and are the sweet spot for yield.

---

**Original question:** "Predict the fair market value of an 80sqm condo in Kuala Lumpur, Malaysia. How does it compare to Makati, Philippines?"

**Simple version:** "Is a Kuala Lumpur condo cheaper or more expensive than a similar one in Makati, Manila?"

**Simple answer:**
Kuala Lumpur generally comes in lower per-sqm than Makati CBD when converted to USD. KL benefits from a larger land supply and government-regulated affordable housing programs. Makati is a smaller geographic area with very restricted land — it's essentially an island of glass towers on limited real estate. A comparable 80sqm in KL might cost USD 120,000–180,000, while a similar unit in Makati runs USD 160,000–240,000. Our model converts both to USD using live exchange rates and shows you the comparison directly.

---

**Original question:** "What is the Bitcoin/ETH pricing equivalent for a luxury villa in Phuket? Does the model account for crypto-real estate trends?"

**Simple version:** "Can I see the price in cryptocurrency? Does ByteMe track the crypto-property trend?"

**Simple answer:**
The model outputs prices in local currency and USD. Cryptocurrency conversion is straightforward — you divide the USD price by the current BTC or ETH rate. We don't natively display crypto values, but the calculation is trivial. As for the crypto-real estate trend: we're aware of developments in Phuket where properties are being marketed to crypto-wealthy buyers, and this creates a speculative premium that can show up as an inflated divergence score in our model. We flag it, but we don't chase it — our valuations are anchored to yield fundamentals, not speculative asset correlation.

---

## CATEGORY 2 — Legal and Cultural Questions

---

**Original question:** "Can a foreign investor own land in San Juan, La Union? Explain the restrictions under the Foreign Investments Act (RA 7042)."

**Simple version:** "Can a foreigner buy land in La Union?"

**Simple answer:**
No — a foreigner cannot directly own land in the Philippines. This is written into the Philippine Constitution itself, not just a regular law. Foreigners are limited to three legal options:

1. **Own a condominium unit** — foreigners can own up to 40% of total units in a building
2. **Long-term lease** — you can lease land for up to 50 years, renewable for another 25 (Republic Act 7652)
3. **Corporation structure** — you can form a Philippine corporation where Filipinos own at least 60% and you own up to 40%, and that corporation can own land

RA 7042 (Foreign Investments Act) governs what percentage foreign equity is allowed in various business types, but it doesn't override the constitutional land restriction.

---

**Original question:** "Explain the Ancestral Domain risk in Philippine highland investment. How does IPRA (RA 8371) affect foreign leasehold stability?"

**Simple version:** "What happens if you try to build on ancestral land in the Philippines?"

**Simple answer:**
IPRA stands for Indigenous Peoples Rights Act (Republic Act 8371). It says that lands belonging to indigenous communities — called "ancestral domains" — cannot be privatized, sold, or developed without the Free, Prior, and Informed Consent (FPIC) of the indigenous community.

The risk for investors: Some land titles in highland areas (Cordillera, parts of Mindanao, some Northern Luzon highlands) may look valid on paper but overlap with ancestral domain claims. If an indigenous community objects, your lease or development rights can be challenged or cancelled.

ByteMe flags zones with known ancestral domain proximity in its risk layer. Our Cultural AI will tell you if a specific area in the Philippines has IPRA-related risks before you invest.

---

**Original question:** "Why is there a premium on north-facing units near BTS stations in Bangkok? How does ByteMe quantify this cultural preference?"

**Simple version:** "Why do Thais pay more for units that face north near train stations? How does your system measure that?"

**Simple answer:**
Two reasons: First, Thai property culture (influenced by Chinese feng shui tradition) considers north-facing units more auspicious — they're believed to bring prosperity and the orientation avoids the harsh western afternoon sun. Second, units near BTS (Bangkok's elevated train) stations command a premium because they eliminate traffic — Bangkok traffic is notoriously terrible.

ByteMe quantifies this through what we call "Location Frequency Encoding" combined with our Cultural Layer. When we trained the model on Thai data, north-facing, BTS-proximate units consistently appeared at a price premium. The model learned this pattern and reflects it in predictions. The premium is approximately 8–15% depending on station and direction.

---

**Original question:** "If I buy a condo in Vietnam, what is the maximum lease term for foreigners under the 2013 Land Law? Is it renewable?"

**Simple version:** "How long can a foreigner own a condo in Vietnam?"

**Simple answer:**
Under the 2013 Land Law (updated in 2014), foreigners can own an apartment in Vietnam for **50 years**, renewable for another 50 years upon application. The renewal is not guaranteed — it requires re-application and government approval, which is generally granted unless there's a specific development plan for the land.

Key restriction: Foreigners cannot own more than **30% of the total units in a condo building**, and no more than 250 houses per administrative ward (which matters if you're a large investor, not a typical individual buyer).

---

**Original question:** "What are the Malaysia MM2H requirements for property investment in 2026?"

**Simple version:** "How does Malaysia's foreigner home-ownership program work?"

**Simple answer:**
MM2H stands for "Malaysia My Second Home." It's a visa program that lets foreigners live in Malaysia long-term if they meet financial requirements. As of the reset in 2023–2024:

- **Minimum property purchase:** RM 1,000,000 (about USD 220,000) in designated properties
- **Fixed deposit:** RM 500,000 in a Malaysian bank, with RM 150,000 unlockable for property purchase
- **Income requirement:** Minimum RM 40,000/month offshore income
- **Visa:** 5-year renewable stay

Even without MM2H, foreigners can buy property in Malaysia above RM 600,000–1,000,000 (threshold varies by state). Malaysia is one of the most foreign-investor-friendly property markets in ASEAN.

---

## CATEGORY 3 — Investment Gaps and Market Analysis

---

**Original question:** "Find the top 3 High-MEI divergence zones in the Philippines. Why does community interest outpace listing prices in Iloilo City?"

**Simple version:** "Where are the best undervalued property zones right now? Why is Iloilo's online buzz growing faster than prices?"

**Simple answer:**
Our top 3 undervalued zones by MEI score are:
1. **San Juan — Beach District, La Union** (beach-front, surf tourism growing faster than listings)
2. **Jaro — Residential, Iloilo** (growing BPO worker demand, prices not yet adjusted)
3. **Bauang — Coastal, La Union** (cheaper than San Juan but same coastline)

Why Iloilo community interest outpaces prices: Iloilo is the fastest-growing city in Visayas. The Iloilo Business Park is already established, but the surrounding barangays haven't priced in the employment spillover yet. Workers at BPO companies in IBP need to live nearby — that demand is building but the listings in Jaro and La Paz haven't caught up to it. That's the gap ByteMe detects.

---

**Original question:** "Explain the Proxy Yield Modeling used for the Philippines. How does it use 50,000+ Vietnam records to calculate yields in Iloilo?"

**Simple version:** "You don't have Philippine rental data — so how do you know the rental value?"

**Simple answer:**
Great question. Here's the honest answer:

Philippine rental records are almost impossible to get publicly. Landlords and tenants often don't register leases. There's no centralized database.

Vietnam is the opposite — they have 54,202 matched records of "here's what a property sold for, and here's what the same type of property rents for per month." That's the richest rental dataset in public ASEAN real estate data.

We trained a second AI on Vietnam data. It learned one specific thing: "given a property's sale price, location type, size, and bedroom count — what percentage of the sale price can you expect to earn as yearly rent?"

Then we applied that percentage model to Philippines properties, with two adjustment numbers:
- La Union properties: multiply by 0.828 (Philippine yields are slightly lower than Vietnam's)
- Iloilo properties: multiply by 0.737 (Iloilo yields are even more conservative)

These adjustment numbers came from comparing the few available PH rental listings we could find against what Vietnam predicted. It's not perfect — but it's far better than guessing.

---

**Original question:** "Scan for properties in secondary Philippine cities with an Alpha Potential score above 80/100."

**Simple version:** "Find me the hidden gem properties with the highest upside."

**Simple answer:**
"Alpha Potential" is our internal score combining three things:
1. **Yield** — what % annual return can you expect from rent?
2. **MEI gap** — how far behind are prices vs. community interest?
3. **Sentiment score** — is the community buzz positive and growing?

Properties scoring above 80/100 in our dataset:
- **San Juan Beach District, La Union** — 84/100 (surf tourism surge, yield above 8%)
- **Bauang Coastal, La Union** — 81/100 (underpriced relative to San Juan comps)
- **Jaro Residential, Iloilo** — 80/100 (BPO employment demand growing, prices flat)

These are the places where if you bought today and held for 3–5 years, the data suggests the strongest upside.

---

## CATEGORY 4 — Stress Tests and Edge Cases

---

**Original question:** "What happens to the valuation of a condo in Manila if the flood flag is active? Does the model reflect historical flood zone price corrections?"

**Simple version:** "Does a flood risk warning lower the property value in your system?"

**Simple answer:**
Yes. When the Community Sentinel detects active flood signals for a specific barangay — whether from news, community reports, or historical pattern data — the Cultural Layer applies a risk discount to the valuation. The size of the discount depends on the severity (occasional flooding vs. chronic seasonal flooding).

In the Philippines, research shows flood-zone properties trade at 8–22% below their structural value. Our model applies a comparable range as a negative adjustment. The key point: we detect flood risks from COMMUNITY SOURCES, not just official DENR maps. We found 12 cases in Iloilo where informal flood reports existed in local communities but didn't appear on any government database.

---

**Original question:** "Can I own 100% of a Thai development project if it's structured as a condo? What's the 49% rule?"

**Simple version:** "How much can a foreigner own in a Thai condo building?"

**Simple answer:**
Thailand's Condominium Act says: foreigners collectively cannot own more than **49% of total units** in any one condo building. The remaining 51% must be owned by Thai nationals or Thai companies.

So if a building has 100 units, foreigners can buy at most 49 of them. Once the building hits 49% foreign ownership, no more foreign buyers allowed (unless an existing foreign owner sells to them).

This creates an interesting dynamic: in some prime Bangkok buildings that are already at or near the 49% cap, the remaining foreign-quota units sell at a significant premium because supply is restricted. Our model accounts for this quota scarcity in high-demand Thai markets.

---

**Original question:** "Compare an underdeveloped rural lot in Palawan vs. a high-density apartment in Hanoi. Does your data loader handle this?"

**Simple version:** "Can your system compare a remote Filipino lot to a Vietnamese city apartment?"

**Simple answer:**
Yes — this is exactly what the "Unified Data Loader" handles. It normalizes all properties to a common format: USD per square meter, with location type, country, and property category encoded consistently.

The comparison would show:
- Palawan rural lot: Very low price per sqm, very high uncertainty (sparse data for this area), high upside potential if infrastructure develops, low immediate yield
- Hanoi high-density apartment: Higher price per sqm, strong yield, low uncertainty (rich data from 50,000+ Vietnam records), more liquid market

They're completely different investment types. ByteMe shows them side by side, clearly labeled, so you understand the risk profile of each rather than just comparing raw numbers.

---

## CATEGORY 5 — How the AI Actually Learns

---

**The simple explanation of Transfer Learning you can give in 30 seconds:**

> "Our Philippines dataset only had 726 properties. That's not enough to train a great AI. Singapore has better data AND similar real estate dynamics. So we trained the AI on Singapore first — let it learn the general rules of real estate — then fine-tuned it on Philippine data. The AI carried its Singapore knowledge over and applied it with Philippine-specific adjustments. Like a student who studied in Singapore then came back to apply those skills in the Philippines."

---

**The simple explanation of why LightGBM beat XGBoost:**

> "Both are types of decision tree AI. XGBoost builds trees one level at a time — like building a house floor by floor. LightGBM builds trees leaf by leaf — it focuses first on the areas with the most information. For our small dataset, LightGBM found the important patterns faster and more accurately. The result: LightGBM gave 3.8% error; XGBoost gave 7.7% error. That's 2.0 times more accurate."

---

**The simple explanation of what MAE 3.8% means:**

> "MAE means 'average mistake size.' If the real price is ₱10,000,000, our system is off by about ₱380,000 on average. That's within the normal range of what a professional human appraiser would be off by — except a professional appraiser costs ₱50,000 and takes a week. ByteMe is instant and free."

---

*ByteMe — Synergia 2026 | Saigon Business School*
