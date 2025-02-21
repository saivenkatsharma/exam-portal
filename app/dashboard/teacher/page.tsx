import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import Link from 'next/link'

async function getTeacherData(userId: string) {
  const [exams, submissions] = await Promise.all([
    prisma.exam.findMany({
      where: { userId },
      include: {
        _count: {
          select: { attempts: true }
        }
      }
    }),
    prisma.attempt.findMany({
      include: {
        user: {
          select: {
            name: true,
            username: true
          }
        },
        exam: {
          select: {
            title: true,
            questions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Latest 10 submissions
    })
  ])

  return { exams, submissions }
}

export default async function TeacherDashboard() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId || decoded.role !== 'TEACHER') {
    redirect('/dashboard')
  }

  const { exams, submissions } = await getTeacherData(decoded.userId)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <Link
          href="/dashboard/teacher/exams/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Exam
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Exams</h2>
          <div className="space-y-4">
            {exams.map(exam => (
              <div key={exam.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{exam.title}</h3>
                  <p className="text-sm text-gray-500">
                    {exam._count.attempts} attempts
                  </p>
                </div>
                <Link
                  href={`/dashboard/teacher/exams/${exam.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <div className="space-y-4">
            {submissions.map(submission => (
              <div key={submission.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{submission.user.name}</p>
                    <p className="text-sm text-gray-500">{submission.exam.title}</p>
                    <p className="text-sm text-gray-500">
                      Score: {submission.score} / {submission.exam.questions.length}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/teacher/submissions/${submission.id}`}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 