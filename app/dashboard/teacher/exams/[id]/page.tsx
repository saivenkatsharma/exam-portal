import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import CreateQuestionButton from '@/app/components/exam/CreateQuestionButton'

async function getExamDetails(examId: string) {
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      questions: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
  return exam
}

export default async function ExamDetailsPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId || decoded.role !== 'TEACHER') {
    redirect('/dashboard')
  }

  const exam = await getExamDetails(params.id)

  if (!exam) {
    return <div>Exam not found</div>
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
        <p className="text-gray-600">
          Duration: {exam.duration} minutes | Questions: {exam.questions.length}
        </p>
      </div>

      <div className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">
                Question {index + 1}: {question.text}
              </h3>
              <button
                onClick={() => {/* Add edit functionality */}}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </button>
            </div>

            {question.fileUrl && (
              <div className="mb-4">
                {question.fileType === 'PDF' ? (
                  <iframe
                    src={question.fileUrl}
                    className="w-full h-64 border rounded"
                  />
                ) : (
                  <img
                    src={question.fileUrl}
                    alt="Question attachment"
                    className="max-h-64 rounded"
                  />
                )}
              </div>
            )}

            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`p-3 rounded ${
                    optionIndex === question.correctOption
                      ? 'bg-green-100'
                      : 'bg-gray-50'
                  }`}
                >
                  {option}
                  {optionIndex === question.correctOption && (
                    <span className="ml-2 text-green-600">(Correct Answer)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {exam.questions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No questions added yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Click the + button to add your first question.
            </p>
          </div>
        )}
      </div>

      <CreateQuestionButton
        examId={exam.id}
        onQuestionCreated={() => {
          // This will trigger a server refresh to show the new question
          window.location.reload()
        }}
      />
    </div>
  )
} 