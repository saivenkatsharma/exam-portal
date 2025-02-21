import { cookies } from 'next/headers'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import ExamComponent from "@/app/components/exam/ExamComponent"

async function getAvailableExam(userId: string) {
  const exam = await prisma.exam.findFirst({
    where: {
      endTime: {
        gte: new Date(),
      },
      NOT: {
        attempts: {
          some: {
            userId: userId
          }
        }
      }
    },
    include: {
      questions: true
    }
  })
  return exam
}

export default async function ExamPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId) {
    redirect('/login')
  }

  const exam = await getAvailableExam(decoded.userId)

  if (!exam) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">No Available Exams</h1>
          <p className="mt-2 text-gray-600">You have completed all available exams.</p>
        </div>
      </div>
    )
  }

  return <ExamComponent exam={exam} userId={decoded.userId} />
} 