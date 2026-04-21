import streamlit as st
import pandas as pd
import json
import requests
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import numpy as np
import os
import sys

# Standalone mode support
@st.cache_resource
def get_standalone_service():
    try:
        from standalone_service import StandaloneService
        return StandaloneService()
    except Exception as e:
        st.error(f"Failed to load standalone service: {e}")
        return None

# ── Configuration ─────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="Intelligence Hub — Synergia 2026",
    layout="wide",
    initial_sidebar_state="expanded",
)

ACCENT     = "#1B4F72"   # deep ink-blue
RED        = "#C0392B"   # toned-down red
INK        = "#1A1A2E"   # near-black text
BG         = "#F7F6F2"   # warm linen page bg
SURFACE    = "#FFFFFF"   # card surface
MUTED      = "#6B7280"   # secondary text
BORDER     = "#D4D0C8"   # warm grey border/HR
SIDEBAR_BG = "#F0EEE9"   # sidebar panel
ACCENT_LT  = "#EAF1F8"   # pale accent tint

BASE_URLS = {
    "ph_valuator": os.getenv("BYTEME_PH_VALUATOR_URL", "http://localhost:5004"),
    "global_intel": os.getenv("BYTEME_GLOBAL_INTEL_URL", "http://localhost:5001"),
    "scanner":      os.getenv("BYTEME_SCANNER_URL",      "http://localhost:5002"),
    "assistant":    os.getenv("BYTEME_ASSISTANT_URL",    "http://localhost:5003"),
}

SIG_COLORS = {
    "HIGH_YIELD":   "#1A7A5E",
    "UNDERVALUED":  "#2A5FA8",
    "EMERGING":     "#5B3E8A",
    "WATCH":        "#B5621E",
}

# ── CSS ───────────────────────────────────────────────────────────────────────
st.markdown(f"""
<style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

    /* Base */
    .stApp {{ 
        background-color: {BG}; 
        color: {INK}; 
        font-family: 'IBM Plex Sans', system-ui, sans-serif; 
        font-size: 0.9rem;
        line-height: 1.6; 
    }}

    /* Sidebar */
    [data-testid="stSidebar"] {{ 
        background-color: {SIDEBAR_BG} !important; 
        border-right: 1px solid {BORDER} !important; 
    }}
    [data-testid="stSidebar"] * {{ color: {INK} !important; }}
    [data-testid="stSidebar"] .section-label {{ 
        color: {ACCENT} !important; 
        font-size: 0.68rem; 
        letter-spacing: 0.1rem;
        text-transform: uppercase; 
        font-weight: 600; 
        margin: 1.2rem 0 0.3rem 0; 
    }}

    /* Headers */
    .main-header {{ 
        font-family: 'IBM Plex Serif', Georgia, serif; 
        color: {INK}; 
        font-weight: 600; 
        font-size: 1.75rem;
        padding-bottom: 0.5rem; 
        border-bottom: 2px solid {ACCENT}; 
    }}
    .sub-header {{ 
        font-family: 'IBM Plex Sans', sans-serif; 
        color: {ACCENT}; 
        font-size: 0.72rem; 
        font-weight: 600;
        text-transform: uppercase; 
        letter-spacing: 0.09rem; 
        margin: 1.4rem 0 0.6rem 0; 
        border-bottom: 1px solid {BORDER};
        padding-bottom: 0.2rem; 
    }}

    /* Metric cards */
    .metric-card {{ 
        background: {SURFACE}; 
        border: 1px solid {BORDER}; 
        border-radius: 4px; 
        padding: 0.9rem 1rem; 
        width: 100%;
        text-align: center; 
    }}
    .metric-card .label {{ 
        font-family: 'IBM Plex Sans', sans-serif; 
        font-size: 0.68rem; 
        color: {MUTED}; 
        text-transform: uppercase; 
        letter-spacing: 0.08rem; 
        font-weight: 500; 
        margin-bottom: 0.3rem; 
    }}
    .metric-card .value {{ 
        font-family: 'IBM Plex Mono', monospace; 
        font-size: 1.35rem; 
        font-weight: 500; 
        color: {INK}; 
    }}
    .metric-card .sub {{ 
        font-family: 'IBM Plex Sans', sans-serif; 
        font-size: 0.72rem; 
        color: #9CA3AF; 
        margin-top: 0.2rem; 
    }}

    /* Signal cards — thin left border + pale tint */
    .card {{ 
        background: {SURFACE}; 
        border: 1px solid {BORDER}; 
        border-radius: 3px; 
        padding: 0.9rem 1rem; 
        margin-bottom: 0.6rem; 
    }}
    .card-high-yield  {{ border-left: 3px solid {SIG_COLORS['HIGH_YIELD']}; background: #F4FAF8; }}
    .card-undervalued {{ border-left: 3px solid {SIG_COLORS['UNDERVALUED']}; background: #F4F6FB; }}
    .card-emerging    {{ border-left: 3px solid {SIG_COLORS['EMERGING']}; background: #F7F5FB; }}
    .card-watch       {{ border-left: 3px solid {SIG_COLORS['WATCH']}; background: #FBF7F3; }}
    .card-risk        {{ border-left: 3px solid {RED}; background: #FCF4F4; }}
    .card-premium     {{ border-left: 3px solid {SIG_COLORS['HIGH_YIELD']}; background: #F4FAF8; }}
    .card-gold        {{ border-left: 3px solid {ACCENT}; background: {ACCENT_LT}; }}
    .card-neutral     {{ border-left: 3px solid {BORDER}; }}

    /* Outlined badges (no fill) */
    .badge {{ 
        display: inline-block; 
        padding: 0.15rem 0.5rem; 
        border-radius: 2px; 
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.65rem; 
        font-weight: 500; 
        letter-spacing: 0.05rem; 
        text-transform: uppercase; 
    }}
    .badge-high-yield  {{ border: 1px solid {SIG_COLORS['HIGH_YIELD']}; color: {SIG_COLORS['HIGH_YIELD']}; background: transparent; }}
    .badge-undervalued {{ border: 1px solid {SIG_COLORS['UNDERVALUED']}; color: {SIG_COLORS['UNDERVALUED']}; background: transparent; }}
    .badge-emerging    {{ border: 1px solid {SIG_COLORS['EMERGING']}; color: {SIG_COLORS['EMERGING']}; background: transparent; }}
    .badge-watch       {{ border: 1px solid {SIG_COLORS['WATCH']}; color: {SIG_COLORS['WATCH']}; background: transparent; }}
    .badge-red         {{ border: 1px solid {RED}; color: {RED}; background: transparent; }}
    .badge-gold        {{ border: 1px solid {ACCENT}; color: {ACCENT2 if 'ACCENT2' in locals() else ACCENT}; background: transparent; }}

    /* Gauge */
    .gauge-track {{ 
        height: 6px; 
        background: linear-gradient(to right, {SIG_COLORS['HIGH_YIELD']}, {BORDER}, {RED}); 
        border-radius: 3px; 
        position: relative; 
        margin: 0.5rem 0; 
        opacity: 0.7; 
    }}
    .gauge-needle {{ 
        width: 10px; 
        height: 10px; 
        background: {INK}; 
        border: 2px solid {SURFACE}; 
        border-radius: 50%; 
        position: absolute; 
        top: -2px; 
        transform: translateX(-50%); 
        box-shadow: 0 1px 3px rgba(0,0,0,0.2); 
    }}

    /* Chat bubbles */
    .chat-user {{ 
        background: {ACCENT_LT}; 
        border: 1px solid #C8D9EA; 
        border-radius: 4px 4px 1px 4px; 
        padding: 0.7rem 0.9rem; 
        margin: 0.35rem 0; 
        text-align: right; 
        font-size: 0.88rem; 
        color: {INK}; 
    }}
    .chat-assistant {{ 
        background: {SURFACE}; 
        border: 1px solid {BORDER}; 
        border-left: 3px solid {ACCENT}; 
        border-radius: 1px 4px 4px 4px; 
        padding: 0.7rem 0.9rem; 
        margin: 0.35rem 0; 
        font-size: 0.88rem; 
        color: {INK}; 
        line-height: 1.6; 
    }}

    /* Utilities */
    .gold {{ color: {ACCENT}; font-weight: 600; }}
    .red  {{ color: {RED}; font-weight: 600; }}
    .dim  {{ color: {MUTED}; font-size: 0.82rem; }}

    /* DataFrames */
    .stDataFrame {{ background: {SURFACE}; border: 1px solid {BORDER}; border-radius: 3px; }}

    /* Buttons — ghost outlined */
    .stButton > button {{ 
        background: transparent; 
        color: {ACCENT}; 
        border: 1px solid {ACCENT}; 
        border-radius: 3px; 
        font-family: 'IBM Plex Sans', sans-serif; 
        font-size: 0.82rem; 
        font-weight: 500; 
        letter-spacing: 0.03rem; 
        padding: 0.4rem 1rem;
        transition: background 0.15s, color 0.15s; 
    }}
    .stButton > button:hover {{ 
        background: {ACCENT}; 
        color: {SURFACE}; 
        border-color: {ACCENT}; 
    }}

    /* Expander */
    [data-testid="stExpander"] {{ 
        background: {SURFACE} !important; 
        border: 1px solid {BORDER} !important; 
        border-radius: 3px !important; 
        margin-bottom: 0.4rem !important; 
    }}
    [data-testid="stExpander"] summary {{ color: {INK} !important; font-size: 0.88rem; }}
    [data-testid="stExpander"] summary:hover {{ color: {ACCENT} !important; }}
    [data-testid="stExpander"] svg {{ fill: {MUTED} !important; }}

    /* Selectbox */
    div[data-baseweb="select"] > div {{ white-space: normal !important; min-height: 2.5rem !important; }}
    div[data-baseweb="select"] [data-testid="stMarkdownContainer"] p {{ white-space: normal !important; line-height: 1.2 !important; }}

    /* Selected location callout */
    .selected-location {{ 
        background: {ACCENT_LT}; 
        border: 1px solid #C8D9EA; 
        border-radius: 3px; 
        padding: 0.35rem 0.6rem; 
        font-size: 0.78rem; 
        font-family: 'IBM Plex Mono', monospace; 
        color: {ACCENT}; 
    }}

    /* HR */
    hr {{ border: none; border-top: 1px solid {BORDER}; margin: 1rem 0; }}
</style>
""", unsafe_allow_html=True)

