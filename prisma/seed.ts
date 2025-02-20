import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const prisma = new PrismaClient()

async function main() {
  try {
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

    // Create test users
    const testUser = await prisma.user.upsert({
      where: { username: 'testuser' },
      update: {},
      create: {
        username: 'testuser',
        password: await bcrypt.hash('test123', 10),
        name: 'Test Student',
        role: 'STUDENT',
      },
    })

    console.log('Created test user:', testUser)

    const sharma = await prisma.user.upsert({
      where: { username: 'sharma256' },
      update: {},
      create: {
        username: 'sharma256',
        password: await bcrypt.hash('112233', 10),
        name: 'Sharma User',
        role: 'STUDENT',
      },
    })

    console.log('Created sharma user:', sharma)

    console.log('All seed data created successfully')
  } catch (error) {
    console.error('Error seeding data:', error)
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