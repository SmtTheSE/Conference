import pandas as pd
import numpy as np
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from data_loader import UnifiedDataLoader

class PricingModel:
    def __init__(self):
        self.loader = UnifiedDataLoader()
        self.model = None
        self.features = ['country', 'location', 'bedrooms', 'bathrooms', 'area_sqm', 'property_type']
        
    def prepare_data(self):
        print("Loading data...")
        df = self.loader.load_unified_data()
        
        # Filter for sales only for price prediction
        sales_data = df[df['transaction_type'] == 'sale'].copy()
        
        # Encoding Categorical Features
        # For 'location', we use target encoding or frequency encoding since high cardinality
        # For simplicity in this demo, we'll use Label Encoding for country/property_type and frequency for location
        
        for col in ['country', 'property_type']:
            sales_data[col] = sales_data[col].astype('category')
            
        # Frequency encoding for location (basic way to handle high cardinality)
        location_freq = sales_data['location'].value_counts(normalize=True)
        sales_data['location_freq'] = sales_data['location'].map(location_freq)
        
        # Fill NaNs
        sales_data['bedrooms'] = sales_data['bedrooms'].fillna(sales_data['bedrooms'].median())
        sales_data['bathrooms'] = sales_data['bathrooms'].fillna(sales_data['bathrooms'].median())
        
        # Features for model
        X = sales_data[['country', 'location_freq', 'bedrooms', 'bathrooms', 'area_sqm', 'property_type']]
        y = sales_data['price_usd']
        
        return X, y, sales_data

    def train(self):
        X, y, df = self.prepare_data()
        
        # Split Data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        print(f"Training on {len(X_train)} samples...")
        
        # Create dataset for LightGBM
        train_data = lgb.Dataset(X_train, label=y_train, categorical_feature=['country', 'property_type'])
        test_data = lgb.Dataset(X_test, label=y_test, reference=train_data)
        
        params = {
            'objective': 'regression',
            'metric': 'rmse',
            'boosting_type': 'gbdt',
            'learning_rate': 0.05,
            'num_leaves': 31,
            'verbose': -1
        }
        
        self.model = lgb.train(params, train_data, num_boost_round=1000, valid_sets=[test_data], 
                               callbacks=[lgb.early_stopping(stopping_rounds=50), lgb.log_evaluation(100)])
        
        # Evaluation
        y_pred = self.model.predict(X_test)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        
        print(f"\nModel Performance:")
        print(f"RMSE: ${rmse:.2f}")
        print(f"R2 Score: {r2:.4f}")
        
        # Save model
        self.model.save_model('dataset_price_model.txt')
        print("Model saved to dataset_price_model.txt")
        
        return self.model, df

    def predict(self, features):
        """
        features: dict containing 'country', 'location', 'bedrooms', 'bathrooms', 'area_sqm', 'property_type'
        """
        if self.model is None:
            try:
                self.model = lgb.Booster(model_file='dataset_price_model.txt')
            except Exception:
                print("Model not found. Please train first.")
                return None

        # Create DataFrame from input features
        input_df = pd.DataFrame([features])
        
        # Simple preprocessing matching training (in real prod, use a saved pipeline)
        if not hasattr(self, 'location_freq'):
            df = self.loader.load_unified_data()
            sales_data = df[df['transaction_type'] == 'sale']
            self.location_freq = sales_data['location'].value_counts(normalize=True)
            
        input_df['location_freq'] = input_df['location'].map(self.location_freq).fillna(0)
        
        for col in ['country', 'property_type']:
            input_df[col] = input_df[col].astype('category')
            
        X = input_df[['country', 'location_freq', 'bedrooms', 'bathrooms', 'area_sqm', 'property_type']]
        return self.model.predict(X)[0]

