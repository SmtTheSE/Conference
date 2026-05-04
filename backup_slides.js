"use strict";
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "ByteMe — Synergia 2026";
pres.title = "ByteMe Technical Backup Slides";

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  navy:    "1B2A4A",
  navyMid: "243558",
  blue:    "2C5282",
  gold:    "C9993A",
  goldLt:  "E8B84B",
  white:   "FFFFFF",
  offWhite:"F5F6FA",
  slate:   "64748B",
  slateL:  "94A3B8",
  dark:    "0F1C30",
  green:   "1A6B3C",
  greenLt: "22C55E",
  red:     "991B1B",
  redLt:   "EF4444",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.12 });

// ── Helpers ───────────────────────────────────────────────────────────────────
function darkSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  return s;
}
function lightSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  return s;
}

// Gold top bar + slide number label
function addHeader(slide, label) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold }, line: { color: C.gold }
  });
  slide.addText(label, {
    x: 0.35, y: 0.12, w: 9.3, h: 0.28,
    fontSize: 8, color: C.gold, bold: true, charSpacing: 3, margin: 0
  });
}

function sectionTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.35, y: 0.5, w: 9.3, h: 0.65,
    fontSize: 28, bold: true, color: C.dark, fontFace: "Georgia", margin: 0
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 1.18, w: 0.5, h: 0.05, fill: { color: C.gold }, line: { color: C.gold }
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.35, y: 1.3, w: 9.3, h: 0.3,
      fontSize: 13, color: C.slate, fontFace: "Calibri", margin: 0
    });
  }
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || C.white },
    line: { color: opts.border || "E2E8F0", width: 1 },
    shadow: makeShadow(),
  });
}

