require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Scholarship = require('./models/Scholarship');
const Application = require('./models/Application');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Scholarship.deleteMany({});
    await Application.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@scholarbridge.com',
        password: 'Admin123',
        phone: '9876543210',
        role: 'admin'
      },
      {
        name: 'Rachana R Tunga',
        email: 'rachanathunga20@gmail.com',
        password: 'Rachana123',
        phone: '8310623216',
        role: 'student',
        dob: new Date('2002-05-15'),
        gender: 'Female',
        category: 'General',
        course: 'B.Tech - Computer Science',
        institution: 'NIT Karnataka',
        familyIncome: 650000
      },
      {
        name: 'Punyashree BS',
        email: 'punyashree32@gmail.com',
        password: 'Punyashree123',
        phone: '9876543212',
        role: 'student',
        dob: new Date('2003-08-20'),
        gender: 'Female',
        category: 'OBC',
        course: 'MCA - General',
        institution: 'IIT Delhi',
        familyIncome: 300000
      },
      {
        name: 'Lakshmi Rachana',
        email: 'lakshmi.rachana10@gmail.com',
        password: 'Lakshmi123',
        phone: '9412623116',
        role: 'student',
        dob: new Date('2004-03-12'),
        gender: 'Female',
        category: 'SC',
        course: 'MBA - Finance',
        institution: 'IIM Bangalore',
        familyIncome: 800000
      },
      {
        name: 'JSW Foundation',
        email: 'contact@jsw.com',
        password: 'Provider123',
        phone: '9876543213',
        role: 'provider'
      }
    ]);

    console.log('✅ Created users:', users.length);

    const provider = users.find(u => u.role === 'provider');
    const scholarships = await Scholarship.create([
      {
        name: 'National Merit Scholarship 2025',
        description: 'Merit-based scholarship for undergraduate students',
        amount: 50000,
        category: 'Merit-Based',
        eligibility: {
          minimumPercentage: 65,
          courseLevel: 'Undergraduate',
          course: 'All courses',
          maxFamilyIncome: 800000,
          gender: 'All',
          category: ['General', 'OBC', 'SC', 'ST', 'EWS']
        },
        provider: provider._id,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-15'),
        totalSlots: 100,
        slotsAvailable: 100,
        status: 'Open'
      },
      {
        name: 'Women in STEM Excellence Award',
        description: 'Scholarship for female students pursuing STEM',
        amount: 75000,
        category: 'Women',
        eligibility: {
          minimumPercentage: 60,
          courseLevel: 'All Levels',
          course: 'STEM fields',
          maxFamilyIncome: 1000000,
          gender: 'Female',
          category: ['General', 'OBC', 'SC', 'ST', 'EWS']
        },
        provider: provider._id,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-20'),
        totalSlots: 50,
        slotsAvailable: 50,
        status: 'Open'
      },
      {
        name: 'State Government Scholarship',
        description: 'Need-based scholarship for students from low-income families',
        amount: 30000,
        category: 'Need-Based',
        eligibility: {
          minimumPercentage: 50,
          courseLevel: 'All Levels',
          course: 'All courses',
          maxFamilyIncome: 500000,
          gender: 'All',
          category: ['General', 'OBC', 'SC', 'ST', 'EWS']
        },
        provider: provider._id,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-18'),
        totalSlots: 200,
        slotsAvailable: 200,
        status: 'Open'
      }
    ]);

    console.log('✅ Created scholarships:', scholarships.length);

    // Create sample applications for all 3 students
    const rachana = users.find(u => u.email === 'rachanathunga20@gmail.com');
    const punyashree = users.find(u => u.email === 'punyashree32@gmail.com');
    const lakshmi = users.find(u => u.email === 'lakshmi.rachana10@gmail.com');

    // Rachana's application - Approved
    const app1 = new Application({
      student: rachana._id,
      scholarship: scholarships[0]._id,
      status: 'Approved',
      submittedDocuments: [
          { name: 'ID Proof', url: 'https://example.com/rachana_id.pdf' },
          { name: 'Income Certificate', url: 'https://example.com/rachana_income.pdf' },
          { name: 'Mark Sheet', url: 'https://example.com/rachana_marks.pdf' }
      ]
    });
    await app1.save();

    // Punyashree's application - Under Review
    const app2 = new Application({
      student: punyashree._id,
      scholarship: scholarships[1]._id,
      status: 'Under Review',
      submittedDocuments: [
          { name: 'ID Proof', url: 'https://example.com/punyashree_id.pdf' },
          { name: 'Income Certificate', url: 'https://example.com/punyashree_income.pdf' }
      ]
    });
    await app2.save();

    // Lakshmi's application - Submitted
    const app3 = new Application({
      student: lakshmi._id,
      scholarship: scholarships[2]._id,
      status: 'Submitted',
      submittedDocuments: [
          { name: 'ID Proof', url: 'https://example.com/lakshmi_id.pdf' }
      ]
    });
    await app3.save();

    console.log('✅ Created 3 applications');
    console.log('\n📊 Database seeded successfully!');
    console.log('\n🔑 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👨‍💼 Admin Login:');
    console.log('   Email: admin@scholarbridge.com');
    console.log('   Password: Admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👩‍🎓 Student Logins:');
    console.log('   1. Rachana R Tunga');
    console.log('      Email: rachanathunga20@gmail.com');
    console.log('      Password: Rachana123');
    console.log('   2. Punyashree BS');
    console.log('      Email: punyashree32@gmail.com');
    console.log('      Password: Punyashree123');
    console.log('   3. Lakshmi Rachana');
    console.log('      Email: lakshmi.rachana10@gmail.com');
    console.log('      Password: Lakshmi123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💰 Provider Login:');
    console.log('   Email: contact@jsw.com');
    console.log('   Password: Provider123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedData();