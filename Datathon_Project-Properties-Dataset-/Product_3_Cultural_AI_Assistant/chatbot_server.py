from flask import Flask, request, jsonify
import requests
import os
import json

app = Flask(__name__)

# Enable CORS manually
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# === Configuration ===
PRODUCT_1_URL = "http://localhost:5001"
PRODUCT_2_URL = "http://localhost:5002"

# === Cultural & Legal Knowledge Base (RAG-lite Document Store) ===
# This is injected into every Gemini prompt to ground the AI in real legal facts.
CULTURAL_KNOWLEDGE_BASE = """
## Pan-Asian Real Estate Legal & Cultural Intelligence (Ground Truth)

### PHILIPPINES
- **Foreign Investments Act (RA 7042)**: Foreigners CANNOT own land in the Philippines.
  They CAN own condominium units up to 40% of the total units in a building.
- **Indigenous People's Rights Act (IPRA / RA 8371)**: Ancestral domains of indigenous
  peoples (e.g., Cordillera, Mindanao tribes) are non-transferable. No foreign or
  non-indigenous person can hold title. This is a major red flag for any investment
  in highland or tribal areas.
- **La Union (San Juan)**: A premier surf town. Community interest and tourism have
  dramatically outpaced property listing prices — classified as a high-MEI (Market
  Efficiency Index) divergence zone in ByteMe's model. Entry prices remain relatively
  low vs. Bangkok or Manila, but appreciation potential is high.
- **Iloilo City**: Heritage district. Rapid urban renewal. Listings often under-price
  the city's true demand potential (identified as a valuation-to-listing divergence
  area in the ByteMe dataset analysis).
- **Condominium Act (RA 4726)**: A foreigner can acquire a condo unit provided
  Filipino ownership in the complex is at least 60%.

### THAILAND
- **Land Code Act (1954, amended)**: Foreigners CANNOT own land freehold. Options:
  1. Lease (up to 30 years, renewable).
  2. Thai company structure (must be minority stakeholder, scrutinized).
  3. Condominium ownership — foreigners can own up to 49% of total floor area.
- **Feng Shui / Spiritual Influence**: Strong in premium markets. North-facing units
  and proximity to temples often command a cultural premium. Relevant for Sukhumvit
  luxury market.
- **BTS Skytrain Corridor (Bangkok)**: Properties within 500m of BTS stations command
  a 15–30% price premium. ByteMe dataset confirms this via location frequency encoding.

### VIETNAM
- **2013 Land Law**: All land is owned by the state. Foreigners can:
  - Lease residential property for up to 50 years (renewable once).
  - Own apartments in approved foreign-investment projects.
- **Ho Chi Minh City (District 1, 2, 7, 9)**: ByteMe's proxy yield model anchors on
  50,000+ Vietnamese listings. These districts are the highest-confidence training data.
- **Da Nang**: Coastal city with growing foreign interest. Good yield proxy estimates.

### MALAYSIA
- **National Land Code**: Foreigners can buy property but must meet a minimum price
  threshold (usually RM 1 million+). Malaysia My Second Home (MM2H) program grants
  long-stay visas with property investment.
- **Kuala Lumpur**: Financial hub. Standard condo market well-represented in dataset.

### BYTEME MODEL CONTEXT
- Primary algorithm: LightGBM Gradient Boosting, trained on 50,000+ SE Asian listings.
- Proxy Yield Model: Vietnam-anchored, applied to Thailand/Philippines via transfer learning.
- Market Efficiency Index (MEI): Identifies zones where community interest (demand signal)
  outpaces current listing prices — La Union and Iloilo are ByteMe's top MEI divergence picks.
"""



# ===================================================================
#  OLLAMA LOCAL LLM INTEGRATION
# ===================================================================
OLLAMA_BASE_URL = os.environ.get('OLLAMA_BASE_URL', 'http://localhost:11434')
OLLAMA_MODEL    = os.environ.get('OLLAMA_MODEL', 'qwen2.5:7b')  # Best for SE Asian legal/cultural context


