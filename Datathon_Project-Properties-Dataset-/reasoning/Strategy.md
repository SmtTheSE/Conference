Final Round Strategy: "Customer Behavior" Data Integration
1. Situation Analysis
Current State:
Models (Forecasting & Gap Analysis) are trained on a fixed 10M Data schema (City, Locality, 
Rent
, BHK).
Training scripts (
train_demand_model.py
) are rigid and expect specific column names.
Challenge:
Final Round will introduce a new "Customer Behavior" dataset.
Risk: If the new dataset has a different schema, current models inevitably fail.
Good News:
We already have a Data Integration Layer in 
scripts/integrate_external_data.py
.
This script successfully merges "Economic Data" (inflation, interest rates) into the property data.
We can reuse this exact pattern.
2. Adaptation Strategy: The "Bridge" Pattern
Do not try to rewrite the core models immediately. Instead, build a Data Bridge.

Phase 1: Ingestion (The "Collector")
Create a new module CustomerBehaviorCollector in a new script (or extending 
integrate_external_data.py
) to handle the new dataset.

Goals:

Read: Load the new dataset (CSV/JSON/SQL).
Normalize: Rename columns to match our standard schema:
city_name -> City
user_location -> Area Locality
timestamp -> Posted On (or Interaction Date)
Phase 2: Integration (The "join")
The critical step is Joining the new user data with our existing property data.

Join Keys:

Best Case: Join on Property_ID (if users generate clicks/leads on specific properties).
Likely Case: Join on City + Locality.
Fallback: Join on City only.
New Features to Engineer:

Locality_Search_Volume: Count of distinct user searches for a locality.
User_Interest_Score: Ratio of views to contacts.
High_intent_Users: Count of users filtering by "Ready to Move".
Phase 3: Model Adjustment (The "Retrain")
Once the data is merged into enhanced_rental_data.csv, we only need minor updates to 
train_demand_model.py
:

Add new column names to feature_cols list.
Run 
train_demand_model.py
.
The model automatically learns the importance of "Customer Behavior" (e.g., it might learn that high search volume predicts higher demand better than inflation rate).
3. "Break Glass" Emergency Plan
If the new dataset is completely unrelated (e.g., "User Sentiment on Twitter"):

Sentiment Proxy: Convert text to a "Sentiment Score" (0-1).
Feature Injection: Inject this score as a global external factor (like we do with 
interest_rate
).
4. Actionable Next Steps
Prepare the "Shell" Script: Create scripts/integrate_customer_behavior.py (Draft) now.
Why? To have the plumbing ready. We just plug in the CSV path when we get it.
Mock Data Simulation: Generate a fake "Customer Behavior" CSV now to test the pipeline.
Columns: User_ID, City, Locality, Action_Type (View, Contact, Search).
Run: Try merging this mock data using our strategy.
Verify Retraining: Ensure 
train_demand_model.py
 accepts the new mock features without crashing.
5. Answer to "Can we easily adapt?"
Yes, but only if we use this Integration Layer.

If we try to feed the new raw data directly to the model -> Failure.
If we channel it through 
integrate_external_data.py
 patterns -> Success.s