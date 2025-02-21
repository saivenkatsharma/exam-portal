import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

async function getSubmissionDetails(submissionId: string) {
  const submission = await prisma.attempt.findUnique({
    where: { id: submissionId },
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
  return submission
}

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId || decoded.role !== 'TEACHER') {
    redirect('/dashboard')
  }

  const submission = await getSubmissionDetails(params.id)

  if (!submission) {
    return <div>Submission not found</div>
  }

  const answers = submission.answers as number[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submission Details</h1>
        <div className="text-gray-600">
          <p>Student: {submission.user.name}</p>
          <p>Exam: {submission.exam.title}</p>
          <p>Score: {submission.score} / {submission.exam.questions.length}</p>
          <p>Submitted: {new Date(submission.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-6">
        {submission.exam.questions.map((question, index) => (
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
                    <span className="ml-2 text-red-600">(Student's Answer)</span>
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