class RentalModel:
    def __init__(self):
        self.loader = UnifiedDataLoader()
        self.model = None
        # Approximate Rent Multipliers relative to Vietnam (Base)
        # Based on GDP/Capita and Market Maturity
        # Dynamic Yield Calculation (Data-Driven Base)
        self.median_yield = self.calculate_baseline_yield()
        
    def calculate_baseline_yield(self):
        """
        Calculates the median rental yield from the Vietnam dataset (Training Data).
        Yield = (Annual Rent / Sale Price)
        This serves as the data-driven anchor for missing markets.
        """
        try:
            df = self.loader.load_unified_data()
            vn_data = df[df['country'] == 'Vietnam']
            
            # Group by location to get median Price and Rent
            loc_stats = vn_data.groupby(['location', 'transaction_type'])['price_usd'].median().unstack()
            
            if 'rent' in loc_stats.columns and 'sale' in loc_stats.columns:
                loc_stats['yield'] = loc_stats['rent'] * 12 / loc_stats['sale']
                # Filter outliers (valid yield between 1% and 15%)
                valid_yields = loc_stats[(loc_stats['yield'] > 0.01) & (loc_stats['yield'] < 0.15)]
                median_yield = valid_yields['yield'].median()
                print(f"Calculated Data-Driven Baseline Yield (Vietnam): {median_yield:.4f}")
                return median_yield
            return 0.05 # Fallback only if data missing
        except Exception as e:
            print(f"Error calculating yield: {e}")
            return 0.05

    def train(self):
        print("Training Rental Model (Transfer Learning Base: Vietnam)...")
        df = self.loader.load_unified_data()
        
        # Filter for RENTAL data (Vietnam only currently)
        rent_data = df[df['transaction_type'] == 'rent'].copy()
        
        if rent_data.empty:
            print("No rental data found to train.")
            return

        for col in ['country', 'property_type']:
            rent_data[col] = rent_data[col].astype('category')
            
        # Frequency encoding
        location_freq = rent_data['location'].value_counts(normalize=True)
        rent_data['location_freq'] = rent_data['location'].map(location_freq)
        
        # Fill NaNs
        rent_data['bedrooms'] = rent_data['bedrooms'].fillna(rent_data['bedrooms'].median())
        rent_data['bathrooms'] = rent_data['bathrooms'].fillna(rent_data['bathrooms'].median())
        
        # Features
        X = rent_data[['country', 'location_freq', 'bedrooms', 'bathrooms', 'area_sqm', 'property_type']]
        y = rent_data['price_usd']
        
        # Train simple LGBM
        train_data = lgb.Dataset(X, label=y, categorical_feature=['country', 'property_type'])
        
        params = {
            'objective': 'regression',
            'metric': 'rmse',
            'learning_rate': 0.05,
            'verbose': -1
        }
        
        self.model = lgb.train(params, train_data, num_boost_round=500)
        self.model.save_model('dataset_rent_model.txt')
        print("Rental Model Trained & Saved.")

    def predict(self, features):
        if self.model is None:
            try:
                self.model = lgb.Booster(model_file='dataset_rent_model.txt')
            except:
                return None

        # --- STRICT REAL-WORLD LOGIC ---
        # If we don't have rental data for this country, we DO NOT predict.
        # Transfer learning from Vietnam to Thailand is theoretically interesting but 
        # heavily relies on assumptions. For a "Real Data" product, we return None.
        
        # Currently we only have rental data for Vietnam.
        if features['country'] != 'Vietnam':
            return None

        # Prepare Input
        input_df = pd.DataFrame([features])
        
        # Mock freq for now (should load from file)
        input_df['location_freq'] = 0.01 
        
        for col in ['country', 'property_type']:
            input_df[col] = input_df[col].astype('category')
            
        X = input_df[['country', 'location_freq', 'bedrooms', 'bathrooms', 'area_sqm', 'property_type']]
        
        return self.model.predict(X)[0]

