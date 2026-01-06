from pymongo import MongoClient
import pandas as pd
from datetime import datetime

print("=" * 70)
print("📊 SCHOLARBRIDGE DATABASE VIEWER")
print("=" * 70)

# Connect to MongoDB
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['scholarbridge']
    print("✅ Connected to MongoDB")
    print(f"📁 Database: {db.name}")
    print(f"📂 Collections: {db.list_collection_names()}\n")
except Exception as e:
    print(f"❌ Connection Error: {e}")
    exit(1)

# View all users
print("\n" + "=" * 70)
print("👥 USERS")
print("=" * 70)
users = list(db.users.find())
if users:
    df_users = pd.DataFrame(users)
    print(f"Total Users: {len(users)}\n")
    for user in users:
        print(f"Name: {user['name']}")
        print(f"Email: {user['email']}")
        print(f"Role: {user['role']}")
        if 'course' in user:
            print(f"Course: {user.get('course', 'N/A')}")
        print("-" * 70)
else:
    print("No users found")

# View all scholarships
print("\n" + "=" * 70)
print("🎓 SCHOLARSHIPS")
print("=" * 70)
scholarships = list(db.scholarships.find())
if scholarships:
    print(f"Total Scholarships: {len(scholarships)}\n")
    for i, sch in enumerate(scholarships, 1):
        print(f"{i}. {sch['name']}")
        print(f"   Amount: ₹{sch['amount']:,}")
        print(f"   Category: {sch['category']}")
        print(f"   Status: {sch['status']}")
        print(f"   Available Slots: {sch['slotsAvailable']}/{sch['totalSlots']}")
        print(f"   Deadline: {sch['endDate'].strftime('%Y-%m-%d')}")
        print("-" * 70)
else:
    print("No scholarships found")

# View all applications
print("\n" + "=" * 70)
print("📝 APPLICATIONS")
print("=" * 70)
applications = list(db.applications.find())
if applications:
    print(f"Total Applications: {len(applications)}\n")
    for i, app in enumerate(applications, 1):
        # Get student and scholarship details
        student = db.users.find_one({"_id": app['student']})
        scholarship = db.scholarships.find_one({"_id": app['scholarship']})
        
        print(f"{i}. Application ID: {app['applicationId']}")
        print(f"   Student: {student['name'] if student else 'Unknown'}")
        print(f"   Scholarship: {scholarship['name'] if scholarship else 'Unknown'}")
        print(f"   Status: {app['status']}")
        print(f"   Documents: {len(app.get('submittedDocuments', []))} uploaded")
        print(f"   Applied On: {app['createdAt'].strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 70)
else:
    print("No applications found")

# Statistics
print("\n" + "=" * 70)
print("📈 STATISTICS")
print("=" * 70)
print(f"Total Users: {len(users)}")
print(f"  - Students: {len([u for u in users if u['role'] == 'student'])}")
print(f"  - Providers: {len([u for u in users if u['role'] == 'provider'])}")
print(f"  - Admins: {len([u for u in users if u['role'] == 'admin'])}")
print(f"\nTotal Scholarships: {len(scholarships)}")
print(f"  - Open: {len([s for s in scholarships if s['status'] == 'Open'])}")
print(f"  - Total Amount: ₹{sum([s['amount'] for s in scholarships]):,}")
print(f"\nTotal Applications: {len(applications)}")
if applications:
    status_counts = {}
    for app in applications:
        status = app['status']
        status_counts[status] = status_counts.get(status, 0) + 1
    for status, count in status_counts.items():
        print(f"  - {status}: {count}")

# Close connection
client.close()
print("\n" + "=" * 70)
print("✅ Database connection closed")
print("=" * 70)