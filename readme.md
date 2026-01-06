# 🎓 ScholarBridge – Scholarship Management & Recommendation System 🎓

ScholarBridge is a full-stack web application designed to simplify and digitalize the scholarship process. Instead of students visiting multiple portals, filling repeated forms, and waiting without updates, ScholarBridge provides one centralized platform where students can search, apply, and track scholarships while providers and administrators manage everything through dedicated dashboards.

This project focuses on solving real-world problems such as lack of transparency, manual paperwork, and scattered information by using modern web technologies and secure data handling methods.

-------------------------------------------------------------

## 🌟 Project Overview

Many students miss scholarships simply because:
- Information is spread across multiple websites
- Application process is slow and manual
- There is no status tracking
- Providers struggle to review thousands of applications
- No intelligent recommendation system exists

ScholarBridge brings everything into one integrated platform with automation, notifications, and role-based access.

<p align="center"><img src="images/Screenshot 2025-11-19 123544.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-19 123623.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-19 123644.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-19 123525.png" width="800"></p>

-------------------------------------------------------------

## 🎯 Objectives

- Create a centralized scholarship portal
- Allow students to apply digitally
- Provide personalized scholarship recommendations
- Offer dashboards for students, providers, and admins
- Ensure data privacy and system scalability
- Support future upgrades like mobile app and AI verification

-------------------------------------------------------------

## 🚀 Key Features

STUDENTS
- Register and log in securely
- Create academic and personal profiles
- Browse and search scholarships
- Filter based on eligibility
- Apply online and upload documents
- Track application status
- Receive email or in-app notifications

SCHOLARSHIP PROVIDERS
- Post new scholarships with eligibility criteria
- View and manage applications
- Approve, reject, or request clarification
- Maintain records of past applications

ADMINISTRATORS
- Verify student and provider accounts
- Monitor users and scholarships
- Handle reports and misuse
- Maintain system data integrity

-------------------------------------------------------------

## 🧠 Why ScholarBridge is Important

ScholarBridge improves fairness and accessibility by ensuring:
- Students get the right opportunities at the right time
- Providers reach genuine and eligible applicants
- Institutions save time compared to manual systems
- Future integration with AI tools becomes easier

This project can easily scale to university, state, or national level deployment.

-------------------------------------------------------------

## 🏗️ Tech Stack (Full-Stack)

Frontend: HTML, CSS, JavaScript  
Backend: Node.js with Express  
Database: MongoDB (NoSQL)  
Authentication: JWT + bcrypt  
Notifications: Email / SMS  
Architecture: REST API based layered design  

This ensures flexibility, performance, security, and easy maintenance.

<p align="center"><img src="images/Screenshot 2025-11-17 145603.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-17 145554.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-17 145006.png" width="800"></p>

-------------------------------------------------------------

## 📐 System Architecture 

1. Presentation Layer (User Interface)
   Handles all screens and forms users interact with.

2. Application Layer (Backend)
   Processes requests, validates data, applies business rules, and handles authentication.

3. Data Layer (Database)
   Stores users, scholarships, applications, and notifications securely.

This modular architecture makes the system scalable, secure, and easier to maintain.

-------------------------------------------------------------

## 📊 Database Design

USERS
- Stores information about students, providers, and admins

SCHOLARSHIPS
- Stores scholarship details, eligibility criteria, and deadlines

APPLICATIONS
- Connects students with scholarships they apply for
- Maintains status such as pending, approved, rejected

NOTIFICATIONS
- Sends important alerts and updates to users

<p align="center"><img src="images/Screenshot 2025-11-17 145536.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-17 145514.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-17 145504.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-17 145129.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-17 145105.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-17 145030.png" width="800"></p>

-------------------------------------------------------------

## 📸 Screenshots

HOME PAGE
<p align="center"><img src="images/Screenshot 2025-11-19 123544.png" width="800"></p><br>

LOGIN / REGISTER  
<p align="center"><img src="images/Screenshot 2025-11-19 123332.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-18 222240.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-18 222230.png" width="800"></p>

DASHBOARD  
<p align="center"><img src="images/Screenshot 2025-11-19 141149.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-19 120410.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-19 121623.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-19 123131.png" width="800"></p>

SCHOLARSHIP LIST  
<p align="center"><img src="images/Screenshot 2025-11-19 121651.png" width="800"></p><br>

APPLICATION FORM  
<p align="center"><img src="images/Screenshot 2025-11-18 222050.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-18 222056.png" width="800"></p>

PROVIDER DASHBOARD  
<p align="center"><img src="images/Screenshot 2025-11-21 053259.png" width="800"></p><br>

PROVIDER LOGIN SCREEN
<p align="center"><img src="images/Screenshot 2025-11-21 052819.png" width="800"></p><br>

ADMIN PANEL  (PROVIDER)
<p align="center"><img src="images/Screenshot 2025-11-21 054052.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-21 054154.png" width="800"></p><br>

NOTIFICATIONS  
<p align="center"><img src="images/Screenshot 2025-11-19 121808.png" width="800"></p><br>
<p align="center"><img src="images/Screenshot 2025-11-21 050020.png" width="800"></p>

SETTINGS
<p align="center"><img src="images/Screenshot 2025-11-19 121752.png" width="800"></p><br>

LIST OF APPLICATIONS APPLIED BY A STUDENT
<p align="center"><img src="images/Screenshot 2025-11-21 064755.png" width="800"></p><br>

-------------------------------------------------------------

## ⚙️ Installation Steps (Simple Explanation)

1. Download or clone the project
2. Install dependencies using npm
3. Add configuration values in the environment file
4. Start the backend server
5. Open the browser and access the application

Deployment can later be done on Render, Railway, or any cloud service.

-------------------------------------------------------------

## 🧩 Modules Implemented

- Authentication and role-based access
- Student portal and profile management
- Scholarship browsing and filtering
- Online application module
- Provider management dashboard
- Admin control panel
- Notifications module
- Recommendation logic for suitable scholarships

-------------------------------------------------------------

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication tokens
- Role-based access control
- Validation of all user inputs
- Secure API routing
- Sensitive keys stored in environment variables

-------------------------------------------------------------

## 📜 License

This project is released under the MIT License and can be used, modified, or redistributed with proper credit.

-------------------------------------------------------------