def _check_ollama_available():
    """Ping Ollama server to see if it is running."""
    try:
        r = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=2)
        if r.status_code == 200:
            models = [m['name'] for m in r.json().get('models', [])]
            return True, models
    except Exception:
        pass
    return False, []


class GeminiCulturalAssistant:
    """
    Senior Implementation: 3-tier LLM backend with automatic failover.

    Priority:
      1. Gemini 2.0 Flash  — best quality, requires API key + quota
      2. Ollama (llama3)   — local, free, no quota, always available
      3. Enhanced Fallback — law-grounded keyword responses

    All tiers share the same cultural system prompt and RAG-lite context injection.
    """

    GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    ENGINE_LABEL   = "gemini-2.0-flash"

    def __init__(self):
        self.conversation_sessions = {}  # session_id -> list of {role, parts}


    def _get_api_key(self, request_key=None):
        """Resolve API key: request-level > env var."""
        return request_key or os.environ.get('GEMINI_API_KEY')

    def _fetch_market_context(self, user_message):
        """
        RAG-lite: Fetch live data from Products 1 & 2 to inject into prompt.
        Only fetches if the user's question seems investment/price-related.
        """
        context_parts = []
        msg_lower = user_message.lower()

        # Fetch yield/hotspot data if relevant
        if any(k in msg_lower for k in ['invest', 'yield', 'return', 'roi', 'rent', 'hotspot', 'opportunity']):
            try:
                res = requests.get(f"{PRODUCT_2_URL}/get_yields", timeout=3)
                if res.status_code == 200:
                    yields = res.json().get('data', [])[:5]  # Top 5
                    if yields:
                        lines = [f"  - {y['location']}, {y['country']}: {y['annual_yield_pct']:.1f}% annual yield" for y in yields]
                        context_parts.append("**Live Top Yield Zones (ByteMe Scanner):**\n" + "\n".join(lines))
            except Exception:
                pass  # Non-blocking

        # Fetch gap/MEI data if relevant
        if any(k in msg_lower for k in ['gap', 'undervalue', 'hidden', 'mei', 'la union', 'iloilo', 'diverge']):
            try:
                res = requests.get(f"{PRODUCT_2_URL}/gap_analysis", timeout=3)
                if res.status_code == 200:
                    gaps = res.json().get('data', [])[:5]  # Top 5
                    if gaps:
                        lines = [f"  - {g['location']}, {g['country']}: Gap Score {g['gap_score']:.0f}" for g in gaps]
                        context_parts.append("**Live Market Gap Analysis (ByteMe MEI):**\n" + "\n".join(lines))
            except Exception:
                pass

        # Fetch price benchmark if relevant
        if any(k in msg_lower for k in ['price', 'cost', 'worth', 'value', 'bangkok', 'manila', 'kuala', 'hanoi']):
            try:
                # Quick benchmark: 1BR condo in Bangkok
                payload = {'country': 'Thailand', 'location': 'Sukhumvit',
                           'bedrooms': 1, 'bathrooms': 1, 'area_sqm': 35, 'property_type': 'Condo'}
                res = requests.post(f"{PRODUCT_1_URL}/predict_price", json=payload, timeout=3)
                if res.status_code == 200:
                    data = res.json()
                    context_parts.append(
                        f"**Live Price Benchmark (ByteMe Model):**\n"
                        f"  - 1BR Condo, Sukhumvit, Bangkok: THB {data['predicted_price_local']:,.0f} "
                        f"(~${data['predicted_price_usd']:,.0f} USD), Est. Yield: "
                        f"{(data['estimated_monthly_rent_usd']*12/data['predicted_price_usd']*100):.1f}%"
                    )
            except Exception:
                pass

        return "\n\n".join(context_parts) if context_parts else None

    def _build_system_prompt(self, market_context=None):
        """Build the full system prompt: legal KB + live market data."""
        system = f"""You are ByteMe's Cultural AI Assistant — a senior Pan-Asian real estate legal expert and investment analyst for the 1st Synergia International Conference 2026.

Your role:
1. Provide legally accurate guidance on property ownership laws across Southeast Asia.
2. Offer culturally sensitive investment analysis (heritage zones, indigenous land rights, local customs).
3. Ground your answers in ByteMe's computational findings where relevant.
4. Be concise, professional, and data-backed.

{CULTURAL_KNOWLEDGE_BASE}
"""
        if market_context:
            system += f"\n\n## 📡 Live ByteMe Market Data (as of this session):\n{market_context}"

        system += "\n\nAlways cite specific laws (e.g., RA 7042, Land Code Act) when discussing legal constraints. If unsure, say so clearly."
        return system

    def _call_ollama(self, message, system_prompt, session_id):
        """
        Tier 2: Call local Ollama API (llama3 by default).
        Uses /api/chat endpoint with multi-turn message history.
        Returns (response_text, engine_label) or raises on failure.
        """
        history = self.conversation_sessions.get(session_id, [])

        # Build Ollama messages list (system + history + new user message)
        messages = [{"role": "system", "content": system_prompt}]
        for turn in history:
            role = turn.get('role', 'user')
            # Ollama uses 'assistant' not 'model'
            if role == 'model':
                role = 'assistant'
            content = turn.get('parts', [{}])[0].get('text', '')
            messages.append({"role": role, "content": content})
        messages.append({"role": "user", "content": message})

        payload = {
            "model": OLLAMA_MODEL,
            "messages": messages,
            "stream": False,
            "options": {"temperature": 0.7, "num_predict": 1024}
        }

        resp = requests.post(f"{OLLAMA_BASE_URL}/api/chat", json=payload, timeout=60)
        resp.raise_for_status()
        ai_text = resp.json()['message']['content']

        # Update shared conversation history (Gemini-format for consistency)
        if session_id not in self.conversation_sessions:
            self.conversation_sessions[session_id] = []
        self.conversation_sessions[session_id].append(
            {"role": "user", "parts": [{"text": message}]}
        )
        self.conversation_sessions[session_id].append(
            {"role": "model", "parts": [{"text": ai_text}]}
        )
        # Bound history
        if len(self.conversation_sessions[session_id]) > 20:
            self.conversation_sessions[session_id] = self.conversation_sessions[session_id][-20:]

        return ai_text, f"ollama-{OLLAMA_MODEL}"

    def chat(self, message, session_id=None, api_key=None):
        """
        3-Tier LLM Chat:
          1. Gemini 2.0 Flash  (if API key + quota available)
          2. Ollama llama3      (local, always free, no quota)
          3. Enhanced Fallback  (law-grounded keyword responses)
        All tiers use the same cultural system prompt + RAG-lite context.
        """
        key = self._get_api_key(api_key)

        # Fetch live market context (RAG-lite) — shared across all tiers
        market_context = self._fetch_market_context(message)
        system_prompt  = self._build_system_prompt(market_context)

        # ── TIER 1: Gemini 2.0 Flash ──────────────────────────────────────────
        if key:
            if session_id not in self.conversation_sessions:
                self.conversation_sessions[session_id] = []
            history = self.conversation_sessions[session_id]

            payload = {
                "system_instruction": {"parts": [{"text": system_prompt}]},
                "contents": history + [{"role": "user", "parts": [{"text": message}]}],
                "generationConfig": {"temperature": 0.7, "maxOutputTokens": 1024, "topP": 0.95}
            }
            try:
                url = f"{self.GEMINI_API_URL}?key={key}"
                response = requests.post(url, json=payload, timeout=15)

                if response.status_code == 200:
                    result  = response.json()
                    ai_text = result['candidates'][0]['content']['parts'][0]['text']
                    history.append({"role": "user",  "parts": [{"text": message}]})
                    history.append({"role": "model", "parts": [{"text": ai_text}]})
                    if len(history) > 20:
                        self.conversation_sessions[session_id] = history[-20:]
                    return ai_text, self.ENGINE_LABEL
                else:
                    print(f"Gemini error {response.status_code} — trying Ollama fallback")
            except Exception as e:
                print(f"Gemini call failed ({e}) — trying Ollama fallback")

        # ── TIER 2: Ollama Local LLM ───────────────────────────────────────────
        ollama_available, ollama_models = _check_ollama_available()
        if ollama_available:
            # Pick preferred model, fall back to first available if llama3 not found
            model_to_use = OLLAMA_MODEL
            if not any(OLLAMA_MODEL in m for m in ollama_models):
                model_to_use = ollama_models[0] if ollama_models else OLLAMA_MODEL
                print(f"Preferred model '{OLLAMA_MODEL}' not found, using '{model_to_use}'")
            try:
                ai_text, engine = self._call_ollama(message, system_prompt, session_id)
                return ai_text, engine
            except Exception as e:
                print(f"Ollama call failed ({e}) — using enhanced fallback")

        # ── TIER 3: Enhanced Legal Fallback ────────────────────────────────────
        return self._enhanced_fallback(message, market_context), "enhanced-fallback"

    def _gemini_update_history_placeholder(self, session_id, message, ai_text):
        """(Internal) Kept for backward compatibility."""
        pass

    def _gemini_bound_history(self, session_id):
        """(Internal) Kept for backward compatibility."""
        if len(self.conversation_sessions.get(session_id, [])) > 20:
            self.conversation_sessions[session_id] = self.conversation_sessions[session_id][-20:]

    def _keep_history_compat(self, history, session_id):
        """Bound history to last 20 turns to avoid token overflow."""
        if len(history) > 20:
            self.conversation_sessions[session_id] = history[-20:]

    # ── Legacy reference kept from original refactor ───────────────────────────
    def _bound_history(self, history, session_id):
        """Keep history bounded to last 20 turns to avoid token limits."""
        if len(history) > 20:
            self.conversation_sessions[session_id] = history[-20:]


    def _enhanced_fallback(self, message, market_context=None):
        """
        Intelligent rule-based fallback when Gemini API is unavailable.
        Still references legal facts and market data.
        """
        msg = message.lower()

        # Build a context prefix if we have live data
        ctx = ""
        if market_context:
            ctx = f"\n\n📡 *Live market data available: {market_context[:200]}...*"

        if any(k in msg for k in ['foreigner', 'foreign', 'own land', 'ownership']):
            if 'philippine' in msg or 'ph' in msg:
                return (
                    "Under the **Foreign Investments Act (RA 7042)**, foreigners cannot own land in the Philippines. "
                    "However, you CAN own a condominium unit as long as foreign ownership of the building does not exceed **40%** "
                    "(Condominium Act, RA 4726). Be aware of the **IPRA (RA 8371)** — ancestral domains are off-limits entirely. "
                    "ByteMe recommends high-MEI condo opportunities in La Union and Iloilo as safe entry points." + ctx
                )
            if 'thailand' in msg or 'thai' in msg:
                return (
                    "Under Thailand's **Land Code Act**, foreigners **cannot own land freehold**. Your options are: "
                    "(1) a **30-year lease** (renewable), (2) condo ownership up to **49% of total floor area** in a building. "
                    "A Thai majority-owned company structure exists but is heavily scrutinized. "
                    "The BTS corridor in Bangkok commands a 15–30% premium per ByteMe's dataset." + ctx
                )
            if 'vietnam' in msg or 'viet' in msg:
                return (
                    "Under Vietnam's **2013 Land Law**, all land is state-owned. Foreigners can lease for up to **50 years** "
                    "(renewable once) and can own apartments in approved foreign-investment projects. "
                    "ByteMe's proxy yield model is anchored on 50,000+ Vietnamese listings — the highest data confidence in the platform." + ctx
                )

        if any(k in msg for k in ['la union', 'iloilo']):
            location = 'La Union' if 'la union' in msg else 'Iloilo'
            return (
                f"**{location}** is one of ByteMe's top **MEI divergence zones** in the Philippines. "
                f"Our model identifies significant valuation-to-listing price divergence here — community interest "
                f"(demand) has outpaced market pricing, signaling an undervalued zone primed for sustainable development. "
                f"Foreign buyers should note the 40% condo ownership cap under RA 7042." + ctx
            )

        if any(k in msg for k in ['invest', 'yield', 'roi', 'return']):
            return (
                "ByteMe's Investment Opportunity Scanner uses **Proxy Yield Modeling** (LightGBM trained on Vietnam data) "
                "to estimate yields even in data-sparse markets like the Philippines. "
                "Top opportunities are currently in secondary Philippine cities with high MEI scores. "
                "⚠️ Note: No API key is set. To get real-time Gemini-powered analysis, provide a `gemini_api_key` in your request." + ctx
            )

        if any(k in msg for k in ['hello', 'hi', 'sawasdee', 'xin chao']):
            return (
                "Sawasdee krub / Xin chao / Kumusta! 🌏 I am ByteMe's Cultural AI Assistant — "
                "your Pan-Asian real estate legal and investment guide for the Synergia 2026 Conference. "
                "I can help you with:\n"
                "• Property ownership laws (Philippines RA 7042, Thailand Land Code, Vietnam 2013 Land Law)\n"
                "• Cultural sensitivity in valuations (La Union surf culture, Iloilo heritage districts)\n"
                "• Live investment yields and MEI gap analysis\n\n"
                "Ask me anything about investing in Southeast Asia!"
            )

        return (
            "I'm your ByteMe Cultural AI Assistant for Pan-Asian real estate intelligence. "
            "I can help with:\n"
            "• **Legal questions**: Foreign ownership laws in Philippines, Thailand, Vietnam, Malaysia\n"
            "• **Cultural insights**: Heritage-sensitive valuation, local customs affecting property\n"
            "• **Investment analysis**: MEI scores, yield estimates, La Union / Iloilo divergence zones\n\n"
            "For full Gemini 1.5-powered responses, include your `gemini_api_key` in the request body."
        )


