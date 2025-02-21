import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

async function getAttemptDetails(attemptId: string, userId: string) {
  const attempt = await prisma.attempt.findFirst({
    where: {
      id: attemptId,
      userId // Ensure student can only see their own attempts
    },
    include: {
      exam: {
        select: {
          title: true,
          questions: {
            select: {
              text: true,
              options: true,
              correctOption: true
            }
          }
        }
      }
    }
  })
  return attempt
}

export default async function AttemptPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId || decoded.role !== 'STUDENT') {
    redirect('/dashboard')
  }

  const attempt = await getAttemptDetails(params.id, decoded.userId)

  if (!attempt) {
    return <div>Attempt not found</div>
  }

  const answers = attempt.answers as number[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Exam Results</h1>
        <div className="text-gray-600">
          <p>Exam: {attempt.exam.title}</p>
          <p>Score: {attempt.score} / {attempt.exam.questions.length}</p>
          <p>Percentage: {((attempt.score / attempt.exam.questions.length) * 100).toFixed(1)}%</p>
          <p>Completed: {new Date(attempt.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-6">
        {attempt.exam.questions.map((question, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Question {index + 1}: {question.text}
            </h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`p-3 rounded ${
                    optionIndex === question.correctOption
                      ? 'bg-green-100'
                      : optionIndex === answers[index]
                      ? 'bg-red-100'
                      : 'bg-gray-50'
                  }`}
                >
                  {option}
                  {optionIndex === question.correctOption && (
                    <span className="ml-2 text-green-600">(Correct Answer)</span>
                  )}
                  {optionIndex === answers[index] && optionIndex !== question.correctOption && (
                    <span className="ml-2 text-red-600">(Your Answer)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 