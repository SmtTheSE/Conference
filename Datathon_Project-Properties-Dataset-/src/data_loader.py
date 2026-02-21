import pandas as pd
import numpy as np
import os

class UnifiedDataLoader:
    def __init__(self, data_dir=None):
        if data_dir is None:
            # Make path absolute relative to this file
            base_dir = os.path.dirname(os.path.abspath(__file__))
            self.data_dir = os.path.join(base_dir, '..', 'datasets')
        else:
            self.data_dir = data_dir
        # Approximate Exchange Rates (Feb 2026)
        # THB: Thai Baht
        # PHP: Philippine Peso
        # MYR: Malaysian Ringgit
        # VND: Vietnamese Dong
        self.exchange_rates = {
            'THB': 0.029,
            'PHP': 0.018,
            'MYR': 0.23,
            'VND': 0.000039
        }

    def load_thailand(self):
        filepath = os.path.join(self.data_dir, "Bangkok Housing Condo Apartment Prices.csv")
        if not os.path.exists(filepath):
            return pd.DataFrame()
        
        try:
            df = pd.read_csv(filepath)
            df.columns = df.columns.str.strip()
            
            # Map columns based on actual file content
            # Property Type,Location,Area (sq. ft.),Bedrooms,Bathrooms,Price (THB)
            df = df.rename(columns={
                'Location': 'location',
                'Price (THB)': 'price_local',
                'Bedrooms': 'bedrooms',
                'Bathrooms': 'bathrooms',
                'Property Type': 'property_type'
            })
            
            # Convert Area sqft to sqm
            if 'Area (sq. ft.)' in df.columns:
                 df['area_sqm'] = pd.to_numeric(df['Area (sq. ft.)'], errors='coerce') / 10.764
            else:
                 df['area_sqm'] = np.nan

            # Clean price
            if 'price_local' in df.columns and df['price_local'].dtype == object:
                df['price_local'] = pd.to_numeric(df['price_local'].astype(str).str.replace(',', ''), errors='coerce')

            df['country'] = 'Thailand'
            df['currency'] = 'THB'
            df['price_usd'] = df['price_local'] * self.exchange_rates['THB']
            df['transaction_type'] = 'sale'
            
            cols = ['country', 'location', 'price_local', 'price_usd', 'area_sqm', 'bedrooms', 'bathrooms', 'property_type', 'transaction_type']
            for c in cols:
                if c not in df.columns:
                    df[c] = np.nan
                    
            return df[cols].dropna(subset=['price_usd', 'area_sqm'])
        except Exception as e:
            print(f"Error loading Thailand data: {e}")
            return pd.DataFrame()

    def load_philippines(self):
        filepath = os.path.join(self.data_dir, "Housing Prices Philippines Lamudi.csv")
        if not os.path.exists(filepath):
            return pd.DataFrame()

        try:
            df = pd.read_csv(filepath)
            df.columns = df.columns.str.strip()
            
            # Extract Location from Title if Location column missing
            if 'Location' not in df.columns and 'Title' in df.columns:
                def extract_loc(title):
                    title_str = str(title)
                    # Support multiple delimiters case-insensitively
                    for delimiter in [' in ', ' In ', ' at ', ' At ', ' near ', ' Near ', ' in: ']:
                        if delimiter in title_str:
                            return title_str.split(delimiter)[-1].split('|')[0].strip()
                    
                    # Fallback to Subdivision if available and title fails
                    return 'Unknown'
                
                df['location'] = df['Title'].apply(extract_loc)
                
                # If location is still Unknown, try Subdivision name
                if 'Subdivision name' in df.columns:
                    mask = (df['location'] == 'Unknown') & df['Subdivision name'].notna()
                    df.loc[mask, 'location'] = df.loc[mask, 'Subdivision name']
            elif 'Location' in df.columns:
                df['location'] = df['Location']

            # Robust column mapping for Philippines
            col_map = {
                'Price': 'price_local',
                'Bedrooms': 'bedrooms',
                'Bathrooms': 'bathrooms',
                'Bath': 'bathrooms',
                'Floor area (m²)': 'area_sqm',
                'Floor_area': 'area_sqm'
            }
            df = df.rename(columns=col_map)
            
            if 'price_local' in df.columns and df['price_local'].dtype == object:
                 df['price_local'] = pd.to_numeric(df['price_local'].astype(str).str.replace(',', ''), errors='coerce')

            df['country'] = 'Philippines'
            df['currency'] = 'PHP'
            df['price_usd'] = df['price_local'] * self.exchange_rates['PHP']
            df['property_type'] = 'House'
            df['transaction_type'] = 'sale'
            
            cols = ['country', 'location', 'price_local', 'price_usd', 'area_sqm', 'bedrooms', 'bathrooms', 'property_type', 'transaction_type']
            for c in cols:
                if c not in df.columns:
                    df[c] = np.nan
            return df[cols].dropna(subset=['price_usd'])
        except Exception as e:
            print(f"Error loading Philippines data: {e}")
            return pd.DataFrame()

    def load_malaysia(self):
        filepath = os.path.join(self.data_dir, "malaysia_house_price_data_2025.csv")
        if not os.path.exists(filepath):
            return pd.DataFrame()
            
        try:
            df = pd.read_csv(filepath)
            df.columns = df.columns.str.strip()
            df = df.rename(columns={'Area': 'location', 'Median_Price': 'price_local', 'Type': 'property_type'})
            
            df['country'] = 'Malaysia'
            df['currency'] = 'MYR'
            
            if 'Median_PSF' in df.columns:
                 df['area_sqm'] = (df['price_local'] / df['Median_PSF']) / 10.764
            else:
                df['area_sqm'] = np.nan

            df['bedrooms'] = np.nan
            df['bathrooms'] = np.nan
            df['price_usd'] = df['price_local'] * self.exchange_rates['MYR']
            df['transaction_type'] = 'sale'
            
            cols = ['country', 'location', 'price_local', 'price_usd', 'area_sqm', 'bedrooms', 'bathrooms', 'property_type', 'transaction_type']
            for c in cols:
                if c not in df.columns:
                    df[c] = np.nan
            return df[cols].dropna(subset=['price_usd'])
        except Exception as e:
            print(f"Error loading Malaysia data: {e}")
            return pd.DataFrame()

    def load_vietnam_buying(self):
        filepath = os.path.join(self.data_dir, "house_buying_dec29th_2025.csv")
        if not os.path.exists(filepath):
            return pd.DataFrame()
            
        try:
            df = pd.read_csv(filepath)
            df = df.rename(columns={
                'area_m2': 'area_sqm',
                'price_million_vnd': 'price_local_million',
                'location': 'location', # Ensure mapped
                'bedrooms': 'bedrooms',
                'bathrooms': 'bathrooms'
            })
            
            if 'price_local_million' in df.columns:
                df['price_local'] = pd.to_numeric(df['price_local_million'], errors='coerce') * 1_000_000
            
            df['country'] = 'Vietnam'
            df['currency'] = 'VND'
            df['price_usd'] = df['price_local'] * self.exchange_rates['VND']
            df['property_type'] = 'House/Apartment'
            df['transaction_type'] = 'sale'
            
            cols = ['country', 'location', 'price_local', 'price_usd', 'area_sqm', 'bedrooms', 'bathrooms', 'property_type', 'transaction_type']
            for c in cols:
                if c not in df.columns:
                    df[c] = np.nan
            return df[cols].dropna(subset=['price_usd', 'area_sqm'])
        except Exception as e:
            print(f"Error loading Vietnam Buying data: {e}")
            return pd.DataFrame()

    def load_vietnam_rental(self):
        filepath = os.path.join(self.data_dir, "house_rental_dec29th_2025.csv")
        if not os.path.exists(filepath):
            return pd.DataFrame()
        
        try:
            df = pd.read_csv(filepath)
            df = df.rename(columns={
                'area_m2': 'area_sqm',
                'price_million_vnd': 'price_local_million',
                'location': 'location',
                'bedrooms': 'bedrooms',
                'bathrooms': 'bathrooms'
            })
            
            # Rental price in million VND? Or assuming typical rental.
            # Usually rental is million VND per month.
            if 'price_local_million' in df.columns:
                 df['price_local'] = pd.to_numeric(df['price_local_million'], errors='coerce') * 1_000_000
            
            df['country'] = 'Vietnam'
            df['currency'] = 'VND'
            df['price_usd'] = df['price_local'] * self.exchange_rates['VND']
            df['property_type'] = 'House/Apartment'
            df['transaction_type'] = 'rent'
            
            cols = ['country', 'location', 'price_local', 'price_usd', 'area_sqm', 'bedrooms', 'bathrooms', 'property_type', 'transaction_type']
            for c in cols:
                if c not in df.columns:
                    df[c] = np.nan
            return df[cols].dropna(subset=['price_usd', 'area_sqm'])
        except Exception as e:
            print(f"Error loading Vietnam Rental data: {e}")
            return pd.DataFrame()

    def load_unified_data(self):
        dfs = []
        for loader in [self.load_thailand, self.load_philippines, self.load_malaysia, self.load_vietnam_buying, self.load_vietnam_rental]:
            d = loader()
            if not d.empty:
                dfs.append(d)
        
        if not dfs:
            return pd.DataFrame()
            
        unified = pd.concat(dfs, ignore_index=True)
        return unified

if __name__ == "__main__":
    loader = UnifiedDataLoader()
    df = loader.load_unified_data()
    print(f"Total Unified Rows: {len(df)}")
    print("\nSample Data:")
    print(df.head())
    print("\nCounts by Country & Transaction:")
    print(df.groupby(['country', 'transaction_type']).size())
