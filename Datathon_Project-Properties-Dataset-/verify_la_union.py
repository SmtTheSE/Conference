import sys
import os

# Add src to path
sys.path.append(os.path.abspath('src'))

from data_loader import UnifiedDataLoader

def verify_la_union():
    print("Initializing Data Loader...")
    loader = UnifiedDataLoader()
    df = loader.load_philippines()
    
    print(f"Total Philippines Rows: {len(df)}")
    
    # Check for La Union
    la_union_df = df[df['location'].str.contains('La Union', case=False, na=False)]
    
    if not la_union_df.empty:
        print("\n✅ SUCCESS: La Union data found!")
        print(la_union_df[['location', 'price_local', 'bedrooms', 'area_sqm']])
    else:
        print("\n❌ FAILURE: La Union data not found in processed dataframe.")
        # Debug: list some locations
        print("\nSample locations found:")
        print(df['location'].unique()[:20])

if __name__ == "__main__":
    verify_la_union()
