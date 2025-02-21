import { cookies } from 'next/headers'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

async function getExamResults() {
  const attempts = await prisma.attempt.findMany({
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
    }
  })
  return attempts
}

export default async function ResultsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId || decoded.role !== 'TEACHER') {
    redirect('/dashboard')
  }

  const results = await getExamResults()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Exam Results</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Exam</th>
              <th className="px-6 py-3 text-left">Score</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-b">
                <td className="px-6 py-4">{result.user.name}</td>
                <td className="px-6 py-4">{result.exam.title}</td>
                <td className="px-6 py-4">{result.score}</td>
                <td className="px-6 py-4">
                  {new Date(result.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 