# ── Helpers ───────────────────────────────────────────────────────────────────
def fmt_php(v):
    if v is None:
        return "—"
    if v >= 1_000_000:
        return f"₱{v/1_000_000:.2f}M"
    if v >= 1_000:
        return f"₱{v/1_000:.1f}K"
    return f"₱{v:.0f}"

def fmt_usd(v):
    if v is None or v == 0:
        return "—"
    if v >= 1_000_000:
        return f"${v/1_000_000:.2f}M"
    if v >= 1_000:
        return f"${v/1_000:.1f}K"
    return f"${v:,.0f}"

def sig_class(sig):
    return sig.lower().replace("_", "-")

def badge(label, cls):
    return f'<span class="badge badge-{cls}">{label}</span>'

def card_open(cls="neutral"):
    return f'<div class="card card-{cls}">'

def card_close():
    return "</div>"

def metric_card(label, value, sub=""):
    sub_html = f'<div class="sub">{sub}</div>' if sub else ""
    return f"""
<div class="metric-card">
  <div class="label">{label}</div>
  <div class="value">{value}</div>
  {sub_html}
</div>"""

def divergence_gauge(score, lo=-50, hi=50):
    pct = (score - lo) / (hi - lo) * 100
    pct = max(0, min(100, pct))
    color = SIG_COLORS["HIGH_YIELD"] if score < -5 else (RED if score > 5 else ACCENT)
    label = "UNDERVALUED" if score < -5 else ("OVERPRICED" if score > 5 else "FAIR VALUE")
    return f"""
<div>
  <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:{MUTED};margin-bottom:4px;">
    <span>Undervalued</span><span>Fair</span><span>Overpriced</span>
  </div>
  <div class="gauge-track">
    <div class="gauge-needle" style="left:{pct}%;"></div>
  </div>
  <div style="text-align:center;margin-top:6px;">
    <span style="color:{color};font-weight:700;font-size:1rem;">{score:+.1f}</span>
    <span style="color:{MUTED};font-size:0.75rem;margin-left:6px;">{label}</span>
  </div>
</div>"""

