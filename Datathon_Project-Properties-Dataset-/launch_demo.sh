#!/bin/bash
echo "🚀 Launching Pan-Asian Real Estate Intelligence Demo..."

# Kill any existing processes on these ports
echo "Cleaning up ports..."
lsof -ti:5001,5002,5003,8000 | xargs kill -9 2>/dev/null

# Export API Key for Gemini Integration
export GEMINI_API_KEY="AIzaSyAnx2QJ9awa1pBjMVNwOXbWojqYrKsWjOw"

# Start Backend APIs
echo "Starting Product 1 (Global Market Intelligence)..."
PORT=5001 python3 Product_1_Global_Market_Intelligence/api_server.py > /tmp/p1.log 2>&1 &

echo "Starting Product 2 (Investment Scanner)..."
PORT=5002 python3 Product_2_Investment_Opportunity_Scanner/api_server.py > /tmp/p2.log 2>&1 &

echo "Starting Product 3 (Cultural Assistant)..."
PORT=5003 python3 Product_3_Cultural_AI_Assistant/chatbot_server.py > /tmp/p3.log 2>&1 &

# Start Simple HTTP Server for Frontend
echo "Starting Frontend Dashboard..."
cd frontend
python3 -m http.server 8000 > /tmp/frontend.log 2>&1 &
cd ..

echo "✅ System Online!"
echo "---------------------------------------------------"
echo "🌍 Dashboard URL: http://localhost:8000"
echo "---------------------------------------------------"
echo "Press Ctrl+C to stop all services."

# Keep script running to maintain background processes
trap "kill 0" EXIT
wait
