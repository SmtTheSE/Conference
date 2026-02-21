import requests
import time
import subprocess
import sys
import os
import signal

def run_tests():
    print("--- Innovation Challenge: Product Verification ---")
    
    # Start Servers
    print("Starting Product 1 (Port 5001)...")
    p1 = subprocess.Popen([sys.executable, "Product_1_Global_Market_Intelligence/api_server.py"], env={**os.environ, "PORT": "5001"})
    
    print("Starting Product 2 (Port 5002)...")
    p2 = subprocess.Popen([sys.executable, "Product_2_Investment_Opportunity_Scanner/api_server.py"], env={**os.environ, "PORT": "5002"})
    
    print("Starting Product 3 (Port 5003)...")
    p3 = subprocess.Popen([sys.executable, "Product_3_Cultural_AI_Assistant/chatbot_server.py"], env={**os.environ, "PORT": "5003"})
    
    # Wait for startup
    time.sleep(10)
    
    try:
        # Test Product 1
        print("\n[TEST] Product 1: Global Market Intelligence")
        url = "http://localhost:5001/predict_price"
        payload = {
            'country': 'Thailand', 'location': 'Sukhumvit', 
            'bedrooms': 2, 'bathrooms': 2, 'area_sqm': 60, 'property_type': 'Condo'
        }
        res = requests.post(url, json=payload)
        if res.status_code == 200:
            print(f"✅ Price Prediction Success: ${res.json()['predicted_price_usd']:,.2f}")
        else:
            print(f"❌ Product 1 Failed: {res.text}")

        # Test Product 2
        print("\n[TEST] Product 2: Investment Opportunity Scanner")
        url = "http://localhost:5002/get_yields"
        res = requests.get(url)
        if res.status_code == 200:
            top = res.json()['data'][0]
            print(f"✅ Yield Analysis Success: Found {top['location']} with {top['annual_yield_pct']:.2f}% yield")
        else:
            print(f"❌ Product 2 Failed: {res.text}")

        # Test Product 3
        print("\n[TEST] Product 3: Cultural AI Assistant")
        # Test Yield Intent
        url = "http://localhost:5003/chat"
        payload = {'message': "Where can I find high rental yields in Vietnam?"}
        res = requests.post(url, json=payload)
        if res.status_code == 200:
            print(f"✅ Chatbot (Yield) Success: {res.json()['response'][:100]}...")
        else:
            print(f"❌ Product 3 Failed: {res.text}")
            
        # Test Greeting
        payload = {'message': "Hello"}
        res = requests.post(url, json=payload)
        if res.status_code == 200:
             print(f"✅ Chatbot (Greeting) Success: {res.json()['response']}")

    except Exception as e:
        print(f"❌ Test Exception: {e}")
    finally:
        print("\nStopping Servers...")
        p1.terminate()
        p2.terminate()
        p3.terminate()
        p1.wait()
        p2.wait()
        p3.wait()

if __name__ == "__main__":
    run_tests()
