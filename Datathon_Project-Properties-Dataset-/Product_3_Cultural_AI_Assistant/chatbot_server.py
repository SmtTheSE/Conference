from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# Enable CORS manually
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Configuration
# In production, use environment variables
PRODUCT_1_URL = "http://localhost:5001"
PRODUCT_2_URL = "http://localhost:5002"

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'product': 'Cultural AI Assistant'})

@app.route('/chat', methods=['POST'])
def chat():
    """
    Simulated Chatbot Interface.
    Input: {'message': str, 'context': dict}
    Output: {'response': str}
    """
    data = request.json
    message = data.get('message', '').lower()
    
    # 1. Invest/Yield Intent -> Route to Product 2
    if 'invest' in message or 'yield' in message or 'hotspot' in message or 'return' in message:
        try:
            if 'vietnam' in message:
                response = requests.get(f"{PRODUCT_2_URL}/get_yields")
                if response.status_code == 200:
                    yield_data = response.json()['data']
                    top_loc = yield_data[0]
                    return jsonify({
                        'response': f"For high returns in Vietnam, I recommend looking at industrial zones like {top_loc['location']}. Requires lower capital entry (~${top_loc['median_sale_price_usd']:,.0f}) but offers excellent gross yields of {top_loc['annual_yield_pct']:.1f}%. This aligns with the 'Shaping the Future' of Vietnam's manufacturing growth."
                    })
            else:
                response = requests.get(f"{PRODUCT_2_URL}/hotspots")
                if response.status_code == 200:
                    return jsonify({
                        'response': "I found some emerging markets across the region. In Philippines, look for value plays. In Vietnam, secondary cities are offering the best entry prices. Would you like a specific country analysis?"
                    })
        except Exception as e:
            return jsonify({'response': "I'm having trouble connecting to the Investment Scanner. Please try again later."})

    # 2. Price/Valuation Intent -> Route to Product 1
    elif 'price' in message or 'cost' in message or 'value' in message or 'worth' in message:
        # Simplified parsing for demo
        # "How much is a condo in Sukhumvit?"
        try:
            # Default to a demo query if specific entities aren't parsed (NLP would go here)
            payload = {
                'country': 'Thailand', 'location': 'Sukhumvit', 
                'bedrooms': 1, 'bathrooms': 1, 'area_sqm': 35, 'property_type': 'Condo'
            }
            response = requests.post(f"{PRODUCT_1_URL}/predict_price", json=payload)
            if response.status_code == 200:
                price = response.json()['predicted_price_usd']
                return jsonify({
                    'response': f"A typical 1-bedroom condo in Sukhumvit, Bangkok is valued around ${price:,.0f} USD. In Thai culture, being close to the BTS 'Skytrain' lines like in Sukhumvit is premium for convenience and status."
                })
        except Exception:
            return jsonify({'response': "I can help benchmark property values. Try asking 'What is the price of a condo in Bangkok?'"})

    # 3. Cultural/General Intent
    elif 'hello' in message or 'hi' in message:
        return jsonify({
            'response': "Sawasdee krub / Xin chao! I am your Pan-Asian Real Estate Guide. I can help you find investment yields in Vietnam, benchmark prices in Bangkok, or discover hotspots in Manila. How can I help compare markets today?"
        })

    return jsonify({
        'response': "I didn't quite catch that. You can ask me about 'rental yields in Vietnam' or 'condo prices in Bangkok'."
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5003))
    app.run(host='0.0.0.0', port=port)