def api_get(module, path, params=None, timeout=8):
    # Try remote call first
    try:
        r = requests.get(f"{BASE_URLS[module]}{path}", params=params, timeout=timeout)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        # Fallback to standalone service
        service = get_standalone_service()
        if service:
            res = service.get(module, path, params)
            if "_error" not in res:
                return res
        return {"_error": f"Remote failed ({e}) and Standalone unavailable."}

def api_post(module, path, body=None, timeout=15):
    # Try remote call first
    try:
        r = requests.post(f"{BASE_URLS[module]}{path}", json=body or {}, timeout=timeout)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        # Fallback to standalone service
        service = get_standalone_service()
        if service:
            res = service.post(module, path, body)
            if "_error" not in res:
                return res
        return {"_error": f"Remote failed ({e}) and Standalone unavailable."}

def api_delete(module, path, timeout=10):
    try:
        r = requests.delete(f"{BASE_URLS[module]}{path}", timeout=timeout)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        return {"_error": str(e)}

def show_error(data, label="Service"):
    if isinstance(data, dict) and "_error" in data:
        st.error(f"{label} unavailable — {data['_error']}")
        return True
    return False

# ── Location constants (from byteme/page.tsx) ─────────────────────────────────
PH_LOCATIONS = {
    "La Union": [
        "san juan - beach district",
        "san juan - surf town",
        "san juan - inland cluster",
        "bauang - coastal",
        "bauang - inland",
        "san fernando city",
        "agoo - inland",
        "tubao",
    ],
    "Iloilo": [
        "iloilo business park - megaworld",
        "mandurriao - cbd fringe",
        "jaro - residential",
        "diversion road corridor",
        "la paz - mixed use",
        "molo - heritage district",
        "pavia - outskirts",
        "leganes - industrial fringe",
    ],
}

