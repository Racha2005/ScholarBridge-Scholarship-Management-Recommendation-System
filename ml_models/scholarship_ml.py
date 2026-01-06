from pymongo import MongoClient
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

print("=" * 70)
print("🤖 SCHOLARBRIDGE ML MODEL - SCHOLARSHIP RECOMMENDATION")
print("=" * 70)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['scholarbridge']

print("✅ Connected to MongoDB\n")

# Fetch data
users_data = list(db.users.find({"role": "student"}))
scholarships_data = list(db.scholarships.find({"isActive": True}))

print(f"📊 Loaded {len(users_data)} students")
print(f"📊 Loaded {len(scholarships_data)} scholarships\n")

# Calculate match score
def calculate_match_score(student, scholarship):
    score = 0
    
    # Category match (30 points)
    if student.get('category') in scholarship.get('eligibility', {}).get('category', []):
        score += 30
    
    # Income criteria (25 points)
    max_income = scholarship.get('eligibility', {}).get('maxFamilyIncome')
    if max_income and student.get('familyIncome', 0) <= max_income:
        score += 25
    
    # Gender match (15 points)
    eligible_gender = scholarship.get('eligibility', {}).get('gender', 'All')
    if eligible_gender == 'All' or eligible_gender == student.get('gender'):
        score += 15
    
    # Course relevance (20 points)
    if 'STEM' in scholarship.get('eligibility', {}).get('course', ''):
        if 'Tech' in student.get('course', '') or 'Science' in student.get('course', ''):
            score += 20
    elif 'All' in scholarship.get('eligibility', {}).get('course', ''):
        score += 15
    
    # Random factor (10 points)
    score += np.random.randint(0, 11)
    
    return min(score, 100)

# Generate training dataset
print("🔄 Generating training dataset...")
training_data = []

for student in users_data:
    for scholarship in scholarships_data:
        match_score = calculate_match_score(student, scholarship)
        
        training_data.append({
            'student_name': student.get('name'),
            'student_category': student.get('category', 'General'),
            'student_gender': student.get('gender', 'Male'),
            'family_income': student.get('familyIncome', 500000),
            'scholarship_name': scholarship.get('name'),
            'scholarship_category': scholarship.get('category'),
            'scholarship_amount': scholarship.get('amount'),
            'max_income_limit': scholarship.get('eligibility', {}).get('maxFamilyIncome', 1000000),
            'match_score': match_score,
            'is_good_match': 1 if match_score >= 70 else 0
        })

# Create DataFrame
df = pd.DataFrame(training_data)
print(f"✅ Training Dataset Shape: {df.shape}")
print(f"\nDataset Preview:")
print(df[['student_name', 'scholarship_name', 'match_score', 'is_good_match']].head(10))

# Encode categorical variables
le_student_cat = LabelEncoder()
le_student_gender = LabelEncoder()
le_scholarship_cat = LabelEncoder()

df['student_category_encoded'] = le_student_cat.fit_transform(df['student_category'])
df['student_gender_encoded'] = le_student_gender.fit_transform(df['student_gender'])
df['scholarship_category_encoded'] = le_scholarship_cat.fit_transform(df['scholarship_category'])

# Prepare features and target
X = df[['student_category_encoded', 'student_gender_encoded', 'family_income', 
        'scholarship_category_encoded', 'scholarship_amount', 'max_income_limit']]
y = df['is_good_match']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
print("\n🎯 Training Random Forest Model...")
rf_model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
rf_model.fit(X_train, y_train)

# Evaluate model
train_accuracy = rf_model.score(X_train, y_train)
test_accuracy = rf_model.score(X_test, y_test)

print(f"\n✅ Training Accuracy: {train_accuracy*100:.2f}%")
print(f"✅ Testing Accuracy: {test_accuracy*100:.2f}%")

# Show recommendations for each student
print("\n" + "=" * 70)
print("🎓 SCHOLARSHIP RECOMMENDATIONS")
print("=" * 70)

for student in users_data:
    print(f"\n👤 {student['name']} ({student['email']})")
    print("-" * 70)
    
    student_recommendations = []
    for scholarship in scholarships_data:
        score = calculate_match_score(student, scholarship)
        student_recommendations.append({
            'scholarship': scholarship['name'],
            'amount': scholarship['amount'],
            'score': score
        })
    
    # Sort by score
    student_recommendations.sort(key=lambda x: x['score'], reverse=True)
    
    # Show top 3
    print("Top 3 Recommended Scholarships:")
    for i, rec in enumerate(student_recommendations[:3], 1):
        print(f"{i}. {rec['scholarship']}")
        print(f"   Amount: ₹{rec['amount']:,}")
        print(f"   Match Score: {rec['score']}%")

# Feature importance
feature_names = ['Student Category', 'Student Gender', 'Family Income', 
                 'Scholarship Category', 'Scholarship Amount', 'Max Income Limit']
importances = rf_model.feature_importances_

print("\n" + "=" * 70)
print("📊 FEATURE IMPORTANCE")
print("=" * 70)
for name, importance in zip(feature_names, importances):
    print(f"{name:25s}: {importance:.4f} ({'█' * int(importance * 50)})")

# Close connection
client.close()
print("\n✅ ML Model training completed successfully!")
print("=" * 70)