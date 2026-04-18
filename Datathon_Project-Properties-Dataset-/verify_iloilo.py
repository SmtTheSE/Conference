import requests
import json

API = "http://localhost:5004"

def test_iloilo_megaworld():
    payload = {
        "location_key": "iloilo business park - megaworld",
        "area_sqm": 163,
        "bedrooms": 3,
        "bathrooms": 2,
        "property_type": "Condo"
    }
    
    try:
        print(f"Testing Iloilo Megaworld Valuation at {API}...")
        res = requests.post(f"{API}/predict", json=payload)
        res.raise_for_status()
        data = res.json()
        
        print(f"--- Verification Result ---")
        print(f"Location: {data['location_display']}")
        print(f"Fair Value: ₱{data['ppsm_adjusted_php']:,}/sqm")
        print(f"Total Value: ₱{data['total_price_mid_php']:,}")
        print(f"Proxy Yield: {data['proxy_yield_pct']}%")
        print(f"Overpriced Flag: {data['overpriced_flag']}")
        print(f"Overpriced Note: {data['overpriced_note']}")
        
        # Check benchmarks
        print(f"Cross-Border Benchmarks: {data['cross_border_benchmarks']}")
        
        # Check sentinel
        sentinel_res = requests.get(f"{API}/community_sentinel")
        sentinel_data = sentinel_res.json()
        headlines = sentinel_data.get("Iloilo", {}).get("Iloilo Business Park - Megaworld", {}).get("headlines", [])
        print(f"Sentinel Headlines: {headlines}")
        
        if data['overpriced_flag'] and "31%" in data['overpriced_note']:
            print("✅ SUCCESS: 31% Speculative Premium correctly identified.")
        else:
            print("❌ FAILURE: Overpriced flag or 31% mention missing.")
            
    except Exception as e:
        print(f"❌ ERROR: {e}")

if __name__ == "__main__":
    test_iloilo_megaworld()