# ── Sidebar ───────────────────────────────────────────────────────────────────
def render_sidebar():
    with st.sidebar:
        st.markdown(f"""
        <div style="padding:1rem 0 0.5rem 0;">
          <div style="font-size:1.1rem;font-weight:800;color:{INK};letter-spacing:0.05rem;">
            INTELLIGENCE HUB
          </div>
          <div style="font-size:0.72rem;color:{ACCENT};letter-spacing:0.1rem;margin-top:2px;">
            SYNERGIA 2026
          </div>
        </div>
        <hr style="border-color:{BORDER};margin:0.5rem 0 1rem 0;">
        """, unsafe_allow_html=True)

        st.markdown('<div class="section-label">Market Analysis</div>', unsafe_allow_html=True)
        page = st.radio(
            "nav",
            [
                "PH Valuator",
                "Global Market Intel",
                "Opportunity Scanner",
                "Dynamic Data Lab",
                "Manage Data Registry",
                "Cultural AI Assistant",
            ],
            label_visibility="collapsed",
        )

        st.markdown(f'<hr style="border-color:{BORDER};margin:1rem 0;">', unsafe_allow_html=True)
        # Service status indicator
        is_standalone = True
        try:
            requests.get("http://localhost:5001/health", timeout=0.1)
            is_standalone = False
        except:
            pass
        
        status_color = "#FFA500" if is_standalone else "#00FF00"
        status_text = "STANDALONE MODE" if is_standalone else "REMOTE CONNECTED"
        st.markdown(f"""
        <div style="background:{ACCENT_LT};padding:0.5rem;border-radius:4px;text-align:center;border:1px solid {BORDER}">
          <span style="height:8px;width:8px;background-color:{status_color};border-radius:50%;display:inline-block;margin-right:5px;"></span>
          <span style="font-size:0.65rem;font-weight:700;color:{ACCENT};letter-spacing:0.05rem;">{status_text}</span>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f'<div class="dim" style="text-align:center;margin-top:10px;">Synergia 2026 &middot; ByteMe</div>', unsafe_allow_html=True)

    return page

# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 1 — PH VALUATOR (port 5004)
# ═══════════════════════════════════════════════════════════════════════════════
def page_ph_valuator():
    st.markdown('<div class="main-header">ByteMe PH Valuator</div>', unsafe_allow_html=True)
    st.markdown('<div class="dim">Philippine Real Estate Intelligence &mdash; La Union &amp; Iloilo</div>', unsafe_allow_html=True)

    # ── Model metrics strip ───────────────────────────────────────────────────
    metrics_data = api_get("ph_valuator", "/model_metrics")
    if not show_error(metrics_data, "Model Metrics"):
        mm = metrics_data if isinstance(metrics_data, dict) else {}
        demo = mm.get("demo", {})
        research = mm.get("research", {})
        c1, c2, c3, c4 = st.columns(4)
        with c1:
            st.markdown(metric_card("Validation MAE", f"{research.get('mae_pct', '—')}%", "holdout set"), unsafe_allow_html=True)
        with c2:
            st.markdown(metric_card("Real-World MAE", f"{demo.get('mae_pct', '—')}%", "field-tested"), unsafe_allow_html=True)
        with c3:
            st.markdown(metric_card("FP Reduction", f"{demo.get('false_pos_reduction_pct', '—')}%", "vs naive"), unsafe_allow_html=True)
        with c4:
            st.markdown(metric_card("vs Baseline", f"{demo.get('vs_xgboost_multiplier', '—')}x", "gain multiplier"), unsafe_allow_html=True)

    st.markdown("---")

    # ── 3-column body ─────────────────────────────────────────────────────────
    col_form, col_result, col_intel = st.columns([1, 1, 1])

    # ── Col 1: Form ───────────────────────────────────────────────────────────
    with col_form:
        st.markdown('<div class="sub-header">Property Parameters</div>', unsafe_allow_html=True)
        province = st.selectbox("Province", list(PH_LOCATIONS.keys()))
        location_key = st.selectbox("Location", PH_LOCATIONS[province])
        st.markdown(f'<div class="selected-location"><b>Active:</b> {location_key}</div>', unsafe_allow_html=True)
        
        area_sqm = st.number_input("Area (sqm)", min_value=10, max_value=2000, value=80, step=5)
        prop_cols = st.columns(2)
        with prop_cols[0]:
            bedrooms = st.number_input("Bedrooms", min_value=0, max_value=10, value=2)
        with prop_cols[1]:
            bathrooms = st.number_input("Bathrooms", min_value=1, max_value=10, value=1)
        property_type = st.selectbox("Property Type", ["Condominium", "House", "Townhouse", "Lot"])

        run = st.button("Run Valuation", use_container_width=True)

    # ── Col 2: Results ────────────────────────────────────────────────────────
    with col_result:
        st.markdown('<div class="sub-header">Valuation Output</div>', unsafe_allow_html=True)

        if run:
            with st.spinner("Computing..."):
                pred = api_post("ph_valuator", "/predict", {
                    "location_key": location_key,
                    "area_sqm": float(area_sqm),
                    "bedrooms": int(bedrooms),
                    "bathrooms": int(bathrooms),
                    "property_type": property_type.lower(),
                })
            if not show_error(pred, "Valuator"):
                st.session_state["ph_pred"] = pred

        pred = st.session_state.get("ph_pred")
        if pred:
            p = pred
            ppsm = p.get("ppsm_adjusted_php", 0)
            total_mid = p.get("total_price_mid_php", 0)
            total_lo  = p.get("total_price_lo_php", 0)
            total_hi  = p.get("total_price_hi_php", 0)
            div_score = p.get("divergence_score", 0)
            yield_pct = p.get("proxy_yield_pct", 0)
            rent      = p.get("monthly_rent_estimate_php", 0)
            sent      = p.get("sentiment_score", 0)

            st.markdown(f"""
            {card_open("gold")}
            <div class="dim">{p.get("location_display","")}</div>
            <div style="font-size:2rem;font-weight:800;color:{ACCENT};margin:0.3rem 0;">
              {fmt_php(ppsm)} <span style="font-size:0.9rem;color:{MUTED};">/sqm</span>
            </div>
            <div class="dim">Range: {fmt_php(p.get("ppsm_range_lo"))} — {fmt_php(p.get("ppsm_range_hi"))}</div>
            {card_close()}
            """, unsafe_allow_html=True)

            r1, r2, r3 = st.columns(3)
            with r1:
                st.markdown(metric_card("Gross Asset Value", fmt_php(total_mid), f"{fmt_php(total_lo)} — {fmt_php(total_hi)}"), unsafe_allow_html=True)
            with r2:
                st.markdown(metric_card("Alpha Yield", f"{yield_pct:.1f}%", "gross annual"), unsafe_allow_html=True)
            with r3:
                st.markdown(metric_card("Rent / mo", fmt_php(rent), "estimated"), unsafe_allow_html=True)

            st.markdown('<div class="sub-header">Divergence Score</div>', unsafe_allow_html=True)
            st.markdown(divergence_gauge(div_score), unsafe_allow_html=True)

            # Sentiment bar
            st.markdown(f"""
            <div style="margin-top:1rem;">
              <div class="dim" style="margin-bottom:4px;">Community Sentiment &mdash; {sent:.0f}/100</div>
              <div style="background:#E5E5E0;border-radius:4px;height:8px;">
                <div style="background:{ACCENT};height:8px;border-radius:4px;width:{sent}%;"></div>
              </div>
            </div>
            """, unsafe_allow_html=True)

            # Alerts
            if p.get("flood_flag"):
                st.warning(p.get("flood_note", "Flood risk zone."))
            if p.get("overpriced_flag"):
                st.error(p.get("overpriced_note", "Overpriced signal."))
            if p.get("opportunity_flag"):
                st.success(p.get("opportunity_note", "Opportunity signal."))
        else:
            st.markdown(f"""
            {card_open("neutral")}
            <div style="text-align:center;padding:2rem;color:#9CA3AF;">
              Configure parameters and run valuation.
            </div>
            {card_close()}
            """, unsafe_allow_html=True)

    # ── Col 3: Cultural Intelligence ──────────────────────────────────────────
    with col_intel:
        st.markdown('<div class="sub-header">Cultural Intelligence</div>', unsafe_allow_html=True)

        # Sentinel feed
        sentinel = api_get("ph_valuator", "/community_sentinel")
        if not show_error(sentinel, "Sentinel"):
            # sentinel is a dict of provinces. Let's flatten to get relevant headlines for the selection.
            all_headlines = []
            for prov, locs in sentinel.items():
                for loc, data in locs.items():
                    if loc.lower() == location_key.lower():
                        all_headlines.extend(data.get("headlines", []))
            
            if all_headlines:
                st.markdown('<div class="dim">Community Sentinel Feed</div>', unsafe_allow_html=True)
                for headline in all_headlines[:4]:
                    st.markdown(f"""
                    {card_open("neutral")}
                    <div style="font-size:0.8rem;color:{INK};">{headline}</div>
                    {card_close()}
                    """, unsafe_allow_html=True)

        pred = st.session_state.get("ph_pred")
        if pred:
            # Cultural risks
            risks = pred.get("cultural_risks", [])
            if risks:
                st.markdown('<div class="dim" style="margin-top:0.8rem;">Cultural Risks</div>', unsafe_allow_html=True)
                for r in risks:
                    name = r.get("factor", r.get("name", str(r)))
                    val  = r.get("impact", r.get("value", ""))
                    st.markdown(f"""
                    {card_open("risk")}
                    <div style="font-size:0.82rem;color:{INK};font-weight:600;">{name}</div>
                    <div class="dim">{val}</div>
                    {card_close()}
                    """, unsafe_allow_html=True)

            # Cultural premiums
            premiums = pred.get("cultural_premiums", [])
            if premiums:
                st.markdown('<div class="dim" style="margin-top:0.8rem;">Cultural Premiums</div>', unsafe_allow_html=True)
                for p in premiums:
                    name = p.get("factor", p.get("name", str(p)))
                    val  = p.get("impact", p.get("value", ""))
                    st.markdown(f"""
                    {card_open("premium")}
                    <div style="font-size:0.82rem;color:{INK};font-weight:600;">{name}</div>
                    <div class="dim">{val}</div>
                    {card_close()}
                    """, unsafe_allow_html=True)

    # ── Full-Width Research Section ───────────────────────────────────────────
    st.markdown("---")
    st.markdown('<div class="sub-header">Advanced Research & Model Architecture</div>', unsafe_allow_html=True)
    
    # Feature importance
    with st.expander("Feature Importance"):
        fi = api_get("ph_valuator", "/feature_importance")
        if not show_error(fi, "Feature Importance"):
            features = fi.get("features", []) if isinstance(fi, dict) else []
            if features:
                df = pd.DataFrame(features)
                if "name" in df.columns and "score" in df.columns:
                    fig = px.bar(df.sort_values("score", ascending=True).tail(10),
                                 x="score", y="name", orientation="h",
                                 color_discrete_sequence=[ACCENT])
                    fig.update_layout(
                        paper_bgcolor="#FFFFFF",
                        plot_bgcolor="#FFFFFF",
                        font_color=INK,
                        margin=dict(l=0, r=0, t=10, b=0),
                        height=300
                    )
                    st.plotly_chart(fig, use_container_width=True)

    # Transfer learning
    with st.expander("Transfer Learning Pipeline"):
        tl = api_get("ph_valuator", "/transfer_learning_comparison")
        if not show_error(tl, "Transfer Learning"):
            if isinstance(tl, dict):
                st.markdown(f'<div class="gold" style="font-size:0.85rem">Improvement: {tl.get("improvement", {}).get("mae_improvement_pct", "—")}%</div>', unsafe_allow_html=True)
                st.markdown(f'<div class="dim" style="font-size:0.75rem">{tl.get("improvement", {}).get("description", "")}</div>', unsafe_allow_html=True)
                
                comp_data = []
                if "with_transfer_learning" in tl:
                    tl["with_transfer_learning"]["type"] = "With Transfer"
                    comp_data.append(tl["with_transfer_learning"])
                if "without_transfer_learning" in tl:
                    tl["without_transfer_learning"]["type"] = "Without Transfer"
                    comp_data.append(tl["without_transfer_learning"])
                
                if comp_data:
                    st.dataframe(pd.DataFrame(comp_data), use_container_width=True, hide_index=True)

    # Ablation
    with st.expander("Ablation Study"):
        ab = api_get("ph_valuator", "/ablation_study")
        if not show_error(ab, "Ablation"):
            if isinstance(ab, dict):
                benefit = ab.get("cultural_layer_benefit", {})
                st.markdown(f'<div class="red" style="font-size:0.85rem">FP Reduction: {benefit.get("fp_reduction_pct", "—")}%</div>', unsafe_allow_html=True)
                st.markdown(f'<div class="dim" style="font-size:0.75rem">{benefit.get("methodology", "")}</div>', unsafe_allow_html=True)
                
                comp_data = []
                if "with_cultural_layer" in ab:
                    ab["with_cultural_layer"]["layer"] = "With Cultural"
                    comp_data.append(ab["with_cultural_layer"])
                if "without_cultural_layer" in ab:
                    ab["without_cultural_layer"]["layer"] = "Without Cultural"
                    comp_data.append(ab["without_cultural_layer"])
                    
                if comp_data:
                    st.dataframe(pd.DataFrame(comp_data), use_container_width=True, hide_index=True)


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 2 — GLOBAL MARKET INTEL (port 5001)
# ═══════════════════════════════════════════════════════════════════════════════
@st.cache_data(ttl=60)
def fetch_locations():
    return api_get("global_intel", "/locations")

def page_global_intel():
    st.markdown('<div class="main-header">Global Market Intelligence</div>', unsafe_allow_html=True)
    st.markdown('<div class="dim">Cross-border ASEAN property analytics — Philippines · Bangkok · Malaysia · Singapore</div>', unsafe_allow_html=True)

    locs_data = fetch_locations()
    if show_error(locs_data, "Locations"):
        locs_by_country = {}
    else:
        locs_by_country = locs_data if isinstance(locs_data, dict) else {}

    col_form, col_result = st.columns([1, 2])

    with col_form:
        st.markdown('<div class="sub-header">Valuation Engine</div>', unsafe_allow_html=True)
        countries = list(locs_by_country.keys()) if locs_by_country else ["Philippines", "Thailand", "Malaysia", "Singapore"]
        country = st.selectbox("Country", countries)
        location_opts = locs_by_country.get(country, []) if locs_by_country else []
        location = st.selectbox("Location", location_opts) if location_opts else st.text_input("Location")
        st.markdown(f'<div class="selected-location"><b>Active:</b> {location or "None"}</div>', unsafe_allow_html=True)
        
        area_sqm  = st.number_input("Area (sqm)", min_value=10, max_value=2000, value=80, step=5)
        bd_cols = st.columns(2)
        with bd_cols[0]:
            bedrooms = st.number_input("Bedrooms", min_value=0, max_value=10, value=2, key="gi_bed")
        with bd_cols[1]:
            bathrooms = st.number_input("Bathrooms", min_value=1, max_value=10, value=1, key="gi_bath")
        property_type = st.selectbox("Property Type", ["Condominium", "House", "Apartment", "Villa"], key="gi_type")

        run_pred = st.button("Predict Price", use_container_width=True)
        run_cmp  = st.button("Compare Markets", use_container_width=True)

    with col_result:
        st.markdown('<div class="sub-header">Intelligence Output</div>', unsafe_allow_html=True)

        if run_pred:
            with st.spinner("Predicting..."):
                res = api_post("global_intel", "/predict_price", {
                    "country": country, "location": location,
                    "bedrooms": int(bedrooms), "bathrooms": int(bathrooms),
                    "area_sqm": float(area_sqm), "property_type": property_type.lower(),
                })
            if not show_error(res, "Predict Price"):
                st.session_state["gi_pred"] = res

        if run_cmp:
            with st.spinner("Comparing markets..."):
                target_locs = []
                for c, ls in locs_by_country.items():
                    if c != country:
                        target_locs.extend([{"country": c, "location": l} for l in ls[:2]])
                res = api_post("global_intel", "/compare_markets", {
                    "source_country": country, "source_location": location,
                    "target_locations": target_locs[:6],
                    "bedrooms": int(bedrooms), "bathrooms": int(bathrooms),
                    "area_sqm": float(area_sqm), "property_type": property_type.lower(),
                })
            if not show_error(res, "Compare Markets"):
                st.session_state["gi_cmp"] = res

        pred = st.session_state.get("gi_pred")
        if pred:
            currency = pred.get("currency_local", "")
            local_p  = pred.get("predicted_price_local", 0)
            usd_p    = pred.get("predicted_price_usd", 0)
            rent     = pred.get("estimated_monthly_rent_local")
            demand   = pred.get("demand_score", 0)
            insight  = pred.get("nlp_insight", "")

            r1, r2, r3, r4 = st.columns(4)
            with r1:
                st.markdown(metric_card("Local Price", f"{currency}{local_p:,.0f}"), unsafe_allow_html=True)
            with r2:
                st.markdown(metric_card("USD Equiv.", fmt_usd(usd_p)), unsafe_allow_html=True)
            with r3:
                st.markdown(metric_card("Monthly Rent", f"{currency}{rent:,.0f}" if rent else "—"), unsafe_allow_html=True)
            with r4:
                st.markdown(metric_card("Demand Score", f"{demand:.0f}/100"), unsafe_allow_html=True)

            if insight:
                st.markdown(f"""
                {card_open("gold")}
                <div class="dim" style="margin-bottom:0.3rem;">NLP Market Insight</div>
                <div style="font-size:0.88rem;line-height:1.55;color:{INK};">{insight}</div>
                {card_close()}
                """, unsafe_allow_html=True)

        cmp = st.session_state.get("gi_cmp")
        if cmp:
            comparisons = cmp.get("comparisons", [])
            if comparisons:
                st.markdown('<div class="sub-header">Cross-Border Comparison</div>', unsafe_allow_html=True)
                cols = st.columns(3)
                for i, item in enumerate(comparisons[:6]):
                    diff_pct = item.get("difference_pct", 0)
                    color = SIG_COLORS["HIGH_YIELD"] if diff_pct < 0 else RED
                    with cols[i % 3]:
                        st.markdown(f"""
                        {card_open("neutral")}
                        <div class="dim">{item.get("country","")}</div>
                        <div style="font-weight:600;color:{INK};">{item.get("location","")}</div>
                        <div style="color:{ACCENT};font-size:1.1rem;font-weight:700;">{fmt_usd(item.get("price_usd", 0))}</div>
                        <div style="color:{color};font-size:0.8rem;">{diff_pct:+.1f}% vs source</div>
                        {card_close()}
                        """, unsafe_allow_html=True)


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 3 — OPPORTUNITY SCANNER (port 5002)
# ═══════════════════════════════════════════════════════════════════════════════
def page_scanner():
    st.markdown('<div class="main-header">Opportunity Scanner</div>', unsafe_allow_html=True)
    st.markdown('<div class="dim">Yield corridors &amp; market divergence signals across ASEAN markets</div>', unsafe_allow_html=True)

    # Controls row
    ctrl1, ctrl2, ctrl3 = st.columns([2, 1, 1])
    with ctrl1:
        country_filter = st.selectbox("Filter by Country", ["All", "Philippines", "Vietnam", "Malaysia", "Thailand", "Singapore"], key="sc_country")
    with ctrl2:
        refresh = st.button("Refresh Data", use_container_width=True)
    with ctrl3:
        st.markdown('<div style="height:2.1rem;"></div>', unsafe_allow_html=True)

    params = {} if country_filter == "All" else {"country": country_filter}

    if refresh or "sc_yields" not in st.session_state:
        with st.spinner("Loading scanner data..."):
            yields = api_get("scanner", "/get_yields", params=params)
            gaps   = api_get("scanner", "/gap_analysis", params=params)
        if not show_error(yields, "Yields") and not show_error(gaps, "Gap Analysis"):
            st.session_state["sc_yields"] = yields.get("data", []) if isinstance(yields, dict) else []
            st.session_state["sc_gaps"]   = gaps.get("data", [])   if isinstance(gaps,   dict) else []

    yields_list = st.session_state.get("sc_yields", [])
    gaps_list   = st.session_state.get("sc_gaps",   [])

    PAGE_SIZE = 6

    # ── Yield Corridors ───────────────────────────────────────────────────────
    st.markdown('<div class="sub-header">Yield Corridors</div>', unsafe_allow_html=True)
    if yields_list:
        y_page_key = "sc_y_page"
        if y_page_key not in st.session_state:
            st.session_state[y_page_key] = 0
        total_y = len(yields_list)
        y_page  = st.session_state[y_page_key]
        y_slice = yields_list[y_page * PAGE_SIZE : (y_page + 1) * PAGE_SIZE]

        cols = st.columns(3)
        for i, item in enumerate(y_slice):
            yld  = item.get("annual_yield_pct", 0)
            loc  = item.get("location", "—")
            ctry = item.get("country", "")
            price = item.get("median_sale_price_usd", 0)
            rent  = item.get("median_rental_price_usd", 0) or item.get("median_monthly_rent_usd", 0)
            sig_color = SIG_COLORS["HIGH_YIELD"] if yld >= 7 else (ACCENT if yld >= 5 else MUTED)
            badge_label = "PREMIUM" if yld >= 7 else ("HIGH" if yld >= 5 else "MODERATE")
            with cols[i % 3]:
                with st.expander(f"{loc} — {yld:.1f}%"):
                    st.markdown(f"""
                    {card_open("high-yield" if yld >= 7 else "neutral")}
                    <div class="dim">{ctry}</div>
                    <div style="font-size:1.6rem;font-weight:800;color:{sig_color};">{yld:.2f}%</div>
                    <div class="dim">Gross Annual Yield</div>
                    <hr style="border-color:{BORDER};margin:0.5rem 0;">
                    <div style="display:flex;justify-content:space-between;">
                      <span class="dim">Entry Price</span>
                      <span class="gold">{fmt_usd(price)}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:0.3rem;">
                      <span class="dim">Monthly Rent</span>
                      <span class="gold">{fmt_usd(rent) if rent else "—"}</span>
                    </div>
                    {card_close()}
                    """, unsafe_allow_html=True)

        # Pagination
        yp1, yp2, yp3 = st.columns([1, 3, 1])
        with yp1:
            if st.button("Prev", key="y_prev") and y_page > 0:
                st.session_state[y_page_key] -= 1
                st.rerun()
        with yp2:
            st.markdown(f'<div style="text-align:center;color:{MUTED};font-size:0.8rem;">Page {y_page+1} of {max(1,(total_y+PAGE_SIZE-1)//PAGE_SIZE)}</div>', unsafe_allow_html=True)
        with yp3:
            if st.button("Next", key="y_next") and (y_page + 1) * PAGE_SIZE < total_y:
                st.session_state[y_page_key] += 1
                st.rerun()
    else:
        st.info("No yield data available. Click Refresh Data or check port 5002.")

    # ── Divergence Signals (Gap Analysis) ────────────────────────────────────
    st.markdown('<div class="sub-header">Divergence Signals</div>', unsafe_allow_html=True)
    if gaps_list:
        g_page_key = "sc_g_page"
        if g_page_key not in st.session_state:
            st.session_state[g_page_key] = 0
        total_g = len(gaps_list)
        g_page  = st.session_state[g_page_key]
        g_slice = gaps_list[g_page * PAGE_SIZE : (g_page + 1) * PAGE_SIZE]

        cols = st.columns(3)
        for i, item in enumerate(g_slice):
            loc     = item.get("location", "—")
            ctry    = item.get("country", "")
            gap_sc  = item.get("gap_score", 0)
            supply  = item.get("supply_count", 0)
            avg_p   = item.get("avg_price_usd") or item.get("median_price", 0)
            tier    = "CRITICAL" if gap_sc >= 75 else ("HIGH" if gap_sc >= 50 else ("MODERATE" if gap_sc >= 25 else "LOW"))
            tier_color = RED if gap_sc >= 75 else (ACCENT if gap_sc >= 50 else (SIG_COLORS["UNDERVALUED"] if gap_sc >= 25 else MUTED))
            # Normalise bar: gap_score from API peaks around 30; scale to 100 for visual
            bar_pct = min(gap_sc * 3, 100)
            with cols[i % 3]:
                with st.expander(f"{loc} — {tier} ({gap_sc:.1f})"):
                    st.markdown(f"""
                    {card_open("neutral")}
                    <div class="dim">{ctry}</div>
                    <div style="font-size:1.5rem;font-weight:800;color:{tier_color};">{gap_sc:.1f}</div>
                    <div class="dim">MEI Gap Score &mdash; <span style="color:{tier_color};">{tier}</span></div>
                    <div style="background:#E5E5E0;border-radius:4px;height:6px;margin:0.5rem 0;">
                      <div style="background:{tier_color};height:6px;border-radius:4px;width:{bar_pct:.0f}%;"></div>
                    </div>
                    <hr style="border-color:{BORDER};margin:0.4rem 0;">
                    <div style="display:flex;justify-content:space-between;">
                      <span class="dim">Avg. Price</span>
                      <span class="gold">{fmt_usd(avg_p) if avg_p else "—"}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:0.25rem;">
                      <span class="dim">Listing Supply</span>
                      <span class="gold">{supply:,}</span>
                    </div>
                    {card_close()}
                    """, unsafe_allow_html=True)

        gp1, gp2, gp3 = st.columns([1, 3, 1])
        with gp1:
            if st.button("Prev", key="g_prev") and g_page > 0:
                st.session_state[g_page_key] -= 1
                st.rerun()
        with gp2:
            st.markdown(f'<div style="text-align:center;color:{MUTED};font-size:0.8rem;">Page {g_page+1} of {max(1,(total_g+PAGE_SIZE-1)//PAGE_SIZE)}</div>', unsafe_allow_html=True)
        with gp3:
            if st.button("Next", key="g_next") and (g_page + 1) * PAGE_SIZE < total_g:
                st.session_state[g_page_key] += 1
                st.rerun()
    else:
        st.info("No divergence data available. Click Refresh Data or check port 5002.")

    st.markdown(f"""
    <div style="margin-top:2rem;text-align:center;color:{MUTED};font-size:0.78rem;">
      Computational Rigor + Cultural Intelligence = Market Transparency.
    </div>
    """, unsafe_allow_html=True)


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 4 — DYNAMIC DATA LAB (port 5001)
# ═══════════════════════════════════════════════════════════════════════════════
def page_data_lab():
    st.markdown('<div class="main-header">Dynamic Data Lab</div>', unsafe_allow_html=True)
    st.markdown('<div class="dim">Upload datasets and train custom models via the Global Intel API</div>', unsafe_allow_html=True)

    col_analyze, col_train = st.columns([1, 1])

    with col_analyze:
        st.markdown('<div class="sub-header">Dataset Analysis</div>', unsafe_allow_html=True)
        uploaded = st.file_uploader("Upload CSV", type=["csv"])
        dataset_name = st.text_input("Dataset Name", value="custom_dataset")
        analyze_btn = st.button("Analyze Dataset", use_container_width=True)

        if analyze_btn:
            if uploaded:
                import io
                df = pd.read_csv(io.StringIO(uploaded.getvalue().decode("utf-8")))
                st.session_state["dl_df"] = df
                # Try API
                with st.spinner("Analyzing..."):
                    res = api_post("global_intel", "/analyze_dataset", {"dataset_name": dataset_name})
                if not show_error(res, "Analyze Dataset"):
                    st.session_state["dl_analysis"] = res
            else:
                st.warning("Please upload a CSV file first.")

        df = st.session_state.get("dl_df")
        analysis = st.session_state.get("dl_analysis")

        if df is not None:
            st.markdown('<div class="dim" style="margin-top:0.8rem;">Dataset Preview</div>', unsafe_allow_html=True)
            st.dataframe(df.head(5), use_container_width=True, hide_index=True)
            a1, a2, a3 = st.columns(3)
            with a1:
                st.markdown(metric_card("Rows", f"{len(df):,}"), unsafe_allow_html=True)
            with a2:
                st.markdown(metric_card("Columns", f"{len(df.columns)}"), unsafe_allow_html=True)
            with a3:
                nulls = df.isnull().sum().sum()
                st.markdown(metric_card("Null Values", f"{nulls:,}"), unsafe_allow_html=True)

        if analysis and not show_error(analysis, ""):
            st.markdown('<div class="dim" style="margin-top:0.8rem;">API Analysis Results</div>', unsafe_allow_html=True)
            for k, v in analysis.items():
                if isinstance(v, (int, float, str)):
                    st.markdown(metric_card(k.replace("_", " ").title(), str(v)), unsafe_allow_html=True)
            
            # --- Integration Option ---
            st.markdown('<div class="sub-header">Country Integration</div>', unsafe_allow_html=True)
            i_country = st.text_input("New Country Name")
            i_currency = st.text_input("Currency Code (e.g. PHP)")
            if st.button("Permanently Integrate Country", use_container_width=True):
                with st.spinner("Integrating..."):
                    res = api_post("global_intel", "/integrate_country", {
                        "dataset_id": dataset_name, # Usually the path returned from upload
                        "country_name": i_country,
                        "currency": i_currency
                    })
                if not show_error(res, "Integrate"):
                    st.success(f"Integrated {i_country}!")

    with col_train:
        st.markdown('<div class="sub-header">Model Training</div>', unsafe_allow_html=True)
        train_dataset = st.text_input("Dataset Name", value="custom_dataset", key="train_ds")
        target_col    = st.text_input("Target Column", value="price")
        model_type    = st.selectbox("Model Type", ["lightgbm", "xgboost", "random_forest", "linear"])
        train_btn     = st.button("Train Model", use_container_width=True)

        if train_btn:
            with st.spinner("Training... this may take a while"):
                res = api_post("global_intel", "/train_custom_model", {
                    "dataset_name": train_dataset,
                    "target_column": target_col,
                    "model_type": model_type,
                })
            if not show_error(res, "Train Model"):
                st.session_state["dl_train"] = res

        train_res = st.session_state.get("dl_train")
        if train_res:
            st.markdown('<div class="dim" style="margin-top:0.8rem;">Training Log</div>', unsafe_allow_html=True)
            log = train_res.get("log", train_res.get("message", json.dumps(train_res, indent=2)))
            st.code(log, language="text")
            m1, m2 = st.columns(2)
            with m1:
                mae = train_res.get("mae") or train_res.get("metrics", {}).get("mae")
                if mae:
                    st.markdown(metric_card("MAE", f"{mae:.4f}"), unsafe_allow_html=True)
            with m2:
                r2 = train_res.get("r2") or train_res.get("metrics", {}).get("r2")
                if r2:
                    st.markdown(metric_card("R²", f"{r2:.4f}"), unsafe_allow_html=True)


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 5 — MANAGE DATA REGISTRY (port 5001)
# ═══════════════════════════════════════════════════════════════════════════════
def page_registry():
    st.markdown('<div class="main-header">Data Registry</div>', unsafe_allow_html=True)
    st.markdown('<div class="dim">Manage dynamic country datasets and saved models</div>', unsafe_allow_html=True)

    col_countries, col_models = st.columns([1, 1])

    with col_countries:
        st.markdown('<div class="sub-header">Global Country Registry</div>', unsafe_allow_html=True)
        refresh_c = st.button("Refresh List", use_container_width=True, key="reg_ref_c")
        if refresh_c or "reg_countries" not in st.session_state:
            res = api_get("global_intel", "/countries")
            if not show_error(res, "Country List"):
                countries = res.get("countries", []) if isinstance(res, dict) else []
                st.session_state["reg_countries"] = countries

        countries_data = st.session_state.get("reg_countries", [])
        if countries_data:
            df = pd.DataFrame(countries_data)
            st.dataframe(df, use_container_width=True, hide_index=True)
            
            st.markdown('<div class="dim" style="margin-top:0.8rem;">Secure Deletion (Dynamic Only)</div>', unsafe_allow_html=True)
            del_name = st.selectbox("Select dynamic country to remove", 
                                  [c["name"] for c in countries_data if c.get("type") == "dynamic"] + ["None"])
            if del_name != "None":
                if st.button(f"Delete {del_name}", key="reg_del_c"):
                    res = api_delete("global_intel", f"/delete_country/{del_name}")
                    if not show_error(res, "Delete"):
                        st.success(f"Deleted {del_name}")
                        del st.session_state["reg_countries"]
                        st.rerun()
        else:
            st.info("No countries loaded.")

    with col_models:
        st.markdown('<div class="sub-header">Model Registry</div>', unsafe_allow_html=True)
        refresh_m = st.button("Refresh Models", use_container_width=True, key="reg_ref_m")
        if refresh_m or "reg_models" not in st.session_state:
            res = api_get("global_intel", "/list_saved_models")
            if not show_error(res, "Model List"):
                models = res if isinstance(res, list) else res.get("models", [])
                st.session_state["reg_models"] = models

        models = st.session_state.get("reg_models", [])
        if models:
            df = pd.DataFrame(models)
            st.dataframe(df, use_container_width=True, hide_index=True)
        else:
            st.info("No saved models found.")


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 6 — CULTURAL AI ASSISTANT (port 5003)
# ═══════════════════════════════════════════════════════════════════════════════
def page_assistant():
    st.markdown('<div class="main-header">Cultural AI Assistant</div>', unsafe_allow_html=True)

    # Info card
    st.markdown(f"""
    {card_open("gold")}
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-weight:700;color:{INK};">phi3:mini</span>
      <span class="dim">Specialisation: Philippine &amp; ASEAN Cultural Real Estate Context</span>
      <span class="badge badge-gold">LIVE</span>
    </div>
    {card_close()}
    """, unsafe_allow_html=True)

    # Init chat history
    if "chat_messages" not in st.session_state:
        st.session_state["chat_messages"] = []

    # Display history
    for msg in st.session_state["chat_messages"]:
        if msg["role"] == "user":
            st.markdown(f'<div class="chat-user">{msg["content"]}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="chat-assistant">{msg["content"]}</div>', unsafe_allow_html=True)

    # Input
    user_input = st.chat_input("Ask about Philippine property culture, OFW sentiment, barangay dynamics...")
    if user_input:
        st.session_state["chat_messages"].append({"role": "user", "content": user_input})
        with st.spinner("phi3:mini thinking..."):
            res = api_post("assistant", "/chat", {"message": user_input, "model": "phi3:mini"})
        if show_error(res, "Assistant"):
            reply = "Service unavailable. Please ensure the assistant service is running on port 5003."
        else:
            reply = res.get("response", res.get("message", res.get("content", str(res))))
        st.session_state["chat_messages"].append({"role": "assistant", "content": reply})
        st.rerun()

    if st.button("Clear Chat"):
        st.session_state["chat_messages"] = []
        st.rerun()


# ═══════════════════════════════════════════════════════════════════════════════
# ENTRY POINT
# ═══════════════════════════════════════════════════════════════════════════════
def main():
    page = render_sidebar()

    if page == "PH Valuator":
        page_ph_valuator()
    elif page == "Global Market Intel":
        page_global_intel()
    elif page == "Opportunity Scanner":
        page_scanner()
    elif page == "Dynamic Data Lab":
        page_data_lab()
    elif page == "Manage Data Registry":
        page_registry()
    elif page == "Cultural AI Assistant":
        page_assistant()

    st.markdown(f"""
    <div style="margin-top:3rem;text-align:right;color:{MUTED};font-size:0.72rem;">
      Intelligence Hub &mdash; Synergia 2026 &mdash; ByteMe &mdash; {datetime.now().strftime("%Y-%m-%d %H:%M")}
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()
