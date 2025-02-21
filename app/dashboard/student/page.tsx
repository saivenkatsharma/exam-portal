import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import Link from 'next/link'

async function getStudentData(userId: string) {
  const attempts = await prisma.attempt.findMany({
    where: { userId },
    include: {
      exam: {
        select: {
          title: true,
          questions: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const availableExam = await prisma.exam.findFirst({
    where: {
      endTime: {
        gte: new Date(),
      },
      NOT: {
        attempts: {
          some: {
            userId
          }
        }
      }
    }
  })

  return { attempts, availableExam }
}

export default async function StudentDashboard() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId || decoded.role !== 'STUDENT') {
    redirect('/dashboard')
  }

  const { attempts, availableExam } = await getStudentData(decoded.userId)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

      {availableExam && (
        <div className="mb-8 bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Available Exam</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">{availableExam.title}</p>
              <p className="text-gray-600">Duration: {availableExam.duration} minutes</p>
            </div>
            <Link
              href="/exam"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Start Exam
            </Link>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-6 border-b">Your Exam History</h2>
        <div className="divide-y">
          {attempts.map((attempt) => (
            <div key={attempt.id} className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{attempt.exam.title}</h3>
                  <p className="text-gray-600">
                    Score: {attempt.score} / {attempt.exam.questions.length} (
                    {((attempt.score / attempt.exam.questions.length) * 100).toFixed(1)}%)
                  </p>
                  <p className="text-sm text-gray-500">
                    Completed: {new Date(attempt.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href={`/dashboard/student/attempts/${attempt.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
          {attempts.length === 0 && (
            <p className="p-6 text-gray-500">No exams attempted yet.</p>
          )}
        </div>
      </div>
    </div>
  )
} 