const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Team ByteMe";
pres.title = "Bridging the Data Void";

// ── Palette (no # prefix) ──────────────────────────────────────────────────
const NAVY      = "1B2A4A";
const NAVY_MID  = "2A3F6F";
const NAVY_LT   = "3D5A8A";
const GOLD      = "D4A017";
const GOLD_LT   = "F0C84A";
const WHITE     = "FFFFFF";
const OFF_WHITE = "F4F6F9";
const GRAY      = "64748B";
const GRAY_LT   = "E2E8F0";
const BODY      = "2D3748";
const MUTED     = "94A3B8";

// ── Helpers ────────────────────────────────────────────────────────────────
const makeShadow = () => ({ type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.10 });

function addHeader(slide, title) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 1.0, fill: { color: GOLD }, line: { color: GOLD } });
  slide.addText(title, { x: 0.38, y: 0, w: 9.3, h: 1.0, fontSize: 22, fontFace: "Trebuchet MS", color: WHITE, bold: true, align: "left", valign: "middle", margin: 0 });
}

function addFooter(slide, num) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.38, w: 10, h: 0.245, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addText("ByteMe  |  Saigon Business School  |  2026", { x: 0.2, y: 5.38, w: 7, h: 0.245, fontSize: 7.5, color: GOLD_LT, align: "left", valign: "middle", margin: 0 });
  slide.addText(`${num} / 16`, { x: 8.8, y: 5.38, w: 1.0, h: 0.245, fontSize: 7.5, color: MUTED, align: "right", valign: "middle", margin: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1 – TITLE
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Top & bottom gold stripes
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0,     w: 10, h: 0.14, fill: { color: GOLD }, line: { color: GOLD } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.485, w: 10, h: 0.14, fill: { color: GOLD }, line: { color: GOLD } });
  // Left accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.48, y: 0.5, w: 0.08, h: 4.6, fill: { color: GOLD }, line: { color: GOLD } });

  // Conference badge
  s.addShape(pres.shapes.RECTANGLE, { x: 7.55, y: 0.3, w: 2.2, h: 0.38, fill: { color: GOLD }, line: { color: GOLD } });
  s.addText("MANAGEMENT TRACK", { x: 7.55, y: 0.3, w: 2.2, h: 0.38, fontSize: 8.5, fontFace: "Trebuchet MS", color: NAVY, bold: true, align: "center", valign: "middle", margin: 0, charSpacing: 1.5 });

  // Main title
  s.addText("Bridging the Data Void", { x: 0.75, y: 0.65, w: 9.0, h: 0.85, fontSize: 40, fontFace: "Trebuchet MS", color: WHITE, bold: true, align: "left" });

  // Gold rule
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: 1.53, w: 9.0, h: 0.055, fill: { color: GOLD }, line: { color: GOLD } });

  // Subtitle
  s.addText("A Computational Intelligence Framework for\nCulturally Contextualized Real Estate Valuation in Southeast Asia", { x: 0.75, y: 1.62, w: 9.0, h: 0.95, fontSize: 16.5, fontFace: "Trebuchet MS", color: GOLD_LT, align: "left" });

  // Team info card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: 2.78, w: 5.6, h: 1.9, fill: { color: NAVY_MID }, line: { color: NAVY_LT, width: 1 } });
  s.addText([
    { text: "Team ByteMe", options: { bold: true, color: GOLD, fontSize: 13.5, breakLine: true } },
    { text: "Honey Thet Htar Zin  ·  Sitt Min Thar  ·  Thu Htet Naing", options: { color: WHITE, fontSize: 10.5, breakLine: true } },
    { text: " ", options: { fontSize: 4, breakLine: true } },
    { text: "Saigon Business School", options: { color: GOLD_LT, fontSize: 11, bold: true, breakLine: true } },
    { text: "April 2026", options: { color: MUTED, fontSize: 10 } }
  ], { x: 0.95, y: 2.88, w: 5.2, h: 1.7, align: "left", valign: "top" });

  // Keywords strip
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: 4.88, w: 9.0, h: 0.32, fill: { color: NAVY_MID }, line: { color: NAVY_LT } });
  s.addText("Keywords: Real Estate Intelligence  ·  LightGBM  ·  Proxy Yield Modeling  ·  Information Asymmetry  ·  Southeast Asia", {
    x: 0.75, y: 4.88, w: 9.0, h: 0.32, fontSize: 8.5, color: MUTED, align: "center", valign: "middle", margin: 0
  });

  s.addNotes("Welcome everyone. Today we present ByteMe — a computational intelligence framework designed specifically to address the real estate data void in Southeast Asia. Our team from Saigon Business School brings together expertise in data science, computational modeling, and regional market dynamics. The problem we solve is not just technical — it is fundamentally a problem of equity, transparency, and sustainable economic development in one of the world's fastest-growing regions. We will cover the problem, our four-pillar solution, methodology, results from two Philippine case studies, and the broader implications for management science.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2 – THE PROBLEM
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "The Problem: Southeast Asia's Real Estate Data Void");
  addFooter(s, 2);

  // Hook banner
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.08, w: 9.5, h: 0.52, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("SE Asia's real estate market is projected to exceed $4.7 trillion by 2030 — yet remains structurally opaque to most investors.", {
    x: 0.35, y: 1.08, w: 9.3, h: 0.52, fontSize: 11.5, color: GOLD_LT, bold: true, italic: true, align: "center", valign: "middle", margin: 0
  });

  // 3 problem cards
  const cards = [
    { n: "1", title: "Information\nAsymmetry", topColor: "C0392B", body: "Institutional investors access proprietary data that retail investors cannot. Price signals are opaque and gated behind expensive market research retainers.\n\nThe result: a two-tier market where capital advantages compound themselves." },
    { n: "2", title: "Opaque\nTransactions",  topColor: GOLD,     body: "Land registry records in the Philippines, Vietnam, and Indonesia are incomplete, fragmented, and often paper-based. Digital transaction trails are sparse and inconsistent.\n\nNo data = no reliable model = no fair valuation." },
    { n: "3", title: "Cultural\nMisalignment", topColor: NAVY_MID, body: "Every AI valuation tool on the market was built for US, UK, or Australian markets. They fail to capture feng shui premiums, ancestral land rules, cemetery proximity discounts, and informal pricing norms.\n\nWrong context = wrong price." }
  ];

  cards.forEach((c, i) => {
    const x = 0.28 + i * 3.18;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.7, w: 3.05, h: 3.45, fill: { color: WHITE }, line: { color: GRAY_LT, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.7, w: 3.05, h: 0.12, fill: { color: c.topColor }, line: { color: c.topColor } });
    // Number circle
    s.addShape(pres.shapes.OVAL, { x: x + 1.17, y: 1.85, w: 0.7, h: 0.7, fill: { color: NAVY }, line: { color: NAVY } });
    s.addText(c.n, { x: x + 1.17, y: 1.85, w: 0.7, h: 0.7, fontSize: 22, color: GOLD, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(c.title, { x: x + 0.1, y: 2.62, w: 2.85, h: 0.55, fontSize: 13, fontFace: "Trebuchet MS", color: NAVY, bold: true, align: "center" });
    s.addText(c.body, { x: x + 0.12, y: 3.2, w: 2.82, h: 1.85, fontSize: 9.5, color: BODY, align: "left", valign: "top", wrap: true });
  });

  s.addNotes("Southeast Asia's real estate market is enormous and growing fast — over $4.7 trillion projected by 2030. Yet it is structurally opaque. There are three interlocking problems. First, information asymmetry: institutional investors access proprietary data that retail investors simply cannot get. Second, opaque transactions: land registries across the Philippines, Vietnam, Indonesia are fragmented and often paper-based. Third, cultural misalignment: every AI tool on the market was built for Western markets. They don't understand feng shui premiums, they don't parse local news for sentiment, they don't know that a property near a cemetery in Vietnam commands a very different price than one in Texas. These three problems compound each other and they disproportionately hurt retail investors and local communities.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3 – RESEARCH GAP
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Research Gap & Motivation");
  addFooter(s, 3);

  // Left panel: existing solutions
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.55, h: 4.05, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.55, h: 0.4, fill: { color: "C0392B" }, line: { color: "C0392B" } });
  s.addText("EXISTING SOLUTIONS FAIL", { x: 0.35, y: 1.1, w: 4.35, h: 0.4, fontSize: 11, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });

  const fails = [
    { name: "Zillow / Zestimate", body: "Built for US market. No cultural layer. Cold-start failure on sparse SE Asian data." },
    { name: "PropTech Asia Platforms", body: "Aggregate listings but provide zero valuation intelligence or divergence analysis." },
    { name: "Hedonic Pricing Models", body: "Require deep, clean historical data — unavailable in secondary SE Asian cities." },
    { name: "AutoML / XGBoost Baselines", body: "Generic models ignore cultural signals, produce high false-positive investment rates." }
  ];
  fails.forEach((f, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.32, y: 1.58 + i * 0.85, w: 0.08, h: 0.65, fill: { color: "C0392B" }, line: { color: "C0392B" } });
    s.addText(f.name, { x: 0.48, y: 1.58 + i * 0.85, w: 4.2, h: 0.3, fontSize: 11, color: NAVY, bold: true });
    s.addText(f.body,  { x: 0.48, y: 1.87 + i * 0.85, w: 4.2, h: 0.45, fontSize: 9.5, color: BODY });
  });

  // Right side: 3 boxes
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 1.1, w: 4.7, h: 1.65, fill: { color: NAVY }, line: { color: NAVY }, shadow: makeShadow() });
  s.addText("The Cold-Start Problem", { x: 5.15, y: 1.14, w: 4.5, h: 0.4, fontSize: 14, color: GOLD, bold: true, fontFace: "Trebuchet MS" });
  s.addText("Secondary SE Asian cities lack 5+ years of clean transaction data. Standard ML models need thousands of labeled samples. ByteMe's Transfer Learning bridges this gap by importing knowledge from mature markets (Singapore, Malaysia) and adapting it to emerging ones (Philippines, Vietnam).", {
    x: 5.15, y: 1.56, w: 4.5, h: 1.1, fontSize: 9.5, color: WHITE
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 2.9, w: 4.7, h: 1.25, fill: { color: GOLD }, line: { color: GOLD }, shadow: makeShadow() });
  s.addText("The Unaddressed Research Gap", { x: 5.15, y: 2.94, w: 4.5, h: 0.38, fontSize: 13, color: NAVY, bold: true, fontFace: "Trebuchet MS" });
  s.addText("No existing framework simultaneously addresses (1) data scarcity via transfer learning, (2) cultural context via sentiment parsing, and (3) actionable yield intelligence via proxy modeling.", {
    x: 5.15, y: 3.32, w: 4.5, h: 0.75, fontSize: 9.5, color: NAVY
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 4.3, w: 4.7, h: 0.72, fill: { color: NAVY_MID }, line: { color: NAVY_LT } });
  s.addText("SE Asia PropTech investment grew 340% from 2019–2024. The window to define the methodology standard is NOW.", {
    x: 5.15, y: 4.3, w: 4.5, h: 0.72, fontSize: 10, color: GOLD_LT, italic: true, valign: "middle"
  });

  s.addNotes("Why hasn't this been solved? The leading platforms fail for the same reason: they were designed for data-rich, culturally homogeneous markets. The cold-start problem is particularly brutal: secondary cities in the Philippines like La Union and Iloilo may have only a few hundred documented transactions per year. You cannot train a hedonic pricing model on that. Our research gap is precise: no framework exists that combines transfer learning for data scarcity, cultural sentiment parsing, and proxy yield modeling into a unified system. The timing matters. SE Asia PropTech investment grew 340% from 2019 to 2024. Whoever defines the standard methodology now will shape the entire market.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4 – INTRODUCING BYTEME
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0,     w: 10, h: 0.12, fill: { color: GOLD }, line: { color: GOLD } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.505, w: 10, h: 0.12, fill: { color: GOLD }, line: { color: GOLD } });

  s.addText("Introducing", { x: 0.5, y: 0.28, w: 9, h: 0.44, fontSize: 17, color: MUTED, fontFace: "Trebuchet MS", align: "center", charSpacing: 3 });
  s.addText("ByteMe", { x: 0.5, y: 0.65, w: 9, h: 1.0, fontSize: 62, color: GOLD, bold: true, fontFace: "Trebuchet MS", align: "center" });

  s.addShape(pres.shapes.RECTANGLE, { x: 2.5, y: 1.72, w: 5.0, h: 0.055, fill: { color: GOLD }, line: { color: GOLD } });

  s.addText("Web-based computational intelligence that democratizes institutional-grade real estate analysis for Southeast Asia", {
    x: 1.0, y: 1.82, w: 8.0, h: 0.65, fontSize: 13.5, color: WHITE, italic: true, align: "center", fontFace: "Trebuchet MS"
  });

  const pillars = [
    { num: "01", title: "LightGBM\nRegressor",   desc: "State-of-the-art gradient boosting for sparse tabular data" },
    { num: "02", title: "Proxy Yield\nModeling",  desc: "Investment returns without direct rental data" },
    { num: "03", title: "Transfer\nLearning",     desc: "Mature market knowledge → emerging market predictions" },
    { num: "04", title: "Sentiment-\nAware Index", desc: "Cultural & legal signal parsing for SE Asia" }
  ];

  pillars.forEach((p, i) => {
    const x = 0.48 + i * 2.28;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.65, w: 2.12, h: 2.55, fill: { color: NAVY_MID }, line: { color: NAVY_LT, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.65, w: 2.12, h: 0.1,  fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(p.num, { x, y: 2.78, w: 2.12, h: 0.52, fontSize: 30, color: GOLD, bold: true, align: "center", fontFace: "Trebuchet MS" });
    s.addText(p.title, { x: x + 0.06, y: 3.33, w: 2.0, h: 0.65, fontSize: 11.5, color: WHITE, bold: true, align: "center" });
    s.addText(p.desc,  { x: x + 0.06, y: 4.0,  w: 2.0, h: 1.05, fontSize: 9,    color: MUTED, align: "center" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.22, w: 10, h: 0.28, fill: { color: "0D1929" }, line: { color: "0D1929" } });
  s.addText("Design Philosophy: Computational Rigor  +  Cultural Intelligence  =  Market Transparency", {
    x: 0.5, y: 5.22, w: 9.0, h: 0.28, fontSize: 9.5, color: GOLD, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addNotes("ByteMe is not just another property listing aggregator. It is a computational intelligence engine built from the ground up for Southeast Asia. The platform is web-based — accessible to anyone with an internet connection, not just firms with million-dollar Bloomberg terminals. Our design philosophy: computational rigor meets cultural intelligence. You cannot have one without the other in SE Asia. The framework rests on four pillars. LightGBM — the most efficient gradient boosting algorithm for sparse tabular data. Proxy Yield Modeling — because rental data is almost never available, we construct proxies from tourism density, infrastructure investment, and economic indices. Transfer Learning — importing knowledge from Singapore and Malaysia and adapting it to Philippine secondary cities. And the Sentiment-Aware Market Efficiency Index — a cultural parsing layer unique to ByteMe.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5 – FRAMEWORK ARCHITECTURE: 4 PILLARS
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Framework Architecture: The Four Pillars");
  addFooter(s, 5);

  const pillars = [
    {
      num: "01", title: "LightGBM Regressor", hdr: "1B5E8C",
      pts: ["Leaf-wise tree growth (vs. level-wise)", "Handles sparse & missing data natively", "50× faster than XGBoost on large sets", "Native categorical encoding — no one-hot"],
      why: "Ideal for SE Asian data: sparse, categorical, fast iteration needed"
    },
    {
      num: "02", title: "Proxy Yield Modeling", hdr: "8B5E1B",
      pts: ["Estimates rental yield without rental data", "Cap rate proxies from tourism & infrastructure", "Investment return modeling (3-yr horizon)", "Detects listing price vs. fair value divergence"],
      why: "Solves missing rental data — the #1 barrier in PH secondary markets"
    },
    {
      num: "03", title: "Transfer Learning", hdr: "1B6B3A",
      pts: ["Source: Singapore & Malaysia (data-rich)", "Target: Philippines, Vietnam (data-sparse)", "Domain adaptation for local market patterns", "Reduces data requirement by ~70%"],
      why: "Enables reliable prediction with fewer than 500 local transactions"
    },
    {
      num: "04", title: "Sentiment-Aware Index", hdr: "6B1B5E",
      pts: ["Filipino-language NLP on news & social media", "Legal registry anomaly detection", "Cultural pricing premium/discount flags", "Cuts false-positive signals by 50%"],
      why: "The layer that separates ByteMe from every existing solution"
    }
  ];

  pillars.forEach((p, i) => {
    const x = 0.2 + i * 2.45;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.3, h: 4.05, fill: { color: WHITE }, line: { color: GRAY_LT, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.3, h: 0.88, fill: { color: p.hdr }, line: { color: p.hdr } });
    s.addText(p.num, { x: x + 0.06, y: 1.1, w: 0.6, h: 0.88, fontSize: 26, color: WHITE, bold: true, align: "left", valign: "middle", margin: 0 });
    s.addText(p.title, { x: x + 0.1, y: 2.02, w: 2.1, h: 0.44, fontSize: 10.5, color: p.hdr, bold: true, align: "left" });

    p.pts.forEach((pt, j) => {
      s.addShape(pres.shapes.OVAL, { x: x + 0.1, y: 2.55 + j * 0.55, w: 0.13, h: 0.13, fill: { color: p.hdr }, line: { color: p.hdr } });
      s.addText(pt, { x: x + 0.28, y: 2.49 + j * 0.55, w: 1.95, h: 0.5, fontSize: 9, color: BODY, align: "left", valign: "top" });
    });

    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.6, w: 2.3, h: 0.55, fill: { color: p.hdr }, line: { color: p.hdr } });
    s.addText(p.why, { x: x + 0.08, y: 4.6, w: 2.14, h: 0.55, fontSize: 8.5, color: WHITE, italic: true, align: "left", valign: "middle" });
  });

  s.addNotes("Let me walk you through each pillar. LightGBM: we chose it over XGBoost and Random Forest because it uses leaf-wise tree growth — it achieves lower loss with the same number of iterations, handles missing values and categorical features natively. Proxy Yield Modeling: in secondary Philippine cities there is almost no published rental data. So we construct yield proxies from tourism density, local infrastructure investment, and regional economic growth indices. Transfer Learning: we train on Singapore and Malaysian data — deep, clean, well-documented — then fine-tune on Philippine data. This reduces required local data volume by approximately 70%. Finally, the Sentiment Index: a Filipino-language NLP pipeline that parses local news, Lamudi listings comments, social media, and legal registry filings. This is the layer that no Western platform has.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6 – TECHNICAL: LightGBM & PROXY YIELD
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Technical Deep Dive: LightGBM & Proxy Yield Modeling");
  addFooter(s, 6);

  // Left panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.55, h: 4.05, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.55, h: 0.4, fill: { color: "1B5E8C" }, line: { color: "1B5E8C" } });
  s.addText("LightGBM Regressor — Feature Engineering", { x: 0.35, y: 1.1, w: 4.35, h: 0.4, fontSize: 11.5, color: WHITE, bold: true, valign: "middle", margin: 0 });

  const feats = [
    { cat: "Location Proxies", items: "Distance to CBD · Flood zone risk score · School quality index · Transit access" },
    { cat: "Infrastructure Indices", items: "Road quality · Utility reliability · Internet penetration · Port proximity" },
    { cat: "Amenity Scores", items: "Hospital distance · Mall access · Tourism density · Employment zone proximity" },
    { cat: "Price Trend Signals", items: "Quarterly price velocity · Momentum factor · Seasonal correction · YoY change" }
  ];
  feats.forEach((f, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.6 + i * 0.85, w: 0.08, h: 0.65, fill: { color: "1B5E8C" }, line: { color: "1B5E8C" } });
    s.addText(f.cat,   { x: 0.46, y: 1.6  + i * 0.85, w: 4.2, h: 0.28, fontSize: 10.5, color: NAVY, bold: true });
    s.addText(f.items, { x: 0.46, y: 1.87 + i * 0.85, w: 4.2, h: 0.4,  fontSize: 9.5,  color: BODY });
  });
  s.addText("Why LightGBM over XGBoost? Leaf-wise growth achieves lower loss per iteration · 50× faster training · Native sparse data support · No one-hot encoding overhead", {
    x: 0.35, y: 5.0, w: 4.35, h: 0.1, fontSize: 8, color: GRAY, italic: true
  });

  // Right panel
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 1.1, w: 4.7, h: 4.05, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 1.1, w: 4.7, h: 0.4, fill: { color: "8B5E1B" }, line: { color: "8B5E1B" } });
  s.addText("Proxy Yield Modeling — Methodology", { x: 5.15, y: 1.1, w: 4.5, h: 0.4, fontSize: 11.5, color: WHITE, bold: true, valign: "middle", margin: 0 });

  // Formula box
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.6, w: 4.5, h: 0.72, fill: { color: "FFF8E7" }, line: { color: GOLD, width: 1 } });
  s.addText("Proxy Yield = (Tourism Density × α) + (Infra Index × β)\n              + (Employment Score × γ) + ε", {
    x: 5.2, y: 1.62, w: 4.4, h: 0.68, fontSize: 10, color: NAVY, italic: true, align: "center", valign: "middle"
  });

  const proxyItems = [
    { title: "Rental Income Estimation", body: "Tourism density, AirBnB occupancy proxies, and seasonal signals combined to estimate likely rental income per sqm." },
    { title: "Capitalization Rate Proxies", body: "Regional GDP growth + employment density + SG/MY cap rate anchors → local cap rate estimates per market." },
    { title: "3-Year Return Modeling", body: "Proxy yield + LightGBM price appreciation prediction = expected total return for investor decision support." },
    { title: "Divergence Score", body: "Compares proxy-estimated fair value vs. current listing price — flags properties 15%+ over or undervalued." }
  ];
  proxyItems.forEach((item, i) => {
    s.addShape(pres.shapes.OVAL, { x: 5.15, y: 2.43 + i * 0.65, w: 0.16, h: 0.16, fill: { color: "8B5E1B" }, line: { color: "8B5E1B" } });
    s.addText(item.title, { x: 5.38, y: 2.36 + i * 0.65, w: 4.25, h: 0.28, fontSize: 10,   color: NAVY, bold: true });
    s.addText(item.body,  { x: 5.38, y: 2.63 + i * 0.65, w: 4.25, h: 0.3,  fontSize: 9,   color: BODY });
  });

  s.addNotes("For LightGBM, the feature engineering is critical. We use four categories. Location proxies capture structural value drivers — distance to CBDs, flood risk maps, school quality indices. Infrastructure indices assess physical capital quality. Amenity scores capture quality of life factors. And price trend signals introduce time-series momentum. For Proxy Yield Modeling, the key insight is that rental data is almost entirely absent in secondary Philippine cities. But we can construct a proxy yield from observable variables. Tourism density is particularly powerful for La Union — it's a major surf destination. We anchor our cap rates to Singapore and Malaysian comparables, then apply local adjustments. The output is a complete investment picture: expected yield, price appreciation, and a divergence score.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7 – TECHNICAL: TRANSFER LEARNING & SENTIMENT
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Technical Deep Dive: Transfer Learning & Sentiment-Aware Index");
  addFooter(s, 7);

  // Pipeline header
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 9.5, h: 0.4, fill: { color: NAVY_MID }, line: { color: NAVY_MID } });
  s.addText("TRANSFER LEARNING PIPELINE", { x: 0.25, y: 1.1, w: 9.5, h: 0.4, fontSize: 10.5, color: GOLD, bold: true, align: "center", valign: "middle", margin: 0, charSpacing: 3 });

  const steps = [
    { title: "Source\nDomain", sub: "Singapore & Malaysia", body: "2019–2024\n40,000+ transactions\nClean digital records\nFull rental data available", col: "1B5E8C" },
    { title: "Base Model\nTraining",  sub: "LightGBM on mature data", body: "Learns pricing patterns:\nlocation, size, age,\namenities, economic cycles", col: "1B6B8C" },
    { title: "Domain\nAdaptation",   sub: "Feature alignment layer", body: "Maps SG/MY features\nto PH equivalents.\nAdjusts for currency,\nland tenure differences", col: "1B7C5E" },
    { title: "Fine-Tuning\n(Local)", sub: "Philippine 2024 data", body: "500–1,200 local\ntransactions used.\nCultural & legal\noverlays applied", col: "1B6B3A" },
    { title: "Target\nDomain",       sub: "La Union & Iloilo", body: "Accurate valuations\ndespite sparse data.\nσ < 0.05 achieved\nacross test periods", col: "2D8B1B" }
  ];

  steps.forEach((st, i) => {
    const x = 0.28 + i * 1.9;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.58, w: 1.75, h: 1.95, fill: { color: st.col }, line: { color: st.col } });
    s.addText(st.title, { x: x + 0.05, y: 1.62, w: 1.65, h: 0.44, fontSize: 10, color: WHITE, bold: true, align: "center" });
    s.addText(st.sub,   { x: x + 0.05, y: 2.06, w: 1.65, h: 0.28, fontSize: 7.5, color: GOLD_LT, align: "center", italic: true });
    s.addText(st.body,  { x: x + 0.05, y: 2.36, w: 1.65, h: 1.1,  fontSize: 8.5, color: WHITE, align: "center" });
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: x + 1.75, y: 2.5, w: 0.15, h: 0.1, fill: { color: GOLD }, line: { color: GOLD } });
    }
  });

  // Sentiment section
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 3.65, w: 9.5, h: 0.4, fill: { color: "6B1B5E" }, line: { color: "6B1B5E" } });
  s.addText("SENTIMENT-AWARE MARKET EFFICIENCY INDEX", { x: 0.25, y: 3.65, w: 9.5, h: 0.4, fontSize: 10.5, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0, charSpacing: 3 });

  const sentCards = [
    { title: "Local News Feed", body: "Filipino-language NLP parses regional property news, zoning announcements, infrastructure approvals, and market sentiment signals in real time." },
    { title: "Social Media Signals", body: "Lamudi / OLX comments, Facebook property groups, and Twitter/X discussions analyzed for sentiment polarity and market mood." },
    { title: "Legal Registry Anomalies", body: "Transfer frequency anomalies, foreclosure patterns, and title dispute signals detected and flagged as property-level risk scores." },
    { title: "Cultural Weighting", body: "Proximity premiums/discounts for religious sites, schools, cemeteries, flood histories, and locally-known risk areas — applied as model features." }
  ];
  sentCards.forEach((card, i) => {
    const x = 0.28 + i * 2.38;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.12, w: 2.25, h: 1.08, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.12, w: 2.25, h: 0.08, fill: { color: "6B1B5E" }, line: { color: "6B1B5E" } });
    s.addText(card.title, { x: x + 0.08, y: 4.22, w: 2.1, h: 0.28, fontSize: 9.5, color: NAVY, bold: true });
    s.addText(card.body,  { x: x + 0.08, y: 4.5,  w: 2.1, h: 0.66, fontSize: 8.5, color: BODY });
  });

  s.addNotes("Transfer learning is the engine that makes ByteMe possible in data-sparse markets. We start with Singapore and Malaysia — 40,000+ clean transactions. We train a base model that learns fundamental pricing patterns. A domain adaptation layer maps these patterns to Philippine equivalents — for example, Singapore's MRT proximity premium maps to Iloilo's Megaworld township proximity premium. We fine-tune on just 500–1,200 local transactions. The Sentiment-Aware Index is our secret weapon. We built a Filipino-language NLP pipeline that reads local news for zoning announcements, monitors social media, scans legal registries for foreclosure patterns, and applies cultural weighting factors: in some Philippine communities, proximity to a church adds a 12–15% premium; proximity to certain flood-prone barangays applies an automatic discount regardless of official flood maps.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8 – METHODOLOGY
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Methodology: Research Design");
  addFooter(s, 8);

  // Timeline bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.32, w: 9.0, h: 0.07, fill: { color: NAVY }, line: { color: NAVY } });

  const tl = [
    { x: 0.5,  label: "2024 Q1–Q2", title: "Data Collection", body: "Philippine listings, economic indicators, land registry records collected" },
    { x: 2.8,  label: "2024 Q3",    title: "Model Training",   body: "Transfer learning from SG/MY. LightGBM fine-tuned on PH data" },
    { x: 5.1,  label: "2024 Q4",    title: "Simulation",       body: "La Union & Iloilo market simulations. 2025 benchmarks generated" },
    { x: 7.4,  label: "2025",       title: "Validation",       body: "Predictions validated vs. 2025 literature & media reports" }
  ];
  tl.forEach((t, i) => {
    s.addShape(pres.shapes.OVAL, { x: t.x + 0.82, y: 1.19, w: 0.32, h: 0.32, fill: { color: i === 3 ? GOLD : NAVY }, line: { color: i === 3 ? GOLD : NAVY } });
    s.addText(t.label, { x: t.x + 0.28, y: 0.9,  w: 1.4, h: 0.3,  fontSize: 8.5, color: GRAY, align: "center", italic: true });
    s.addText(t.title, { x: t.x + 0.18, y: 1.58, w: 1.6, h: 0.35, fontSize: 10.5, color: NAVY, bold: true, align: "center" });
    s.addText(t.body,  { x: t.x + 0.08, y: 1.92, w: 1.8, h: 0.72, fontSize: 8.5, color: BODY, align: "center" });
  });

  // Data sources
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 2.72, w: 4.55, h: 2.5, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 2.72, w: 4.55, h: 0.38, fill: { color: NAVY_MID }, line: { color: NAVY_MID } });
  s.addText("Data Sources", { x: 0.35, y: 2.72, w: 4.35, h: 0.38, fontSize: 12, color: WHITE, bold: true, valign: "middle", margin: 0 });
  const dss = [
    "Lamudi.com.ph — 8,000+ PH property listings (primary dataset)",
    "PSA — Regional economic indicators, employment, inflation",
    "Land Registration Authority — Title transfer records 2019–2024",
    "DENR — Flood hazard maps & official zoning records",
    "DOT — Tourism density & annual visitor statistics (La Union)",
    "Social media APIs — Property sentiment (filtered & anonymized)"
  ];
  dss.forEach((d, i) => {
    s.addShape(pres.shapes.OVAL, { x: 0.38, y: 3.18 + i * 0.35, w: 0.13, h: 0.13, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(d, { x: 0.58, y: 3.12 + i * 0.35, w: 4.1, h: 0.3, fontSize: 9.5, color: BODY });
  });

  // Evaluation metrics
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 2.72, w: 4.7, h: 2.5, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 2.72, w: 4.7, h: 0.38, fill: { color: NAVY_MID }, line: { color: NAVY_MID } });
  s.addText("Evaluation Metrics & Validation", { x: 5.15, y: 2.72, w: 4.5, h: 0.38, fontSize: 12, color: WHITE, bold: true, valign: "middle", margin: 0 });
  const metrics = [
    { m: "RMSE",  desc: "Root Mean Squared Error — primary prediction accuracy metric" },
    { m: "MAE",   desc: "Mean Absolute Error — avg. absolute divergence from true price" },
    { m: "σ<0.05",desc: "Variance threshold — our key predictive stability benchmark" },
    { m: "FP Rate",desc: "False-positive investment signal rate — reduced via cultural layer" },
    { m: "Lit. Check", desc: "2025 benchmark predictions cross-validated vs. JLL / CBRE / PSA reports" }
  ];
  metrics.forEach((m, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 3.18 + i * 0.4, w: 0.9, h: 0.3, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(m.m, { x: 5.15, y: 3.18 + i * 0.4, w: 0.9, h: 0.3, fontSize: 8.5, color: NAVY, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(m.desc, { x: 6.12, y: 3.18 + i * 0.4, w: 3.55, h: 0.3, fontSize: 9, color: BODY, valign: "middle" });
  });

  s.addNotes("Our research methodology is longitudinal — spanning 2024 data collection through 2025 validation. In Q1-Q2 2024, we collected from six sources: Lamudi.com.ph for property listings, PSA for economic indicators, the Land Registration Authority for transaction history, DENR flood maps, Department of Tourism statistics, and social media. Q3 2024: transfer learning training. Q4 2024: simulations for La Union and Iloilo, generating 2025 price benchmarks. The critical validation step occurred in 2025: we compared our predictions against contemporary academic literature and media reports — including JLL and CBRE Philippines market reports. This is more rigorous than standard cross-validation — it is genuine out-of-sample longitudinal prediction. Our key metric is σ < 0.05: predicted price ranges are extremely stable across test periods.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9 – CASE STUDY
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Case Study: La Union & Iloilo — Secondary Metropolitan Areas");
  addFooter(s, 9);

  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.08, w: 9.5, h: 0.48, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("Why secondary markets? The real investment opportunity lies where data is sparse but growth is accelerating — between the data void and the value frontier.", {
    x: 0.35, y: 1.08, w: 9.3, h: 0.48, fontSize: 10.5, color: GOLD_LT, italic: true, align: "center", valign: "middle", margin: 0
  });

  // La Union card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.64, w: 4.55, h: 3.55, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.64, w: 4.55, h: 0.44, fill: { color: "1B5E8C" }, line: { color: "1B5E8C" } });
  s.addText("La Union  ·  Luzon  ·  Surf Tourism Hub", { x: 0.35, y: 1.64, w: 4.35, h: 0.44, fontSize: 13, color: WHITE, bold: true, fontFace: "Trebuchet MS", valign: "middle", margin: 0 });
  const lu = [
    { t: "Market Dynamics", b: "Tourism-driven demand creates high short-term rental premiums. Beach-adjacent properties command 2–3× traditional residential yields." },
    { t: "Data Environment", b: "Fewer than 400 documented transactions/year. Zero published cap rate data. Proxy Yield Modeling is mission-critical here." },
    { t: "Key Value Drivers", b: "San Juan beach frontage premium · National Highway infrastructure · Benguet cold-chain corridor · Digital nomad demand growth" },
    { t: "Unique Challenge", b: "Informal pricing: beach-adjacent deals negotiated off-market. Sentiment index detects these via barangay-level social media monitoring." }
  ];
  lu.forEach((item, i) => {
    s.addText(item.t + ":", { x: 0.4, y: 2.17 + i * 0.74, w: 4.2, h: 0.26, fontSize: 10,   color: NAVY, bold: true });
    s.addText(item.b,        { x: 0.4, y: 2.42 + i * 0.74, w: 4.2, h: 0.44, fontSize: 9.0, color: BODY });
  });

  // Iloilo card
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 1.64, w: 4.7, h: 3.55, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 1.64, w: 4.7, h: 0.44, fill: { color: "1B6B3A" }, line: { color: "1B6B3A" } });
  s.addText("Iloilo City  ·  Visayas  ·  Emerging Tech Hub", { x: 5.15, y: 1.64, w: 4.5, h: 0.44, fontSize: 13, color: WHITE, bold: true, fontFace: "Trebuchet MS", valign: "middle", margin: 0 });
  const ilo = [
    { t: "Market Dynamics", b: "Megaworld Iloilo Business Park and ICT corridors drive rapid commercial-residential spillover. Township premiums of 20–35% documented." },
    { t: "Data Environment", b: "~900 transactions/year but concentrated in Megaworld developments. Secondary market data remains extremely sparse." },
    { t: "Key Value Drivers", b: "IBP district adjacency · Port expansion (2024) · UP Visayas research ecosystem · Inter-island transport hub designation" },
    { t: "Unique Challenge", b: "Rapid gentrification distorts historical prices. Transfer learning from Cebu (comparable trajectory) provides temporal anchoring." }
  ];
  ilo.forEach((item, i) => {
    s.addText(item.t + ":", { x: 5.2, y: 2.17 + i * 0.74, w: 4.4, h: 0.26, fontSize: 10,  color: NAVY, bold: true });
    s.addText(item.b,        { x: 5.2, y: 2.42 + i * 0.74, w: 4.4, h: 0.44, fontSize: 9.0, color: BODY });
  });

  s.addNotes("Why La Union and Iloilo? These are precisely the markets where the problem is most acute and the opportunity greatest. La Union is fascinating: driven by tourism and the digital nomad economy, short-term rental yields are 2–3× traditional residential yields, but there's almost no documented cap rate data. Our Proxy Yield Model is the only tool that can give an investor a meaningful number here. Iloilo is the other extreme: it has an institutional anchor in Megaworld's development, but the secondary market surrounding that anchor is completely opaque. Rapid gentrification means historical prices are misleading. Transfer learning from Cebu — which went through a very similar development trajectory a decade earlier — gives us the temporal anchoring needed to predict accurately. Both markets validated our approach precisely because they presented such different challenges.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 10 – RESULTS: PREDICTIVE PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Results: Predictive Performance");
  addFooter(s, 10);

  const stats = [
    { val: "σ<0.05",  label: "Predictive Variance",   sub: "High stability across all test periods", col: NAVY },
    { val: "±3.8%",   label: "Mean Absolute Error",    sub: "vs. actual 2025 market benchmarks",     col: "1B5E8C" },
    { val: "50%",     label: "FP Signal Reduction",    sub: "Fewer false-positive investment alerts", col: "1B6B3A" },
    { val: "2.0×",    label: "vs. Baseline Accuracy",  sub: "Improvement over generic XGBoost model", col: "8B5E1B" }
  ];
  stats.forEach((st, i) => {
    const x = 0.25 + i * 2.38;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.08, w: 2.22, h: 1.6, fill: { color: st.col }, line: { color: st.col }, shadow: makeShadow() });
    s.addText(st.val,   { x: x + 0.05, y: 1.12, w: 2.12, h: 0.75, fontSize: 34, color: GOLD, bold: true, align: "center", fontFace: "Trebuchet MS" });
    s.addText(st.label, { x: x + 0.05, y: 1.87, w: 2.12, h: 0.3,  fontSize: 9.5, color: WHITE, bold: true, align: "center" });
    s.addText(st.sub,   { x: x + 0.05, y: 2.17, w: 2.12, h: 0.38, fontSize: 8.0, color: GOLD_LT, align: "center", italic: true });
  });

  // Bar chart
  s.addChart(pres.charts.BAR, [{
    name: "MAE (%)",
    labels: ["XGBoost\nBaseline", "Hedonic\nModel", "LightGBM\nBase", "ByteMe\nNo Sent.", "ByteMe\nFull"],
    values: [18.4, 15.2, 11.7, 8.3, 3.8]
  }], {
    x: 0.25, y: 2.75, w: 5.15, h: 2.48,
    barDir: "col",
    chartColors: ["94A3B8", "94A3B8", "64748B", "2A3F6F", "D4A017"],
    chartArea: { fill: { color: WHITE }, roundedCorners: false },
    catAxisLabelColor: "64748B",
    valAxisLabelColor: "64748B",
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true, dataLabelColor: "1E293B", dataLabelFontSize: 10,
    showLegend: false, showTitle: true, title: "Mean Absolute Error (%) by Model",
    titleColor: NAVY, titleFontSize: 11
  });

  // Validation table
  s.addShape(pres.shapes.RECTANGLE, { x: 5.6, y: 2.75, w: 4.15, h: 2.48, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.6, y: 2.75, w: 4.15, h: 0.38, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("2024 → 2025 Validation", { x: 5.7, y: 2.75, w: 3.95, h: 0.38, fontSize: 11, color: WHITE, bold: true, valign: "middle", margin: 0 });
  s.addTable([
    [{ text: "Metric", options: { bold: true, color: WHITE, fill: { color: NAVY_MID }, fontSize: 9, align: "center" } }, { text: "ByteMe", options: { bold: true, color: WHITE, fill: { color: NAVY_MID }, fontSize: 9, align: "center" } }, { text: "Actual 2025", options: { bold: true, color: WHITE, fill: { color: NAVY_MID }, fontSize: 9, align: "center" } }],
    ["La Union PSM",   "₱38,400–42,200", "₱37,800–43,500"],
    ["Iloilo CBD PSM", "₱68,500–75,000", "₱67,200–76,800"],
    ["LU YoY Growth",  "+8.3%",          "+7.9%"],
    ["ILO YoY Growth", "+12.1%",         "+11.8%"],
    ["Variance σ",     "0.043",          "< 0.05 ✓"]
  ], {
    x: 5.6, y: 3.18, w: 4.15, h: 2.0,
    border: { pt: 0.5, color: GRAY_LT },
    colW: [1.55, 1.3, 1.3],
    fontSize: 9, color: BODY, fill: { color: WHITE }, align: "center"
  });

  s.addNotes("The results are strong. Our headline metric is σ = 0.043 — below our 0.05 threshold. In practical terms, for La Union we predicted ₱38,400–42,200 per sqm for 2025. Contemporary 2025 reports confirm ₱37,800–43,500 — our range sits precisely within the validated range. For Iloilo CBD, we predicted ₱68,500–75,000; actual 2025 benchmarks confirm ₱67,200–76,800. Our mean absolute error of ±3.8% compares to 7.7% for a generic XGBoost baseline — a 2.0× improvement. Critically, the false-positive investment signal reduction of 50% means investors using ByteMe are far less likely to chase properties that appear attractive but are fundamentally overpriced relative to yield-adjusted value.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 11 – RESULTS: MARKET INSIGHTS
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Results: Market Intelligence Insights");
  addFooter(s, 11);

  // La Union
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.6, h: 4.1, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.6, h: 0.4, fill: { color: "1B5E8C" }, line: { color: "1B5E8C" } });
  s.addText("La Union — Key Intelligence Findings", { x: 0.35, y: 1.1, w: 4.4, h: 0.4, fontSize: 11.5, color: WHITE, bold: true, valign: "middle", margin: 0 });
  const luI = [
    { h: "Valuation Divergence Detected", b: "23% of sampled listings overpriced by 15–28% vs. ByteMe yield-adjusted fair value. Concentrated in San Juan beachfront properties." },
    { h: "Top Driver: Beach Proximity", b: "Properties within 200m of surf beaches command a 34% premium. ByteMe models this; baseline undervalued it by ~18%." },
    { h: "Cultural Parsing Impact", b: "Removing the sentiment layer increased false positives by 2.8×. Barangay-level social media signals were critical to accuracy." },
    { h: "Undervalued Opportunity Cluster", b: "Inland properties 3–5km from beach with new road access identified as 15–22% undervalued — high-yield, low-competition window." },
    { h: "Early Speculative Warning", b: "Sentiment index detected 40% increase in speculative listing language in Q3 2024 — early warning signal for potential price correction." }
  ];
  luI.forEach((item, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.58 + i * 0.7, w: 0.07, h: 0.5, fill: { color: "1B5E8C" }, line: { color: "1B5E8C" } });
    s.addText(item.h, { x: 0.44, y: 1.58 + i * 0.7, w: 4.25, h: 0.26, fontSize: 9.5, color: NAVY, bold: true });
    s.addText(item.b, { x: 0.44, y: 1.83 + i * 0.7, w: 4.25, h: 0.38, fontSize: 8.5, color: BODY });
  });

  // Iloilo
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.1, w: 4.65, h: 4.1, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.1, w: 4.65, h: 0.4, fill: { color: "1B6B3A" }, line: { color: "1B6B3A" } });
  s.addText("Iloilo City — Key Intelligence Findings", { x: 5.2, y: 1.1, w: 4.45, h: 0.4, fontSize: 11.5, color: WHITE, bold: true, valign: "middle", margin: 0 });
  const iloI = [
    { h: "Megaworld Township Overvaluation", b: "IBP-district properties priced 31% above ByteMe's fundamental value — speculative positioning, not yield-driven demand." },
    { h: "Port Expansion 6-Week Early Signal", b: "Sentiment index detected listing price impact of 2024 port expansion 6 weeks before transaction data reflected the change." },
    { h: "Secondary Market Undervaluation", b: "Properties 5–8km from IBP with comparable amenities scored 18–24% undervalued — prime yield-optimized acquisition targets." },
    { h: "Cultural Risk: Unmapped Flood Zones", b: "Sentiment parser detected 12 community reports of flood risk in 3 barangays not on official DENR maps — critical loss-prevention signal." },
    { h: "Transfer Learning vs. Raw LightGBM", b: "Without Cebu transfer learning, gentrifying-area predictions had 2.4× higher error — confirming domain adaptation is essential." }
  ];
  iloI.forEach((item, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.58 + i * 0.7, w: 0.07, h: 0.5, fill: { color: "1B6B3A" }, line: { color: "1B6B3A" } });
    s.addText(item.h, { x: 5.29, y: 1.58 + i * 0.7, w: 4.35, h: 0.26, fontSize: 9.5, color: NAVY, bold: true });
    s.addText(item.b, { x: 5.29, y: 1.83 + i * 0.7, w: 4.35, h: 0.38, fontSize: 8.5, color: BODY });
  });

  s.addNotes("The market intelligence findings are where ByteMe's practical value becomes undeniable. In La Union, 23% of sampled listings were overpriced by 15 to 28% relative to yield-adjusted fair value. Nearly 1 in 4 listed properties has a fundamental problem that a naive investor would miss. We also identified undervalued clusters — inland properties with new road access that are 15 to 22% below fair value. For Iloilo, the port expansion finding is compelling: our sentiment index captured the price impact 6 weeks before it showed up in transaction data — a 6-week early warning window. We also caught flood risk signals in three barangays that official DENR maps didn't reflect — potentially protecting investors from catastrophic losses. This is the real-world difference between a culturally-aware system and a generic model.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 12 – IMPACT
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Impact: Democratizing Real Estate Intelligence");
  addFooter(s, 12);

  // Before
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.5, h: 3.9, fill: { color: "FFF0F0" }, line: { color: "FFCCCC" }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.5, h: 0.4, fill: { color: "C0392B" }, line: { color: "C0392B" } });
  s.addText("BEFORE ByteMe", { x: 0.35, y: 1.1, w: 4.3, h: 0.4, fontSize: 12, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
  const before = [
    "Only institutional investors access valuation analytics",
    "Retail investors rely on agent opinions — heavily biased",
    "No systematic detection of over/underpriced properties",
    "Cold-start markets = guesswork for new investors",
    "Cultural & legal risks invisible to quantitative tools",
    "Speculative inflation undetected until prices collapse",
    "Investment analysis takes weeks of manual research"
  ];
  before.forEach((item, i) => {
    s.addShape(pres.shapes.OVAL, { x: 0.4, y: 1.6 + i * 0.42, w: 0.16, h: 0.16, fill: { color: "C0392B" }, line: { color: "C0392B" } });
    s.addText(item, { x: 0.63, y: 1.55 + i * 0.42, w: 4.0, h: 0.36, fontSize: 9.5, color: BODY });
  });

  // After
  s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 1.1, w: 4.75, h: 3.9, fill: { color: "F0FFF4" }, line: { color: "CCFFDD" }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 1.1, w: 4.75, h: 0.4, fill: { color: "1B6B3A" }, line: { color: "1B6B3A" } });
  s.addText("AFTER ByteMe", { x: 5.1, y: 1.1, w: 4.55, h: 0.4, fontSize: 12, color: WHITE, bold: true, align: "center", valign: "middle", margin: 0 });
  const after = [
    "Any investor — retail or institutional — accesses same intelligence",
    "AI-validated fair values counter agent bias systematically",
    "Real-time divergence alerts flag over/undervalued properties",
    "Transfer learning enables reliable predictions with <500 data points",
    "Cultural & legal risk scores embedded in every property analysis",
    "Speculative inflation patterns detected weeks before price data shows",
    "Complete analysis in minutes — democratizing speed and depth"
  ];
  after.forEach((item, i) => {
    s.addShape(pres.shapes.OVAL, { x: 5.15, y: 1.6 + i * 0.42, w: 0.16, h: 0.16, fill: { color: "1B6B3A" }, line: { color: "1B6B3A" } });
    s.addText(item, { x: 5.38, y: 1.55 + i * 0.42, w: 4.22, h: 0.36, fontSize: 9.5, color: BODY });
  });

  // Beneficiaries strip
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 5.08, w: 9.5, h: 0.22, fill: { color: NAVY }, line: { color: NAVY } });
  const bens = ["Retail Investors", "OFW Remittance Investors", "SME Developers", "Local Government Units", "Urban Planners", "Researchers"];
  bens.forEach((b, i) => {
    const x = 0.32 + i * 1.58;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 5.1, w: 1.5, h: 0.18, fill: { color: i % 2 === 0 ? GOLD : GOLD_LT }, line: { color: GOLD } });
    s.addText(b, { x, y: 5.1, w: 1.5, h: 0.18, fontSize: 7.5, color: NAVY, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  s.addNotes("The impact of ByteMe is fundamentally about equity. Today, institutional-grade real estate intelligence is locked behind expensive retainers. Small investors — including millions of Overseas Filipino Workers who send remittances home and want to invest in Philippine property — have no access to the same quality of analysis. ByteMe changes that. Every person with internet access can query a property and receive the same depth of analysis that a professional investment firm would commission. The beneficiaries are broad: retail investors, OFW remittance investors, SME developers who can't afford institutional research, local government units making zoning decisions, and urban planners modeling growth corridors. This is not just a fintech product — it is a contribution to economic equity and sustainable regional development.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 13 – CONTRIBUTIONS
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Contributions to Management Science");
  addFooter(s, 13);

  const contribs = [
    {
      type: "THEORETICAL", icon: "T", col: NAVY,
      title: "New Valuation Framework",
      pts: [
        "First framework integrating transfer learning + cultural context + proxy yield in a unified RE valuation system",
        "Extends decision-support theory to data-scarce emerging market contexts in ASEAN",
        "Establishes σ < 0.05 as a practical benchmark for RE prediction stability in secondary SE Asian markets",
        "Model for how cultural signals translate into quantifiable market efficiency adjustments"
      ]
    },
    {
      type: "METHODOLOGICAL", icon: "M", col: "8B5E1B",
      title: "Cultural Contextualization Layer",
      pts: [
        "Novel methodology for Proxy Yield estimation from observable non-financial proxies in data-sparse markets",
        "Domain adaptation protocol for transferring ML models across real estate market maturity levels",
        "Filipino-language NLP pipeline for cultural and legal signal extraction — replicable across SE Asia",
        "Longitudinal validation design: genuine out-of-sample 2024→2025 test against live literature"
      ]
    },
    {
      type: "PRACTICAL", icon: "P", col: "1B6B3A",
      title: "Deployable Web Platform",
      pts: [
        "Production-ready web application accessible to any investor without technical expertise",
        "Replicable blueprint for culturally-aware PropTech in Vietnam, Indonesia, and Myanmar",
        "Addresses UN SDG 11 (Sustainable Cities) and SDG 10 (Reduced Inequalities)",
        "Directly aligns with conference mandate: shaping a resilient, transparent economic future"
      ]
    }
  ];

  contribs.forEach((c, i) => {
    const x = 0.25 + i * 3.22;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 3.08, h: 4.05, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 3.08, h: 0.85, fill: { color: c.col }, line: { color: c.col } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.1, y: 1.15, w: 0.7, h: 0.7, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(c.icon, { x: x + 0.1, y: 1.15, w: 0.7, h: 0.7, fontSize: 24, color: NAVY, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(c.type,  { x: x + 0.9, y: 1.17, w: 2.1, h: 0.3, fontSize: 9.5, color: GOLD, bold: true, charSpacing: 2 });
    s.addText(c.title, { x: x + 0.9, y: 1.47, w: 2.1, h: 0.4, fontSize: 11,  color: WHITE, bold: true });

    c.pts.forEach((pt, j) => {
      s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: 2.08 + j * 0.75, w: 0.13, h: 0.13, fill: { color: c.col }, line: { color: c.col } });
      s.addText(pt, { x: x + 0.32, y: 2.02 + j * 0.75, w: 2.65, h: 0.7, fontSize: 9, color: BODY, valign: "top" });
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 5.2, w: 9.5, h: 0.3, fill: { color: GOLD }, line: { color: GOLD } });
  s.addText("Conference Mandate Alignment: Shaping a Resilient Future through data transparency, equitable access, and sustainable regional economic management.", {
    x: 0.35, y: 5.2, w: 9.3, h: 0.3, fontSize: 9, color: NAVY, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addNotes("Three tiers of contribution. Theoretically: we extend the real estate valuation literature into a domain it has largely ignored — data-scarce, culturally complex emerging markets. Our framework is the first to combine transfer learning, cultural sentiment parsing, and proxy yield modeling. Methodologically: we introduce a novel proxy yield construction methodology and a Filipino-language NLP pipeline adaptable to other regional languages. Our longitudinal validation design is more rigorous than standard cross-validation. Practically: a working web platform, a replicable blueprint for Vietnam and Indonesia, and direct alignment with UN SDGs 10 and 11. Market transparency is not just good for investors — it stabilizes economies, reduces speculative bubbles, and ensures growth benefits communities, not just capital.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 14 – LIMITATIONS & FUTURE WORK
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: OFF_WHITE };
  addHeader(s, "Limitations & Future Work");
  addFooter(s, 14);

  // Limitations
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.55, h: 4.1, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 1.1, w: 4.55, h: 0.4, fill: { color: "C0392B" }, line: { color: "C0392B" } });
  s.addText("Current Limitations", { x: 0.35, y: 1.1, w: 4.35, h: 0.4, fontSize: 13, color: WHITE, bold: true, valign: "middle", margin: 0 });
  const lims = [
    { t: "Geographic Scope", b: "Validated on La Union & Iloilo only. Broader SE Asian generalizability requires additional validation studies per market." },
    { t: "Data Source Constraints", b: "Relies on Lamudi listings; not all-market. Private transaction data and developer bulk sales are invisible to the model." },
    { t: "Language Coverage", b: "Sentiment NLP optimized for Filipino/Tagalog. Bisaya and other Visayan dialects have partial coverage only." },
    { t: "Temporal Scope", b: "Trained on 2024 data; not yet stress-tested through a full economic cycle or major market downturn scenario." },
    { t: "Cultural Weight Calibration", b: "Cultural premium/discount weights calibrated via expert consultation but lack full empirical cross-regional validation." }
  ];
  lims.forEach((item, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.32, y: 1.58 + i * 0.7, w: 0.08, h: 0.52, fill: { color: "C0392B" }, line: { color: "C0392B" } });
    s.addText(item.t, { x: 0.48, y: 1.58 + i * 0.7, w: 4.2, h: 0.27, fontSize: 10,   color: NAVY, bold: true });
    s.addText(item.b, { x: 0.48, y: 1.84 + i * 0.7, w: 4.2, h: 0.37, fontSize: 9,   color: BODY });
  });

  // Future work
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 1.1, w: 4.7, h: 4.1, fill: { color: WHITE }, line: { color: GRAY_LT }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.05, y: 1.1, w: 4.7, h: 0.4, fill: { color: "1B6B3A" }, line: { color: "1B6B3A" } });
  s.addText("Future Directions", { x: 5.15, y: 1.1, w: 4.5, h: 0.4, fontSize: 13, color: WHITE, bold: true, valign: "middle", margin: 0 });
  const future = [
    { ph: "Phase 2", t: "ASEAN Expansion",       b: "Vietnam (HCMC secondary markets), Indonesia (Tier-2 cities), Thailand (Chiang Mai, Hua Hin). Multi-language NLP pipeline." },
    { ph: "Phase 3", t: "Real-Time Data Feeds",  b: "Live listing ingestion, real-time sentiment monitoring, and dynamic 30-day rolling model re-training." },
    { ph: "Phase 4", t: "Mobile Platform",        b: "iOS/Android app with location-based scanning, AR property overlay, and push alerts for divergence signals." },
    { ph: "Phase 5", t: "Open-Source Release",   b: "Release transfer learning framework and Proxy Yield methodology under open-source license for academic use." },
    { ph: "Ongoing", t: "Longitudinal Benchmark", b: "Continue 2024→2025→2026 validation cycle — building SE Asia's longest-running property prediction benchmark." }
  ];
  future.forEach((item, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.58 + i * 0.7, w: 0.68, h: 0.27, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(item.ph, { x: 5.15, y: 1.58 + i * 0.7, w: 0.68, h: 0.27, fontSize: 7.5, color: NAVY, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(item.t,  { x: 5.9,  y: 1.58 + i * 0.7, w: 3.75, h: 0.27, fontSize: 10,  color: NAVY, bold: true });
    s.addText(item.b,  { x: 5.15, y: 1.84 + i * 0.7, w: 4.45, h: 0.37, fontSize: 9,   color: BODY });
  });

  s.addNotes("Intellectual honesty about limitations is what separates strong research from weak research. Our geographic scope is currently two Philippine cities. This is a deliberate depth-over-breadth choice, but it means generalizability claims must be made cautiously. Our data sources are not all-market — private transactions are invisible to us. Our sentiment NLP has partial Bisaya coverage. And our temporal scope is one economic cycle. On future work: Phase 2 expands to Vietnam and Indonesia. Phase 3 introduces real-time feeds. Phase 4 delivers mobile access. And we intend to open-source the core framework — because the real estate data void in SE Asia is a problem that deserves community-wide solutions, not proprietary moats.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 15 – CONCLUSION
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0,     w: 10, h: 0.12, fill: { color: GOLD }, line: { color: GOLD } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.505, w: 10, h: 0.12, fill: { color: GOLD }, line: { color: GOLD } });

  s.addText("Conclusion", { x: 0.5, y: 0.28, w: 9, h: 0.44, fontSize: 13, color: MUTED, fontFace: "Trebuchet MS", align: "center", charSpacing: 4 });
  s.addText("The data void is real. The solution is here.", { x: 0.5, y: 0.68, w: 9, h: 0.7, fontSize: 26, color: GOLD, bold: true, fontFace: "Trebuchet MS", align: "center" });
  s.addShape(pres.shapes.RECTANGLE, { x: 2.5, y: 1.44, w: 5.0, h: 0.055, fill: { color: GOLD }, line: { color: GOLD } });

  const tks = [
    { n: "01", t: "ByteMe demonstrates that cultural intelligence + computational rigor = genuine market transparency in SE Asian real estate." },
    { n: "02", t: "With σ < 0.05 predictive stability and 50% false-positive reduction, the framework delivers institutional-grade reliability in data-sparse environments." },
    { n: "03", t: "Transfer learning from mature markets resolves the cold-start problem — enabling actionable insights with fewer than 500 local transactions." },
    { n: "04", t: "The cultural layer is not optional — removing it caused 2.8× more false positives, confirming that computation alone is insufficient in SE Asia." }
  ];
  tks.forEach((t, i) => {
    const x = 0.48 + (i % 2) * 4.82;
    const y = 1.65 + Math.floor(i / 2) * 1.28;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.58, h: 1.12, fill: { color: NAVY_MID }, line: { color: NAVY_LT, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.58, h: 1.12, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(t.n, { x, y, w: 0.58, h: 1.12, fontSize: 20, color: NAVY, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(t.t, { x: x + 0.65, y: y + 0.08, w: 3.85, h: 0.96, fontSize: 10, color: WHITE, valign: "middle" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9.0, h: 0.82, fill: { color: "0D1929" }, line: { color: GOLD, width: 1 } });
  s.addText("A resilient future for Southeast Asia's communities requires transparent, equitable, and culturally-grounded market intelligence. ByteMe is our contribution to that future.", {
    x: 0.65, y: 4.3, w: 8.7, h: 0.82, fontSize: 12, color: GOLD_LT, italic: true, align: "center", valign: "middle"
  });

  s.addNotes("In conclusion: the problem of real estate information asymmetry in Southeast Asia is real and significant. ByteMe is our answer. We have demonstrated four things. First, that cultural intelligence and computational rigor must coexist. Second, that σ < 0.05 predictive stability is achievable in data-sparse secondary markets. Third, that transfer learning genuinely solves the cold-start problem — validated against real 2025 market data. Fourth, that the cultural sentiment layer provides a 50% reduction in false positive signals — a number that translates directly into better investment decisions and reduced speculative risk. We invite the research community to build on this work. The data void in SE Asia is too large for any single team to fill. But ByteMe has established that the framework exists to do so. Thank you.");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 16 – REFERENCES & Q&A
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.12, fill: { color: GOLD }, line: { color: GOLD } });

  // References panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 0.25, w: 5.55, h: 5.0, fill: { color: NAVY_MID }, line: { color: NAVY_LT, width: 1 } });
  s.addText("References", { x: 0.4, y: 0.28, w: 5.2, h: 0.44, fontSize: 14, color: GOLD, bold: true, fontFace: "Trebuchet MS" });

  const refs = [
    "Ke, G. et al. (2017). LightGBM: A Highly Efficient GBDT. NeurIPS.",
    "Pan, S.J. & Yang, Q. (2010). A Survey on Transfer Learning. IEEE TKDE.",
    "Malpezzi, S. (2003). Hedonic Pricing Models. Housing Economics (Wiley).",
    "Philippine Statistics Authority (2024). Regional Price Indices & Housing.",
    "Land Registration Authority Philippines (2024). Property Transfer Stats.",
    "Lamudi Philippines (2024). Secondary Cities Property Market Report.",
    "JLL Philippines (2025). Real Estate Market Overview — Q1 2025.",
    "CBRE Philippines (2025). Iloilo & Secondary City Market Intelligence.",
    "UN-Habitat (2022). Urbanization in Southeast Asia: Data Gaps & Solutions.",
    "Goodfellow, I. et al. (2016). Deep Learning (Transfer Learning Chapter)."
  ];
  refs.forEach((ref, i) => {
    s.addText(`[${i + 1}]  ${ref}`, {
      x: 0.38, y: 0.78 + i * 0.42, w: 5.3, h: 0.38,
      fontSize: 8.5, color: i < 4 ? WHITE : MUTED, align: "left"
    });
  });

  // Thank You + Q&A
  s.addText("Thank You", { x: 6.1, y: 0.38, w: 3.7, h: 0.7, fontSize: 34, color: GOLD, bold: true, fontFace: "Trebuchet MS", align: "center" });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: 1.12, w: 3.7, h: 0.055, fill: { color: GOLD }, line: { color: GOLD } });

  // Team contacts
  s.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: 1.24, w: 3.7, h: 1.72, fill: { color: "0D1929" }, line: { color: NAVY_LT } });
  s.addText([
    { text: "Team ByteMe", options: { bold: true, color: GOLD, fontSize: 13, breakLine: true } },
    { text: "Honey Thet Htar Zin", options: { color: WHITE, fontSize: 10, breakLine: true } },
    { text: "honeyzin513@gmail.com", options: { color: MUTED, fontSize: 8.5, breakLine: true } },
    { text: "Sitt Min Thar", options: { color: WHITE, fontSize: 10, breakLine: true } },
    { text: "sittminthar005@gmail.com", options: { color: MUTED, fontSize: 8.5, breakLine: true } },
    { text: "Thu Htet Naing", options: { color: WHITE, fontSize: 10, breakLine: true } },
    { text: "kukue014@gmail.com", options: { color: MUTED, fontSize: 8.5 } }
  ], { x: 6.25, y: 1.28, w: 3.45, h: 1.65, align: "left", valign: "top" });

  // Q&A box
  s.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: 3.1, w: 3.7, h: 2.18, fill: { color: GOLD }, line: { color: GOLD } });
  s.addText("Questions &\nDiscussion", { x: 6.2, y: 3.22, w: 3.5, h: 0.9, fontSize: 24, color: NAVY, bold: true, fontFace: "Trebuchet MS", align: "center" });
  s.addText([
    { text: "Saigon Business School", options: { bold: true, breakLine: true } },
    { text: "Management Track  ·  April 2026", options: { breakLine: true } },
    { text: "LightGBM · Transfer Learning · Proxy Yield · SE Asia RE", options: { fontSize: 8 } }
  ], { x: 6.2, y: 4.18, w: 3.5, h: 0.95, fontSize: 9.5, color: NAVY, align: "center" });

  s.addNotes("Thank you. Anticipated judge questions: (1) How do you validate cultural weights? Calibrated with local real estate brokers and urban economists; 2025 validation confirms the weighting approach. (2) What is the computational cost? LightGBM inference is sub-second per property. (3) Have you compared against professional appraisers? Our ±3.8% MAE compares favorably to licensed appraisers who typically achieve 5–8% variance in secondary PH markets. (4) Can this extend to commercial property? Proxy yield methodology applies directly to commercial — Phase 3 target. (5) How do you handle post-disaster markets like post-typhoon recovery? Sentiment index detects disaster-related legal and social signals quickly; real-time feeds in Phase 3 will enhance this further.");
}

// ── Write file ─────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "/Users/m2/Downloads/Conference-master/ByteMe_Presentation.pptx" })
  .then(() => console.log("SUCCESS: ByteMe_Presentation.pptx generated."))
  .catch(err => { console.error("ERROR:", err); process.exit(1); });
