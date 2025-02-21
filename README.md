# 🎓 Tech Assessment Portal

A modern examination platform built with Next.js for conducting technical assessments and skill evaluations.

## ✨ Features

### For Students 👨‍🎓
- 📝 Take technical assessments
- ⏱️ Real-time exam timer
- 🔄 Auto-save responses
- 📊 View results and analytics
- 📱 Responsive design for all devices

### For Invigilators 👨‍🏫
- 👀 Monitor active exams
- 📋 View student attempts
- 📈 Generate reports
- 🚫 Prevent malpractice
- 🔍 Review submissions

## 🛠️ Tech Stack

- ⚛️ **Frontend**: Next.js 14, React, TypeScript
- 🎨 **Styling**: Tailwind CSS, Framer Motion
- 🔒 **Authentication**: JWT, bcrypt
- 💾 **Database**: MongoDB, Prisma
- 🧪 **Testing**: Jest, React Testing Library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 📦
- MongoDB 🍃
- npm/yarn 📥

### Installation

1. Clone the repository
git clone https://github.com/yourusername/tech-assessment-portal.git
cd tech-assessment-portal
2. Install dependencies
3. Set up environment variables
Create a .env file with the following:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server
```bash
npm run dev
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📁 Project Structure

```
├── app/
│   ├── api/          # API routes
│   ├── components/   # React components
│   ├── dashboard/    # Dashboard pages
│   └── types/        # TypeScript types
├── lib/             # Utility functions
├── prisma/          # Database schema
└── public/          # Static assets
```

## 🔐 Authentication

- 🔑 JWT-based authentication
- 🔄 Automatic token refresh
- 👥 Role-based access control (Student/Invigilator)
- 🚪 Protected routes

## 💻 Development

### Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm test`: Run tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the utility-first CSS framework
- Testing Library for the testing utilities
- All contributors who have helped this project grow