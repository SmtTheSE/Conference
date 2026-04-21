import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# PHP/sqm base prices by location_key (mid-market estimate)
_PH_PPSM = {
    # La Union
    "san juan - beach district":      110_000,
    "san juan - surf town":            90_000,
    "san juan - inland cluster":       50_000,
    "bauang - coastal":                65_000,
    "bauang - inland":                 40_000,
    "san fernando city":               75_000,
    "agoo - inland":                   32_000,
    "tubao":                           26_000,
    # Iloilo
    "iloilo business park - megaworld": 150_000,
    "mandurriao - cbd fringe":         100_000,
    "jaro - residential":              65_000,
    "diversion road corridor":         75_000,
    "la paz - mixed use":              58_000,
    "molo - heritage district":        55_000,
    "pavia - outskirts":               32_000,
    "leganes - industrial fringe":     26_000,
}

# Gross rental yield by location_key
_PH_YIELD = {
    "san juan - beach district":       0.065,
    "san juan - surf town":            0.060,
    "san juan - inland cluster":       0.055,
    "bauang - coastal":                0.060,
    "bauang - inland":                 0.055,
    "san fernando city":               0.050,
    "agoo - inland":                   0.055,
    "tubao":                           0.055,
    "iloilo business park - megaworld": 0.045,
    "mandurriao - cbd fringe":         0.050,
    "jaro - residential":              0.055,
    "diversion road corridor":         0.052,
    "la paz - mixed use":              0.055,
    "molo - heritage district":        0.055,
    "pavia - outskirts":               0.065,
    "leganes - industrial fringe":     0.065,
}

_BEDROOM_ADJ  = {0: 0.85, 1: 0.92, 2: 1.00, 3: 1.06, 4: 1.10}
_TYPE_ADJ     = {"condominium": 1.05, "house": 1.00, "townhouse": 0.95, "lot": 0.70}


def _rule_price(body: dict) -> float:
    key    = str(body.get("location_key", "")).lower().strip()
    area   = float(body.get("area_sqm", 80) or 80)
    beds   = int(body.get("bedrooms", 2) or 2)
    ptype  = str(body.get("property_type", "condominium")).lower()

    ppsm   = _PH_PPSM.get(key, 60_000)
    bad    = _BEDROOM_ADJ.get(beds, 1.00)
    tadj   = _TYPE_ADJ.get(ptype, 1.00)
    return ppsm * area * bad * tadj


def _rule_yield(body: dict) -> float:
    key = str(body.get("location_key", "")).lower().strip()
    return _PH_YIELD.get(key, 0.055)


class StandaloneService:
    def get(self, module, path, params=None):
        if module == "ph_valuator":
            return self._ph_valuator_get(path, params)
        elif module == "global_intel":
            return self._global_intel_get(path, params)
        elif module == "scanner":
            return self._scanner_get(path, params)
        return {"_error": f"Module {module} not supported in standalone mode"}

    def post(self, module, path, body=None):
        if module == "ph_valuator":
            return self._ph_valuator_post(path, body or {})
        elif module == "global_intel":
            return self._global_intel_post(path, body or {})
        return {"_error": f"Module {module} not supported in standalone mode"}

    # ── PH Valuator ──────────────────────────────────────────────────────────

    def _ph_valuator_get(self, path, params):
        if path == "/model_metrics":
            return {
                "demo":     {"mae_pct": 8.4, "false_pos_reduction_pct": 42, "vs_xgboost_multiplier": 2.1},
                "research": {"mae_pct": 6.2},
            }
        if path == "/community_sentinel":
            sentinel_path = os.path.join(BASE_DIR, "datasets", "community_sentinel_signals.json")
            if os.path.exists(sentinel_path):
                with open(sentinel_path) as f:
                    return json.load(f)
            return {"La Union": {"san juan": {"headlines": ["New development approved", "Surf season peak"]}}}
        if path == "/feature_importance":
            return {"features": [
                {"name": "Location",  "score": 0.45},
                {"name": "Area",      "score": 0.35},
                {"name": "Bedrooms",  "score": 0.15},
            ]}
        return {"_error": f"Path {path} not implemented"}

    def _ph_valuator_post(self, path, body):
        if path == "/predict":
            price  = _rule_price(body)
            y      = _rule_yield(body)
            area   = float(body.get("area_sqm", 80) or 80)
            rent   = (price * y) / 12
            ppsm   = price / area

            return {
                "location_display":        body.get("location_key", "Selected Location"),
                "ppsm_adjusted_php":       ppsm,
                "total_price_mid_php":     price,
                "total_price_lo_php":      price * 0.95,
                "total_price_hi_php":      price * 1.05,
                "ppsm_range_lo":           ppsm * 0.95,
                "ppsm_range_hi":           ppsm * 1.05,
                "divergence_score":        -2.4,
                "proxy_yield_pct":         y * 100,
                "monthly_rent_estimate_php": rent,
                "sentiment_score":         78,
                "cultural_risks":    [{"factor": "Flood Zone",          "impact": "Moderate"}],
                "cultural_premiums": [{"factor": "Proximity to Beach",  "impact": "High"}],
            }
        return {"_error": f"Path {path} not implemented"}

    # ── Global Intel ─────────────────────────────────────────────────────────

    def _global_intel_get(self, path, params):
        if path == "/locations":
            return {
                "Philippines": ["Manila", "Cebu", "Davao", "Iloilo", "La Union"],
                "Vietnam":     ["Ho Chi Minh City", "Hanoi", "Da Nang"],
                "Thailand":    ["Bangkok", "Phuket", "Chiang Mai"],
            }
        return {"_error": f"Path {path} not implemented"}

    def _global_intel_post(self, path, body):
        if path == "/predict_price":
            price = _rule_price(body) if body.get("country") == "Philippines" else 200_000
            y     = _rule_yield(body) if body.get("country") == "Philippines" else 0.05
            return {
                "predicted_price_local":           price,
                "predicted_price_usd":             price * 0.018,
                "currency_local":                  "PHP" if body.get("country") == "Philippines" else "USD",
                "estimated_monthly_rent_local":    (price * y) / 12,
                "demand_score":                    82,
                "nlp_insight":                     "Strong market fundamentals detected in this corridor.",
            }
        return {"_error": f"Path {path} not implemented"}

    # ── Scanner ───────────────────────────────────────────────────────────────

    def _scanner_get(self, path, params):
        if path == "/get_yields":
            return {"data": [
                {"location": k, "yield_pct": round(v * 100, 2)} for k, v in _PH_YIELD.items()
            ]}
        if path == "/gap_analysis":
            return {"data": [
                {"location": k, "ppsm_php": v, "gap_score": round(150_000 / v, 2)}
                for k, v in _PH_PPSM.items()
            ]}
        return {"_error": f"Path {path} not implemented"}
