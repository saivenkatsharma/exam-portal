import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const prisma = new PrismaClient()

const fullStackQuestions = [
  {
    text: "What is React's Virtual DOM?",
    options: [
      "An exact copy of the real DOM",
      "A lightweight copy of the real DOM used for performance optimization",
      "A virtual reality interface for DOM manipulation",
      "A DOM replacement technology"
    ],
    correctOption: 1
  },
  {
    text: "What is Node.js?",
    options: [
      "A frontend framework",
      "A database management system",
      "A runtime environment for executing JavaScript outside the browser",
      "A programming language"
    ],
    correctOption: 2
  },
  {
    text: "What is Express.js?",
    options: [
      "A database",
      "A web framework for Node.js",
      "A frontend library",
      "A testing framework"
    ],
    correctOption: 1
  },
  {
    text: "What is MongoDB?",
    options: [
      "A SQL database",
      "A NoSQL database",
      "A caching system",
      "A message queue"
    ],
    correctOption: 1
  },
  {
    text: "What is REST API?",
    options: [
      "A programming language",
      "A database system",
      "An architectural style for APIs",
      "A frontend framework"
    ],
    correctOption: 2
  },
  {
    text: "What is TypeScript?",
    options: [
      "A superset of JavaScript with static typing",
      "A new programming language",
      "A JavaScript framework",
      "A testing library"
    ],
    correctOption: 0
  },
  {
    text: "What is Next.js?",
    options: [
      "A database system",
      "A React framework for production",
      "A testing framework",
      "A CSS framework"
    ],
    correctOption: 1
  },
  {
    text: "What is JWT used for?",
    options: [
      "Database queries",
      "User authentication and authorization",
      "Server-side rendering",
      "API rate limiting"
    ],
    correctOption: 1
  },
  {
    text: "What is Redux?",
    options: [
      "A state management library",
      "A routing library",
      "A styling framework",
      "A testing framework"
    ],
    correctOption: 0
  },
  {
    text: "What is GraphQL?",
    options: [
      "A database",
      "A query language for APIs",
      "A JavaScript runtime",
      "A CSS preprocessor"
    ],
    correctOption: 1
  }
  // Add more questions as needed...
];

async function main() {
  try {
    console.log('Starting database seed...')

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: adminPassword,
        name: 'Admin User',
        role: 'ADMIN',
      },
    })

    // Create teacher user
    const teacherPassword = await bcrypt.hash('teacher123', 10)
    const teacher = await prisma.user.upsert({
      where: { username: 'teacher' },
      update: {},
      create: {
        username: 'teacher',
        password: teacherPassword,
        name: 'Teacher User',
        role: 'TEACHER',
      },
    })
    console.log('Created teacher account:', {
      username: 'teacher',
      password: 'teacher123' // Show password in logs for development
    })

    // Create student user
    const studentPassword = await bcrypt.hash('student123', 10)
    await prisma.user.upsert({
      where: { username: 'student' },
      update: {},
      create: {
        username: 'student',
        password: studentPassword,
        name: 'Student User',
        role: 'STUDENT',
      },
    })

    // Create a sample exam
    await prisma.exam.create({
      data: {
        title: 'Sample Programming Exam',
        duration: 60,
        startTime: new Date(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        userId: teacher.id,
        questions: {
          create: [
            {
              text: 'What is the purpose of the useEffect hook in React?',
              options: [
                'To handle side effects in functional components',
                'To create new state variables',
                'To define component props',
                'To render JSX elements',
              ],
              correctOption: 0,
            },
            {
              text: 'Which of the following is NOT a valid HTTP method?',
              options: ['GET', 'POST', 'PUT', 'SEND'],
              correctOption: 3,
            },
          ],
        },
      },
    })

    // Create test user
    const password = await bcrypt.hash('test123', 10)
    const testUser = await prisma.user.upsert({
      where: { username: 'testuser' },
      update: {},
      create: {
        username: 'testuser',
        password: password,
        name: 'Test Student',
        role: 'STUDENT',
      },
    })
    console.log('Created test user:', {
      id: testUser.id,
      username: testUser.username,
      role: testUser.role
    })

    // Create sharma user
    const sharmaPassword = await bcrypt.hash('112233', 10)
    const sharma = await prisma.user.upsert({
      where: { username: 'sharma256' },
      update: {},
      create: {
        username: 'sharma256',
        password: sharmaPassword,
        name: 'Sharma User',
        role: 'STUDENT',
      },
    })
    console.log('Created sharma user:', {
      id: sharma.id,
      username: sharma.username,
      role: sharma.role
    })

    // Create full stack exam
    const exam = await prisma.exam.create({
      data: {
        title: 'Full Stack Development Assessment',
        duration: 60, // 60 minutes
        startTime: new Date(),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Available for 7 days
        userId: teacher.id,
        questions: {
          create: fullStackQuestions.map(q => ({
            text: q.text,
            options: q.options,
            correctOption: q.correctOption
          }))
        }
      }
    })
    console.log('Created exam:', exam.title)

    console.log('All seed data created successfully')
  } catch (error) {
    console.error('Seed error:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 