class YieldCurveModel:
    """
    Winning Logic: Market Proxy Modeling.
    Instead of predicting Rent directly (which varies wildly by currency/economy),
    we predict *Yield* (Cap Rate), which is a more universal financial metric.
    
    Hypothesis: Yield is a function of (Price/Sqm, Size, Room Count).
    - Smaller units -> Higher Yield
    - Lower Price/Sqm -> Higher Yield
    """
    def __init__(self):
        self.loader = UnifiedDataLoader()
        self.model = None
        
    def train(self):
        print("Training Yield Curve Model...")
        df = self.loader.load_unified_data()
        
        # 1. Prepare Training Data (Vietnam)
        # We need pairs of Rent + Sales for the same location/type to infer yield
        # Since we don't have matched pairs, we synthesize from regional medians
        
        vn_data = df[df['country'] == 'Vietnam']
        if vn_data.empty: return

        # Group by Micro-Market (Location + Rooms)
        grouped = vn_data.groupby(['location', 'bedrooms', 'transaction_type'])['price_usd'].median().unstack()
        
        # Calculate Observed Yield
        if 'rent' in grouped.columns and 'sale' in grouped.columns:
            grouped['yield'] = (grouped['rent'] * 12) / grouped['sale']
            grouped = grouped.dropna()
            
            # Remove outliers (Yields outside 2% - 12% range)
            valid = grouped[(grouped['yield'] >= 0.02) & (grouped['yield'] <= 0.12)].reset_index()
            
            # Merge back features for training
            # We need area/bathrooms averages for these groups
            feature_ref = vn_data.groupby(['location', 'bedrooms']).agg({
                'area_sqm': 'median',
                'bathrooms': 'median',
                'price_usd': 'median' # Sale price
            }).reset_index()
            
            training_set = pd.merge(valid, feature_ref, on=['location', 'bedrooms'])
            training_set['price_per_sqm'] = training_set['price_usd'] / training_set['area_sqm']
            
            X = training_set[['price_per_sqm', 'area_sqm', 'bedrooms', 'bathrooms']]
            y = training_set['yield']
            
            # Simple Regressor
            train_set = lgb.Dataset(X, label=y)
            params = {'objective': 'regression', 'metric': 'rmse', 'verbose': -1}
            self.model = lgb.train(params, train_set, num_boost_round=300)
            self.model.save_model('dataset_yield_model.txt')
            print("Yield Curve Model Trained.")
            
    def predict_yield(self, features, predicted_price):
        if self.model is None:
            try:
                self.model = lgb.Booster(model_file='dataset_yield_model.txt')
            except:
                return 0.05 # Conservative fallback
        
        # Prepare Features
        # Price Per Sqm is the dominant factor
        if features['area_sqm'] > 0:
            pp_sqm = predicted_price / features['area_sqm']
        else:
            pp_sqm = 0
            
        input_data = pd.DataFrame([{
            'price_per_sqm': pp_sqm,
            'area_sqm': features['area_sqm'],
            'bedrooms': features['bedrooms'],
            'bathrooms': features['bathrooms']
        }])
        
        pred_yield = self.model.predict(input_data)[0]
        print(f"DEBUG: Yield Prediction - Input PP_SQM: {pp_sqm}, Pred Yield: {pred_yield}")
        
        # Safety clamp (2% to 10%)
        # If model outputs <= 0 (it happens with sparse data), force a minimum
        if pred_yield <= 0.01: 
             return 0.035 # Minimal viable yield (3.5%)
             
        return max(0.02, min(0.12, pred_yield))

class GapScorer:
    def __init__(self):
        self.loader = UnifiedDataLoader()
        
    def analyze_gap(self):
        """
        Identifies Supply/Demand Gaps.
        Gap Score = (Price_Growth_Potential * Yield_Potential) / Supply_Density
        """
        df = self.loader.load_unified_data()
        # Ensure we have valid price and area data to avoid NaNs
        sales = df[(df['transaction_type'] == 'sale') & (df['price_usd'] > 0) & (df['area_sqm'] > 0)].copy()
        
        # 1. Supply Density (Listings count per location)
        supply = sales.groupby(['country', 'location']).size().reset_index(name='supply_count')
        
        # 2. Demand Proxy (Price per sqm path - lower is higher potential demand for entry)
        # Low Price/Sqm in good location = High Gap
        
        country_medians = sales.groupby('country')['price_usd'].median()
        
        results = []
        for (country, loc), group in sales.groupby(['country', 'location']):
            clean_loc = str(loc).strip().lower()
            if len(group) < 5 or clean_loc == 'unknown' or clean_loc == '': continue
            
            median_price = group['price_usd'].median()
            median_pps = (group['price_usd'] / group['area_sqm']).median()
            supply_cnt = len(group)
            
            # Simplified Gap Logic:
            # High Gap ~ (Low PPS) and (Healthy Supply)
            
            # Normalize PPS: Higher score for lower price per sqm
            # We use log scaling or a capped factor to prevent division by zero or extreme outliers
            value_potential = 10000 / (median_pps + 1)
            
            # Supply Multiplier: We WANT moderate to high supply for a "Market Gap" analysis
            # because very low supply (1-2 units) is often just bad data.
            # We use a Sigmoid-like scaling for supply
            supply_factor = np.tanh(supply_cnt / 50) + 0.5 # 0.5 to 1.5 range
            
            gap_score = value_potential * supply_factor
            
            results.append({
                'country': country,
                'location': loc,
                'gap_score': gap_score,
                'supply': supply_cnt,
                'avg_price': median_price
            })
            
        return pd.DataFrame(results).sort_values('gap_score', ascending=False)