function statBox(slide, x, y, value, label, opts = {}) {
  const bg = opts.dark ? C.navy : C.white;
  const vc = opts.dark ? C.gold  : C.navy;
  const lc = opts.dark ? C.slateL : C.slate;
  card(slide, x, y, 2.1, 1.2, { fill: bg });
  slide.addText(value, {
    x, y: y + 0.05, w: 2.1, h: 0.72,
    fontSize: 34, bold: true, color: vc, align: "center", fontFace: "Georgia", margin: 0
  });
  slide.addText(label, {
    x, y: y + 0.78, w: 2.1, h: 0.32,
    fontSize: 10, color: lc, align: "center", fontFace: "Calibri", margin: 0
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 1 — Appendix Cover (dark)
// ════════════════════════════════════════════════════════════════════
{
  const s = darkSlide(pres);
  // top gold stripe
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold }
  });
  // left vertical accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.08, h: 5.625, fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText("APPENDIX", {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 12, bold: true, color: C.gold, charSpacing: 8, margin: 0
  });
  s.addText("Technical Deep Dive", {
    x: 0.5, y: 1.65, w: 9, h: 1.0,
    fontSize: 46, bold: true, color: C.white, fontFace: "Georgia", margin: 0
  });
  s.addText("ByteMe — Computational Intelligence for SE Asian Property Valuation", {
    x: 0.5, y: 2.75, w: 9, h: 0.4,
    fontSize: 15, color: C.slateL, fontFace: "Calibri", margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.25, w: 3.2, h: 0.04, fill: { color: C.gold }, line: { color: C.gold }
  });
  s.addText([
    { text: "Topics covered:  ", options: { color: C.slateL, bold: false } },
    { text: "Model Architecture · Transfer Learning · Feature Engineering · Cultural AI · Ablation Study · Case Studies", options: { color: C.white } },
  ], {
    x: 0.5, y: 3.45, w: 9, h: 0.4, fontSize: 11, fontFace: "Calibri", margin: 0
  });
  s.addText("Synergia 2026  |  Saigon Business School", {
    x: 0.5, y: 5.1, w: 9, h: 0.3,
    fontSize: 10, color: C.slateL, fontFace: "Calibri", margin: 0
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 2 — Two-Stage Pipeline Overview
// ════════════════════════════════════════════════════════════════════
{
  const s = lightSlide(pres);
  addHeader(s, "APPENDIX A  ·  MODEL ARCHITECTURE");
  sectionTitle(s, "Two-Stage Transfer Learning Pipeline", "How ByteMe learns from Singapore to value Philippine properties");

  const boxes = [
    { x: 0.3,  label: "1. SOURCE DATA", sub: "Singapore\n500 transactions\nstructural patterns", color: "2C5282" },
    { x: 2.85, label: "2. PRE-TRAIN", sub: "LightGBM on SG\n300 boost rounds\nLR = 0.05", color: "1A6B3C" },
    { x: 5.4,  label: "3. KNOWLEDGE TRANSFER", sub: "sg_prior feature\nSG model predicts on PH\nprior injected into PH training", color: "7B3F00" },
    { x: 7.95, label: "4. PH FINE-TUNE", sub: "LightGBM on PH\n500 rounds (early stop)\nLR = 0.03", color: C.navy },
  ];
  boxes.forEach((b) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: 1.75, w: 2.2, h: 2.1,
      fill: { color: b.color }, line: { color: b.color }, shadow: makeShadow()
    });
    s.addText(b.label, {
      x: b.x + 0.08, y: 1.82, w: 2.04, h: 0.4,
      fontSize: 9, bold: true, color: C.gold, fontFace: "Calibri", margin: 0
    });
    s.addText(b.sub, {
      x: b.x + 0.1, y: 2.25, w: 2.0, h: 1.4,
      fontSize: 11, color: C.white, fontFace: "Calibri", lineSpacingMultiple: 1.3, margin: 0
    });
  });

  // Arrows between boxes
  [2.5, 5.05, 7.6].forEach(ax => {
    s.addShape(pres.shapes.LINE, {
      x: ax, y: 2.8, w: 0.35, h: 0,
      line: { color: C.gold, width: 2.5 }
    });
    s.addText("▶", { x: ax + 0.28, y: 2.67, w: 0.2, h: 0.28, fontSize: 12, color: C.gold, margin: 0 });
  });

  // Output banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 4.05, w: 9.4, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy }, shadow: makeShadow()
  });
  s.addText("OUTPUT  →  LightGBM + Cultural Adjustment Layer  →  Price/sqm (PHP) with ±3.8% MAE · 68% false-positive reduction · 2.1× vs XGBoost", {
    x: 0.4, y: 4.08, w: 9.2, h: 0.65,
    fontSize: 12, bold: true, color: C.gold, align: "center", fontFace: "Georgia", margin: 0
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 3 — LightGBM Hyperparameters
// ════════════════════════════════════════════════════════════════════
{
  const s = lightSlide(pres);
  addHeader(s, "APPENDIX A  ·  MODEL ARCHITECTURE");
  sectionTitle(s, "LightGBM Hyperparameters", "Stage 1 (SG pre-training) vs Stage 2 (PH fine-tuning)");

  const rows = [
    [{ text: "Parameter", options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Stage 1 — Singapore", options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Stage 2 — Philippines", options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Rationale", options: { bold: true, color: C.white, fill: { color: C.navy } } }],
    ["objective",       "regression",  "regression",         "Continuous price/sqm target"],
    ["metric",          "mae",         "mae",                "MAE preferred over RMSE for outlier robustness"],
    ["boosting_type",   "gbdt",        "gbdt",               "Gradient boosted decision trees"],
    ["learning_rate",   "0.05",        "0.03",               "Slower LR in fine-tune → prevents SG over-writing"],
    ["num_leaves",      "31",          "63",                 "More leaves for richer PH geography"],
    ["min_data_in_leaf","8",           "6",                  "Lower threshold — smaller PH dataset"],
    ["feature_fraction","0.85",        "0.85",               "Sub-feature sampling → reduces overfitting"],
    ["bagging_fraction","—",           "0.85",               "Row sampling added in PH fine-tune"],
    ["num_boost_round", "300",         "500 (early stop 30)","Early stopping guards against overfitting"],
    ["extra feature",   "—",           "sg_prior",           "SG model output injected as knowledge prior"],
  ];

  const cellStyle = { fontSize: 10, fontFace: "Calibri", color: C.dark, align: "left" };
  s.addTable(rows, {
    x: 0.3, y: 1.7, w: 9.4, h: 3.55,
    border: { pt: 0.5, color: "E2E8F0" },
    fontSize: 10,
    fontFace: "Calibri",
    colW: [1.8, 1.7, 1.9, 4.0],
    rowH: 0.32,
    fill: { color: C.white },
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 4 — Feature Engineering
// ════════════════════════════════════════════════════════════════════
{
  const s = lightSlide(pres);
  addHeader(s, "APPENDIX B  ·  FEATURE ENGINEERING");
  sectionTitle(s, "11 Input Features Explained", "Five structural + five cultural/spatial + one transfer prior");

  const features = [
    { name: "area_sqm",               type: "Structural", desc: "Floor area in square metres — primary price driver" },
    { name: "bedrooms",               type: "Structural", desc: "Number of bedrooms; label-encoded integer" },
    { name: "bathrooms",              type: "Structural", desc: "Number of bathrooms; correlated with luxury tier" },
    { name: "location_encoded",       type: "Structural", desc: "Ordinal encoding of district/barangay level location" },
    { name: "property_type_encoded",  type: "Structural", desc: "Condo / House / Townhouse / Lot — label encoded" },
    { name: "tourism_density_score",  type: "Cultural",   desc: "STR listing velocity + tourist footfall index (0–100)" },
    { name: "infrastructure_score",   type: "Cultural",   desc: "Road quality, bridge readiness, utility coverage" },
    { name: "employment_zone_score",  type: "Cultural",   desc: "Proximity to CBD, BPO hubs, economic zones" },
    { name: "flood_risk_score",       type: "Cultural",   desc: "Community Sentinel informal reports + DENR data" },
    { name: "cultural_premium_factor","type": "Cultural", desc: "Net sentiment adj: heritage, surf, Megaworld spillover" },
    { name: "sg_prior",               type: "Transfer",   desc: "Stage-1 Singapore model prediction — knowledge donor" },
  ];

  const typeColor = { Structural: "2C5282", Cultural: "1A6B3C", Transfer: "7B3F00" };

  features.forEach((f, i) => {
    const col = i < 6 ? 0 : 1;
    const row = i < 6 ? i : i - 6;
    const x = col === 0 ? 0.3 : 5.15;
    const y = 1.7 + row * 0.6;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.85, h: 0.46,
      fill: { color: typeColor[f.type] }, line: { color: typeColor[f.type] }
    });
    s.addText(f.type, {
      x, y, w: 0.85, h: 0.46,
      fontSize: 7, bold: true, color: C.white, align: "center", valign: "middle", margin: 0
    });
    s.addText(f.name, {
      x: x + 0.9, y: y + 0.01, w: 3.7, h: 0.22,
      fontSize: 10, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
    });
    s.addText(f.desc, {
      x: x + 0.9, y: y + 0.23, w: 3.7, h: 0.22,
      fontSize: 9, color: C.slate, fontFace: "Calibri", margin: 0
    });
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 5 — Cultural Intelligence Layer
// ════════════════════════════════════════════════════════════════════
{
  const s = darkSlide(pres);
  addHeader(s, "APPENDIX C  ·  CULTURAL INTELLIGENCE LAYER");
  s.addText("Sentiment-Aware Cultural Intelligence", {
    x: 0.35, y: 0.45, w: 9.3, h: 0.65,
    fontSize: 28, bold: true, color: C.white, fontFace: "Georgia", margin: 0
  });
  s.addText("How qualitative market signals become quantitative price adjustments", {
    x: 0.35, y: 1.12, w: 9.3, h: 0.3,
    fontSize: 13, color: C.slateL, fontFace: "Calibri", margin: 0
  });

  const districts = [
    {
      name: "San Juan — Beach District (La Union)",
      sentiment: 85, trend: "Hyper-growth",
      adj: "+12%", flag: "OVERPRICED",
      flagColor: C.redLt,
      premiums: "+20% Tourism Density  |  +15% Surf Alpha",
      risks: "−5% Storm Surge Risk",
      note: "Listings 40% above yield-justified value — speculative risk"
    },
    {
      name: "Iloilo Business Park — Megaworld",
      sentiment: 82, trend: "Euphoric",
      adj: "+15%", flag: "OVERPRICED",
      flagColor: C.redLt,
      premiums: "+25% Township Ecosystem  |  +10% PGN Bridge",
      risks: "—",
      note: "31% above ByteMe fundamental — speculative, not yield-driven"
    },
    {
      name: "San Juan — Inland Cluster (La Union)",
      sentiment: 68, trend: "Accumulation",
      adj: "+8%", flag: "OPPORTUNITY",
      flagColor: C.greenLt,
      premiums: "+10% Future Road Connectivity",
      risks: "—",
      note: "18% undervalued vs fundamental — institutional choice zone"
    },
    {
      name: "Jaro — Residential (Iloilo)",
      sentiment: 63, trend: "Steady",
      adj: "−5%", flag: "FLOOD RISK",
      flagColor: C.gold,
      premiums: "+12% Heritage Value",
      risks: "−15% Monsoon Inundation (community-reported)",
      note: "12 informal flood reports in 3 barangays — invisible to DENR maps"
    },
  ];

  districts.forEach((d, i) => {
    const y = 1.55 + i * 0.95;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 9.4, h: 0.82,
      fill: { color: C.navyMid }, line: { color: "2D4A6E", width: 1 }
    });
    // sentiment bar
    const barW = (d.sentiment / 100) * 1.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.35, y: y + 0.55, w: 1.0, h: 0.12, fill: { color: "2D4A6E" }, line: { color: "2D4A6E" }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.35, y: y + 0.55, w: barW, h: 0.12, fill: { color: C.gold }, line: { color: C.gold }
    });
    s.addText(`${d.sentiment}`, { x: 1.38, y: y + 0.52, w: 0.3, h: 0.18, fontSize: 9, bold: true, color: C.gold, margin: 0 });

    s.addText(d.name, { x: 0.35, y: y + 0.06, w: 5.2, h: 0.28, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText(`${d.trend}  ·  ${d.note}`, { x: 0.35, y: y + 0.34, w: 6.5, h: 0.22, fontSize: 9, color: C.slateL, fontFace: "Calibri", margin: 0 });

    // Flag badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.35, y: y + 0.12, w: 1.35, h: 0.3, fill: { color: d.flagColor }, line: { color: d.flagColor }
    });
    s.addText(d.flag, { x: 7.35, y: y + 0.12, w: 1.35, h: 0.3, fontSize: 8, bold: true, color: C.dark, align: "center", valign: "middle", margin: 0 });

    // Adj
    s.addText(d.adj, { x: 8.8, y: y + 0.05, w: 0.85, h: 0.55, fontSize: 26, bold: true, color: C.gold, align: "center", fontFace: "Georgia", margin: 0 });
    s.addText("Cultural Adj", { x: 8.75, y: y + 0.6, w: 0.95, h: 0.18, fontSize: 7, color: C.slateL, align: "center", margin: 0 });
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 6 — Proxy Yield Model
// ════════════════════════════════════════════════════════════════════
{
  const s = lightSlide(pres);
  addHeader(s, "APPENDIX D  ·  PROXY YIELD MODEL");
  sectionTitle(s, "Gross Rental Yield Model", "Location-calibrated yield tables with area & property-type adjustments");

  // Explanation boxes
  const steps = [
    { n: "01", title: "Base Yield by Location", body: "Calibrated from 726 PH transactions and JLL 2025 ASEAN data. Beach and surf zones carry 6.0–6.5%; Megaworld IBP carries 4.5% (speculative demand suppresses yield)." },
    { n: "02", title: "Bedroom Adjustment", body: "Multiplier table: Studio ×0.85  |  1BR ×0.92  |  2BR ×1.00 (baseline)  |  3BR ×1.06  |  4BR+ ×1.10. Larger units command premium but trade liquidity." },
    { n: "03", title: "Property Type Adjustment", body: "Condo ×1.05  |  House ×1.00  |  Townhouse ×0.95  |  Lot ×0.70. Lot yield estimated from opportunity cost vs gross rental comparables." },
    { n: "04", title: "Annual Rental Value", body: "ARV = price_per_sqm × area_sqm × gross_yield × bedroom_adj × type_adj. Monthly rent = ARV ÷ 12. Cap rate approximation follows JLL PH yield survey." },
  ];

  steps.forEach((st, i) => {
    const y = 1.65 + i * 0.93;
    card(s, 0.3, y, 9.4, 0.82);
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 0.55, h: 0.82, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText(st.n, { x: 0.3, y, w: 0.55, h: 0.82, fontSize: 18, bold: true, color: C.gold, align: "center", valign: "middle", fontFace: "Georgia", margin: 0 });
    s.addText(st.title, { x: 0.95, y: y + 0.08, w: 8.6, h: 0.28, fontSize: 12, bold: true, color: C.dark, fontFace: "Calibri", margin: 0 });
    s.addText(st.body,  { x: 0.95, y: y + 0.38, w: 8.6, h: 0.38, fontSize: 10, color: C.slate, fontFace: "Calibri", margin: 0 });
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 7 — Community Sentinel System
// ════════════════════════════════════════════════════════════════════
{
  const s = darkSlide(pres);
  addHeader(s, "APPENDIX E  ·  COMMUNITY SENTINEL");
  s.addText("Community Sentinel Signal System", {
    x: 0.35, y: 0.45, w: 9.3, h: 0.65,
    fontSize: 28, bold: true, color: C.white, fontFace: "Georgia", margin: 0
  });
  s.addText("Capturing informal risk intelligence that official datasets miss", {
    x: 0.35, y: 1.12, w: 9.3, h: 0.3,
    fontSize: 13, color: C.slateL, fontFace: "Calibri", margin: 0
  });

  // Problem vs solution
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.55, w: 4.5, h: 2.6, fill: { color: C.navyMid }, line: { color: "2D4A6E" } });
  s.addText("THE GAP", { x: 0.4, y: 1.65, w: 4.3, h: 0.3, fontSize: 10, bold: true, color: C.redLt, charSpacing: 3, margin: 0 });
  s.addText([
    { text: "Official sources (DENR, PSA, Lamudi) miss:\n", options: { bold: true, breakLine: true } },
    { text: "• Localized monsoon flooding not in PAGASA maps\n", options: { breakLine: true } },
    { text: "• Informal community flood reports per barangay\n", options: { breakLine: true } },
    { text: "• Speculative listing language (40% price surge language in SJL)\n", options: { breakLine: true } },
    { text: "• Short-term rental velocity shifts before price moves\n", options: { breakLine: true } },
    { text: "• Heritage tourism sentiment driving premiums\n", options: { breakLine: true } },
  ], { x: 0.4, y: 2.0, w: 4.3, h: 2.0, fontSize: 10.5, color: C.slateL, fontFace: "Calibri", lineSpacingMultiple: 1.35, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.55, w: 4.6, h: 2.6, fill: { color: C.navyMid }, line: { color: "2D4A6E" } });
  s.addText("SENTINEL SIGNALS", { x: 5.2, y: 1.65, w: 4.4, h: 0.3, fontSize: 10, bold: true, color: C.greenLt, charSpacing: 3, margin: 0 });
  s.addText([
    { text: "ByteMe ingests & weights:\n", options: { bold: true, breakLine: true } },
    { text: "• community_sentinel_signals.json — district-level\n", options: { breakLine: true } },
    { text: "• Headline NLP scores (surge / correction / stable)\n", options: { breakLine: true } },
    { text: "• Flood flag per barangay → negative cultural_premium_factor\n", options: { breakLine: true } },
    { text: "• Overpriced flag → seller warning overlay in UI\n", options: { breakLine: true } },
    { text: "• Opportunity flag → buyer insight overlay\n", options: { breakLine: true } },
  ], { x: 5.2, y: 2.0, w: 4.4, h: 2.0, fontSize: 10.5, color: C.slateL, fontFace: "Calibri", lineSpacingMultiple: 1.35, margin: 0 });

  // Example
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.3, w: 9.4, h: 0.88, fill: { color: C.navyMid }, line: { color: C.gold, width: 1 } });
  s.addText("EXAMPLE  —  Jaro Residential, Iloilo:", { x: 0.45, y: 4.37, w: 5, h: 0.25, fontSize: 9, bold: true, color: C.gold, margin: 0 });
  s.addText("12 informal flood reports across 3 barangays (Rizal, Molo Norte, Santa Rosa) detected via community posts — invisible to official DENR flood maps. ByteMe flags this as flood_risk_score penalty → net cultural adjustment = −5%, UI shows flood warning badge.", {
    x: 0.45, y: 4.62, w: 9.1, h: 0.52, fontSize: 9.5, color: C.white, fontFace: "Calibri", margin: 0
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 8 — Ablation Study
// ════════════════════════════════════════════════════════════════════
{
  const s = lightSlide(pres);
  addHeader(s, "APPENDIX F  ·  ABLATION STUDY");
  sectionTitle(s, "Model Ablation Study", "Isolating the contribution of each architectural component");

  // Bar chart — MAE % (lower = better)
  s.addChart(pres.charts.BAR, [{
    name: "MAE %",
    labels: ["XGBoost Baseline", "LightGBM\n(no Transfer)", "LightGBM\n(no Cultural)", "ByteMe\nFull Model"],
    values: [7.98, 6.9, 5.8, 3.8],
  }], {
    x: 0.3, y: 1.6, w: 5.6, h: 3.6,
    barDir: "col",
    chartColors: [C.slate, "2C5282", "1A6B3C", C.gold],
    chartArea: { fill: { color: C.white }, roundedCorners: false },
    catAxisLabelColor: C.slate,
    valAxisLabelColor: C.slate,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: "1E293B",
    dataLabelPosition: "outEnd",
    showLegend: false,
    showTitle: true,
    title: "MAE % — Lower is Better",
    titleColor: C.dark,
    titleFontSize: 12,
  });

  // Insight cards right side
  const insights = [
    { title: "Transfer Learning alone", body: "Reduces MAE from 7.98% → 6.9%\n−1.08pp improvement\nSG structural patterns generalise to PH geography", color: "2C5282" },
    { title: "Cultural features alone", body: "Reduces MAE from 6.9% → 5.8%\n−1.1pp improvement\nSentiment, flood, tourism signals are real price signals", color: "1A6B3C" },
    { title: "Full ByteMe model", body: "Final MAE: 3.8%  (research validated)\n2.1× better than XGBoost  ·  68% false-positive drop\nBoth components are additive & necessary", color: C.gold },
  ];

  insights.forEach((ins, i) => {
    const y = 1.6 + i * 1.25;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.15, y, w: 3.55, h: 1.05, fill: { color: ins.color }, line: { color: ins.color }, shadow: makeShadow() });
    s.addText(ins.title, { x: 6.25, y: y + 0.07, w: 3.35, h: 0.24, fontSize: 10, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText(ins.body,  { x: 6.25, y: y + 0.33, w: 3.35, h: 0.65, fontSize: 9.5, color: C.white, fontFace: "Calibri", lineSpacingMultiple: 1.3, margin: 0 });
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 9 — Case Study: La Union
// ════════════════════════════════════════════════════════════════════
{
  const s = darkSlide(pres);
  addHeader(s, "APPENDIX G  ·  VALIDATED CASE STUDY #1");
  s.addText("Case Study: La Union — San Juan Beach District", {
    x: 0.35, y: 0.45, w: 9.3, h: 0.65,
    fontSize: 26, bold: true, color: C.white, fontFace: "Georgia", margin: 0
  });
  s.addText("Province: La Union  ·  Zone: San Juan Beach  ·  Property: 2BR Condominium, 60 sqm", {
    x: 0.35, y: 1.12, w: 9.3, h: 0.3, fontSize: 12, color: C.slateL, fontFace: "Calibri", margin: 0
  });

  // Prediction vs actual
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.55, w: 4.5, h: 2.45, fill: { color: C.navyMid }, line: { color: "2D4A6E" } });
  s.addText("BYTEME PREDICTION", { x: 0.4, y: 1.63, w: 4.3, h: 0.28, fontSize: 9, bold: true, color: C.gold, charSpacing: 3, margin: 0 });
  s.addText("₱38,400 – ₱42,200 /sqm", { x: 0.4, y: 1.95, w: 4.3, h: 0.6, fontSize: 24, bold: true, color: C.white, fontFace: "Georgia", margin: 0 });
  s.addText("Total: ~₱2.3M – ₱2.53M for 60 sqm unit", { x: 0.4, y: 2.6, w: 4.3, h: 0.28, fontSize: 10, color: C.slateL, margin: 0 });
  s.addText([
    { text: "Cultural adj: ", options: { color: C.slateL } },
    { text: "+12%  ", options: { color: C.gold, bold: true } },
    { text: "  Sentiment: ", options: { color: C.slateL } },
    { text: "85/100", options: { color: C.gold, bold: true } },
  ], { x: 0.4, y: 2.9, w: 4.3, h: 0.28, fontSize: 10, margin: 0 });
  s.addText("Flag: OVERPRICED — 40% speculative language surge\nListings priced above yield-justified value", {
    x: 0.4, y: 3.2, w: 4.3, h: 0.6, fontSize: 9.5, color: C.redLt, fontFace: "Calibri", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.55, w: 4.6, h: 2.45, fill: { color: C.navyMid }, line: { color: C.greenLt, width: 1 } });
  s.addText("FIELD-CONFIRMED MARKET RANGE", { x: 5.2, y: 1.63, w: 4.4, h: 0.28, fontSize: 9, bold: true, color: C.greenLt, charSpacing: 3, margin: 0 });
  s.addText("₱37,800 – ₱43,500 /sqm", { x: 5.2, y: 1.95, w: 4.4, h: 0.6, fontSize: 24, bold: true, color: C.white, fontFace: "Georgia", margin: 0 });
  s.addText("Source: JLL PH Beach Corridor Survey 2025", { x: 5.2, y: 2.6, w: 4.4, h: 0.28, fontSize: 10, color: C.slateL, margin: 0 });
  s.addText([
    { text: "ByteMe prediction: ", options: { color: C.slateL } },
    { text: "WITHIN confirmed range", options: { color: C.greenLt, bold: true } },
  ], { x: 5.2, y: 2.9, w: 4.4, h: 0.28, fontSize: 10, margin: 0 });
  s.addText("Overlap: 100%  ·  Centre deviation: < 1.8%\nModel correctly identified speculative overhang", {
    x: 5.2, y: 3.2, w: 4.4, h: 0.6, fontSize: 9.5, color: C.greenLt, fontFace: "Calibri", margin: 0
  });

  // Yield box
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.15, w: 9.4, h: 0.95, fill: { color: C.navyMid }, line: { color: C.gold, width: 1 } });
  s.addText("PROXY YIELD OUTPUT:", { x: 0.45, y: 4.22, w: 2.5, h: 0.25, fontSize: 9, bold: true, color: C.gold, margin: 0 });
  s.addText("Gross yield: 6.5%  ·  Est. monthly rent (60 sqm): ₱12,350 – ₱13,600  ·  Cap rate: 5.8% (JLL-aligned)  ·  Recommended action: HOLD / YIELD PLAY — avoid over-leveraged purchase at speculative peak", {
    x: 0.45, y: 4.48, w: 9.1, h: 0.55, fontSize: 10, color: C.white, fontFace: "Calibri", margin: 0
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 10 — Case Study: Iloilo Megaworld
// ════════════════════════════════════════════════════════════════════
{
  const s = darkSlide(pres);
  addHeader(s, "APPENDIX G  ·  VALIDATED CASE STUDY #2");
  s.addText("Case Study: Iloilo — Business Park (Megaworld IBP)", {
    x: 0.35, y: 0.45, w: 9.3, h: 0.65,
    fontSize: 26, bold: true, color: C.white, fontFace: "Georgia", margin: 0
  });
  s.addText("Province: Iloilo  ·  Zone: Megaworld IBP  ·  Property: 2BR Condominium, 55 sqm", {
    x: 0.35, y: 1.12, w: 9.3, h: 0.3, fontSize: 12, color: C.slateL, fontFace: "Calibri", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.55, w: 4.5, h: 2.45, fill: { color: C.navyMid }, line: { color: "2D4A6E" } });
  s.addText("BYTEME PREDICTION", { x: 0.4, y: 1.63, w: 4.3, h: 0.28, fontSize: 9, bold: true, color: C.gold, charSpacing: 3, margin: 0 });
  s.addText("₱68,500 – ₱75,000 /sqm", { x: 0.4, y: 1.95, w: 4.3, h: 0.6, fontSize: 24, bold: true, color: C.white, fontFace: "Georgia", margin: 0 });
  s.addText("Total: ~₱3.77M – ₱4.13M for 55 sqm unit", { x: 0.4, y: 2.6, w: 4.3, h: 0.28, fontSize: 10, color: C.slateL, margin: 0 });
  s.addText([
    { text: "Cultural adj: ", options: { color: C.slateL } },
    { text: "+15%  ", options: { color: C.gold, bold: true } },
    { text: "  Sentiment: ", options: { color: C.slateL } },
    { text: "82/100", options: { color: C.gold, bold: true } },
  ], { x: 0.4, y: 2.9, w: 4.3, h: 0.28, fontSize: 10, margin: 0 });
  s.addText("Flag: OVERPRICED — IBP listings 31% above fundamental value\nSpeculative, not yield-driven demand detected", {
    x: 0.4, y: 3.2, w: 4.3, h: 0.6, fontSize: 9.5, color: C.redLt, fontFace: "Calibri", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.55, w: 4.6, h: 2.45, fill: { color: C.navyMid }, line: { color: C.greenLt, width: 1 } });
  s.addText("FIELD-CONFIRMED MARKET RANGE", { x: 5.2, y: 1.63, w: 4.4, h: 0.28, fontSize: 9, bold: true, color: C.greenLt, charSpacing: 3, margin: 0 });
  s.addText("₱67,200 – ₱76,800 /sqm", { x: 5.2, y: 1.95, w: 4.4, h: 0.6, fontSize: 24, bold: true, color: C.white, fontFace: "Georgia", margin: 0 });
  s.addText("Source: Colliers PH Iloilo Q4 2025 Survey", { x: 5.2, y: 2.6, w: 4.4, h: 0.28, fontSize: 10, color: C.slateL, margin: 0 });
  s.addText([
    { text: "ByteMe prediction: ", options: { color: C.slateL } },
    { text: "WITHIN confirmed range", options: { color: C.greenLt, bold: true } },
  ], { x: 5.2, y: 2.9, w: 4.4, h: 0.28, fontSize: 10, margin: 0 });
  s.addText("Overlap: 100%  ·  Centre deviation: < 2.3%\nModel flagged speculative premium — buyer caution warranted", {
    x: 5.2, y: 3.2, w: 4.4, h: 0.6, fontSize: 9.5, color: C.greenLt, fontFace: "Calibri", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.15, w: 9.4, h: 0.95, fill: { color: C.navyMid }, line: { color: C.gold, width: 1 } });
  s.addText("PROXY YIELD OUTPUT:", { x: 0.45, y: 4.22, w: 2.5, h: 0.25, fontSize: 9, bold: true, color: C.gold, margin: 0 });
  s.addText("Gross yield: 4.5%  ·  Est. monthly rent (55 sqm): ₱14,100 – ₱15,500  ·  Cap rate: 4.0% (below JLL 5% threshold)  ·  Recommended action: CAUTION — below yield threshold; speculative entry only", {
    x: 0.45, y: 4.48, w: 9.1, h: 0.55, fontSize: 10, color: C.white, fontFace: "Calibri", margin: 0
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 11 — Dataset Details
// ════════════════════════════════════════════════════════════════════
{
  const s = lightSlide(pres);
  addHeader(s, "APPENDIX H  ·  DATASETS");
  sectionTitle(s, "Dataset Composition & Sources", "Training data for both transfer learning stages");

  // PH dataset
  card(s, 0.3, 1.65, 4.45, 3.55);
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.65, w: 4.45, h: 0.38, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("PHILIPPINES DATASET  (Target Domain)", { x: 0.38, y: 1.65, w: 4.3, h: 0.38, fontSize: 10, bold: true, color: C.gold, valign: "middle", margin: 0 });

  const phDetails = [
    ["Rows", "726 transactions"],
    ["Regions", "La Union + Iloilo"],
    ["Sources", "Lamudi PH, PropertyPro, field survey"],
    ["Date range", "Dec 2024 – Jan 2026"],
    ["Property types", "Condo, House, Townhouse, Lot"],
    ["Districts", "16 named zones"],
    ["Features", "area_sqm, beds, baths, price/sqm, 5 cultural scores"],
    ["Validation", "JLL PH 2025 longitudinal + Colliers Q4 2025"],
  ];
  phDetails.forEach(([k, v], i) => {
    const y = 2.12 + i * 0.36;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 4.45, h: 0.35, fill: { color: i % 2 === 0 ? "F8FAFC" : C.white }, line: { color: "E2E8F0", width: 0.5 } });
    s.addText(k, { x: 0.38, y, w: 1.55, h: 0.35, fontSize: 10, bold: true, color: C.slate, valign: "middle", margin: 0 });
    s.addText(v, { x: 1.95, y, w: 2.72, h: 0.35, fontSize: 10, color: C.dark, valign: "middle", margin: 0 });
  });

  // SG dataset
  card(s, 5.05, 1.65, 4.65, 3.55);
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 1.65, w: 4.65, h: 0.38, fill: { color: "1A6B3C" }, line: { color: "1A6B3C" } });
  s.addText("SINGAPORE DATASET  (Source Domain)", { x: 5.13, y: 1.65, w: 4.5, h: 0.38, fontSize: 10, bold: true, color: C.white, valign: "middle", margin: 0 });

  const sgDetails = [
    ["Rows", "500 transactions"],
    ["Region", "Singapore (mixed districts)"],
    ["Sources", "SRX Property, URA data"],
    ["Purpose", "Pre-train structural price patterns"],
    ["Key pattern", "Size, bedrooms, location → price/sqm"],
    ["Transfer", "sg_prior = SG model output on PH data"],
    ["Rationale", "SG & PH share structural real estate patterns"],
    ["Limitation", "Cultural features differ → hence fine-tuning"],
  ];
  sgDetails.forEach(([k, v], i) => {
    const y = 2.12 + i * 0.36;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y, w: 4.65, h: 0.35, fill: { color: i % 2 === 0 ? "F8FAFC" : C.white }, line: { color: "E2E8F0", width: 0.5 } });
    s.addText(k, { x: 5.13, y, w: 1.6, h: 0.35, fontSize: 10, bold: true, color: C.slate, valign: "middle", margin: 0 });
    s.addText(v, { x: 6.75, y, w: 2.87, h: 0.35, fontSize: 10, color: C.dark, valign: "middle", margin: 0 });
  });
}

// ════════════════════════════════════════════════════════════════════
// SLIDE 12 — Key Metrics Summary + ASEAN Benchmarks
// ════════════════════════════════════════════════════════════════════
{
  const s = darkSlide(pres);
  addHeader(s, "APPENDIX I  ·  PERFORMANCE METRICS & ASEAN BENCHMARKS");
  s.addText("Validated Metrics & Cross-Border Context", {
    x: 0.35, y: 0.45, w: 9.3, h: 0.65,
    fontSize: 28, bold: true, color: C.white, fontFace: "Georgia", margin: 0
  });

  // Stat boxes top row
  statBox(s, 0.3,  1.3, "3.8%",  "MAE\n(Research Validated)", { dark: true });
  statBox(s, 2.55, 1.3, "0.043", "σ — Std Dev\n(Prediction Spread)", { dark: true });
  statBox(s, 4.8,  1.3, "68%",   "False-Positive\nReduction vs Baseline", { dark: true });
  statBox(s, 7.05, 1.3, "2.1×",  "Accuracy vs\nXGBoost Baseline", { dark: true });

  // ASEAN benchmarks table
  s.addText("ASEAN Market Context — USD/sqm Benchmarks", {
    x: 0.35, y: 2.72, w: 9.3, h: 0.3, fontSize: 11, bold: true, color: C.gold, fontFace: "Calibri", margin: 0
  });

  const benchRows = [
    [{ text: "Market", options: { bold: true, color: C.white, fill: { color: "243558" } } },
     { text: "USD/sqm", options: { bold: true, color: C.white, fill: { color: "243558" } } },
     { text: "ByteMe Coverage", options: { bold: true, color: C.white, fill: { color: "243558" } } },
     { text: "Notes", options: { bold: true, color: C.white, fill: { color: "243558" } } }],
    ["Singapore (source domain)", "$8,200 avg", "Pre-training only", "Knowledge donor — structural patterns"],
    ["Bangkok, Thailand (Sukhumvit)", "$8,000", "Benchmarked", "JLL 2025 cross-border reference"],
    ["Ho Chi Minh City, Vietnam (Quận 1)", "$5,500", "Benchmarked", "ASEAN emerging market reference"],
    ["Kuala Lumpur, Malaysia", "$3,250", "Benchmarked", "Regional tier-2 context"],
    ["Iloilo Megaworld IBP (ByteMe)", "~$1,320", "PRIMARY TARGET", "₱75,000/sqm · Speculative flag active"],
    ["La Union San Juan Beach (ByteMe)", "~$730", "PRIMARY TARGET", "₱40,000/sqm · Tourism premium applied"],
  ];

  s.addTable(benchRows, {
    x: 0.3, y: 3.06, w: 9.4, h: 2.28,
    border: { pt: 0.5, color: "2D4A6E" },
    fontSize: 10, fontFace: "Calibri",
    colW: [2.6, 1.4, 1.8, 3.6],
    rowH: 0.34,
    fill: { color: C.navyMid },
    color: C.white,
  });
}

// ── Write file ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "/Users/m2/Downloads/Conference-master/ByteMe_Backup_Slides.pptx" })
  .then(() => console.log("Done: ByteMe_Backup_Slides.pptx"))
  .catch(e => { console.error(e); process.exit(1); });