# Initialize the assistant
assistant = GeminiCulturalAssistant()


@app.route('/health', methods=['GET'])
def health():
    gemini_key_status = "configured" if os.environ.get('GEMINI_API_KEY') else "not set (pass in request)"
    ollama_ok, ollama_models = _check_ollama_available()
    return jsonify({
        'status': 'healthy',
        'product': 'Cultural AI Assistant',
        'llm_backends': {
            'tier_1_gemini': {'status': gemini_key_status, 'model': 'gemini-2.0-flash'},
            'tier_2_ollama': {'status': 'online' if ollama_ok else 'offline', 'models': ollama_models},
            'tier_3_fallback': {'status': 'always available', 'type': 'law-grounded keyword responses'}
        }
    })


@app.route('/chat', methods=['POST'])
def chat():
    """
    Gemini 1.5-powered Cultural AI Chat Endpoint.

    Input:
    {
        "message": "Can a foreigner buy land in Philippines?",
        "session_id": "optional-uuid-for-multi-turn",
        "gemini_api_key": "optional-override-key"
    }

    Output:
    {
        "response": "...",
        "engine": "gemini-1.5-flash" | "enhanced-fallback",
        "market_context_injected": true | false
    }
    """
    data = request.json
    message = data.get('message', '').strip()
    session_id = data.get('session_id', 'default')
    api_key = data.get('gemini_api_key')  # Per-request key override

    if not message:
        return jsonify({'error': 'Message cannot be empty'}), 400

    response_text, engine = assistant.chat(message, session_id=session_id, api_key=api_key)

    return jsonify({
        'response': response_text,
        'engine': engine,
        'session_id': session_id
    })


@app.route('/clear_session', methods=['POST'])
def clear_session():
    """Clear conversation history for a session (start fresh)."""
    data = request.json
    session_id = data.get('session_id', 'default')
    if session_id in assistant.conversation_sessions:
        del assistant.conversation_sessions[session_id]
    return jsonify({'message': f'Session {session_id} cleared.'})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5003))
    print(f"🤖 Cultural AI Assistant starting on port {port}")
    print(f"   Engine: Gemini 1.5 Flash")
    print(f"   API Key: {'✅ Set via env' if os.environ.get('GEMINI_API_KEY') else '⚠️  Not set (pass per-request)'}")
    app.run(host='0.0.0.0', port=port)