class YieldAnalyzer:
    def __init__(self):
        self.loader = UnifiedDataLoader()
        self.proxy_model = YieldCurveModel()
        self.proxy_model.train() # Ensure we have a baseline
        
    def analyze_market(self, country_filter=None):
        """
        Calculates Yield for all locations.
        Uses REAL yield if data exists, PROXY yield if not.
        """
        print(f"\n=== Market Rental Yield Analysis ({country_filter or 'All'}) ===")
        df = self.loader.load_unified_data()
        
        if country_filter:
            df = df[df['country'].str.lower() == country_filter.lower()].copy()
            
        if df.empty:
            return pd.DataFrame()
            
        # Group by location, country, and transaction_type
        summary = df.groupby(['country', 'location', 'transaction_type'])['price_usd'].median().unstack()
        
        # Fill missing columns if they don't exist in the slice
        if 'rent' not in summary.columns: summary['rent'] = np.nan
        if 'sale' not in summary.columns: summary['sale'] = np.nan
        
        # 1. Identify locations with REAL matched data
        real_idx = summary.dropna(subset=['rent', 'sale']).index
        summary.loc[real_idx, 'annual_yield_pct'] = (summary.loc[real_idx, 'rent'] * 12 / summary.loc[real_idx, 'sale']) * 100
        
        # 2. Use PROXY logic for locations with ONLY sales data
        proxy_idx = summary[summary['annual_yield_pct'].isna() & summary['sale'].notna()].index
        
        # We need median area for proxy model
        stats = df.groupby(['country', 'location']).agg({
            'area_sqm': 'median',
            'bedrooms': 'median',
            'bathrooms': 'median'
        })
        
        for idx in proxy_idx:
            try:
                # country, location
                feat = stats.loc[idx]
                price = summary.loc[idx, 'sale']
                
                # Estimate yield using proxy model
                features = {
                    'area_sqm': feat['area_sqm'],
                    'bedrooms': feat['bedrooms'],
                    'bathrooms': feat['bathrooms']
                }
                
                p_yield = self.proxy_model.predict_yield(features, price)
                summary.loc[idx, 'annual_yield_pct'] = p_yield * 100
            except:
                summary.loc[idx, 'annual_yield_pct'] = 5.0 # Fallback 5%
        
        # Final NaN Cleanup
        summary['annual_yield_pct'] = summary['annual_yield_pct'].fillna(5.0)
        
        # Clean and Sort
        valid_yields = summary.dropna(subset=['annual_yield_pct']).copy()
        valid_yields = valid_yields.reset_index()
        valid_yields = valid_yields[(valid_yields['annual_yield_pct'] > 1) & (valid_yields['annual_yield_pct'] < 25)]
        valid_yields = valid_yields[valid_yields['location'].astype(str).str.lower().str.strip() != 'unknown']
        valid_yields = valid_yields.sort_values('annual_yield_pct', ascending=False)
        
        return valid_yields

if __name__ == "__main__":
    # 1. Train Global Model
    print("--- Training Global Price Predictor ---")
    pm = PricingModel()
    model, data = pm.train()
    
    # 2. Analyze Yield
    print("\n--- Analyzing Investment Yields ---")
    ya = YieldAnalyzer()
    ya.analyze_vietnam()
