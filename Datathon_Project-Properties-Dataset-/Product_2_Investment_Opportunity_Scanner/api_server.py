from flask import Flask, request, jsonify
import sys
import os
import pandas as pd
import numpy as np

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from models import YieldAnalyzer, GapScorer
from data_loader import UnifiedDataLoader

app = Flask(__name__)

# Enable CORS manually
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Initialize Analyzers
print("Initializing Analyzers...")
yield_analyzer = YieldAnalyzer()
gap_scorer = GapScorer()
data_loader = UnifiedDataLoader()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'product': 'Investment Opportunity Scanner'})

@app.route('/get_yields', methods=['GET'])
def get_yields():
    """
    Returns high-yield locations. Optional ?country filter.
    Returns ALL valid results so frontend can paginate.
    """
    try:
        country_filter = request.args.get('country')
        yields = yield_analyzer.analyze_market(country_filter)
        
        if yields is None or yields.empty:
            return jsonify({'insight': 'Scanning complete', 'data': []})
            
        results = []
        for _, row in yields.iterrows():
            results.append({
                'location': row['location'],
                'country': row['country'],
                'median_sale_price_usd': float(row['sale']) if pd.notna(row['sale']) else 0,
                'median_rental_price_usd': float(row['rent']) if pd.notna(row['rent']) else 0,
                'annual_yield_pct': float(row['annual_yield_pct'])
            })
            
        return jsonify({
            'insight': f'Investment Locations ({country_filter or "Global"})',
            'data': results
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/hotspots', methods=['GET'])
def hotspots():
    """
    Identifies emerging hotspots based on price-per-sqm analysis (undervalued areas).
    """
    try:
        df = data_loader.load_unified_data()
        sales = df[(df['transaction_type'] == 'sale') & (df['area_sqm'] > 0) & (df['price_usd'] > 0)].copy()
        sales['price_per_sqm'] = sales['price_usd'] / sales['area_sqm']
        
        # Filter outliers
        sales = sales[sales['price_per_sqm'].between(sales['price_per_sqm'].quantile(0.05), sales['price_per_sqm'].quantile(0.95))]
        
        # Group by location
        location_stats = sales.groupby(['country', 'location'])['price_per_sqm'].agg(['count', 'median']).reset_index()
        location_stats = location_stats[location_stats['count'] > 5] # Min 5 listings
        
        # Return all hotspots
        hotspots = []
        for _, row in location_stats.sort_values('median').iterrows():
            hotspots.append({
                'country': row['country'],
                'location': row['location'],
                'avg_price_per_sqm_usd': float(row['median']),
                'listings_count': int(row['count']),
                'tag': 'Value Investment'
            })
                
        return jsonify({
            'insight': 'Emerging Hotspots (Value Entry)',
            'data': hotspots
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/gap_analysis', methods=['GET'])
def gap_analysis():
    """
    Identifies zones with High Gap Score. Optional ?country filter.
    Returns ALL results so frontend can paginate.
    """
    try:
        country_filter = request.args.get('country')
        gaps = gap_scorer.analyze_gap() # Returns DataFrame sorted by gap_score
        
        if country_filter:
            gaps = gaps[gaps['country'].str.lower() == country_filter.lower()]

        top_gaps = []
        for i in range(len(gaps)):
            row = gaps.iloc[i]
            top_gaps.append({
                'country': row['country'],
                'location': row['location'],
                'gap_score': float(row['gap_score']) if pd.notna(row['gap_score']) else 0,
                'supply_count': int(row['supply']),
                'avg_price_usd': float(row['avg_price']) if pd.notna(row['avg_price']) else 0
            })
            
        return jsonify({
            'insight': f'Market Gaps ({country_filter or "Global"})',
            'data': top_gaps
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))
    app.run(host='0.0.0.0', port=port)
