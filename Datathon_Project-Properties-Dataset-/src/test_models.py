from models import PricingModel, YieldAnalyzer
import pandas as pd

def test_pricing_model():
    print("\n--- 1. Testing Global Pricing Model ---")
    pm = PricingModel()
    
    # Train and Save
    print("Step A: Training Model...")
    pm.train()
    
    # Test Cases
    print("\nStep B: Verifying with Test Cases...")
    test_cases = [
        {
            'desc': "Luxury Condo in Bangkok (Sukhumvit)",
            'features': {
                'country': 'Thailand',
                'location': 'Sukhumvit',
                'bedrooms': 2, 
                'bathrooms': 2,
                'area_sqm': 80,
                'property_type': 'Condo'
            }
        },
        {
            'desc': "Family House in Manila (Quezon City)",
            'features': {
                'country': 'Philippines', 
                'location': 'Quezon City',
                'bedrooms': 4,
                'bathrooms': 3,
                'area_sqm': 200,
                'property_type': 'House'
            }
        },
        {
            'desc': "Townhouse in Ho Chi Minh City (District 1)",
            'features': {
                'country': 'Vietnam',
                'location': 'Quận 1, Hồ Chí Minh',
                'bedrooms': 3,
                'bathrooms': 3,
                'area_sqm': 100,
                'property_type': 'House'
            }
        }
    ]
    
    for case in test_cases:
        price = pm.predict(case['features'])
        print(f"\nCase: {case['desc']}")
        print(f"Features: {case['features']}")
        if price:
            print(f"Predicted Price: ${price:,.2f} USD")
        else:
            print("Prediction failed.")

def test_yield_analyzer():
    print("\n--- 2. Testing Yield Analyzer (Vietnam) ---")
    ya = YieldAnalyzer()
    
    print("Running Yield Analysis...")
    yields = ya.analyze_vietnam()
    
    if yields is not None and not yields.empty:
        print("\nVerification Passed: Yields calculated.")
        print(f"Top Location: {yields.index[0]}")
        print(f"Top Yield: {yields.iloc[0]['annual_yield_pct']:.2f}%")
        
        # Sanity Check
        top_yield = yields.iloc[0]['annual_yield_pct']
        if top_yield > 50:
            print("WARNING: Yield seems suspiciously high (>50%). Data quality check needed.")
        elif top_yield < 1:
            print("WARNING: Yield seems suspiciously low (<1%). Data quality check needed.")
        else:
            print("Sanity Check: Yield is within realistic range (1-50%).")
    else:
        print("Verification Failed: No yields calculated (possibly unified data issue).")

if __name__ == "__main__":
    test_pricing_model()
    test_yield_analyzer()
