"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  text: string
  options: string[]
}

interface ExamProps {
  exam: {
    id: string
    title: string
    duration: number
    questions: Question[]
  }
}

export default function ExamComponent({ exam }: ExamProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(exam.questions.length).fill(-1))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      setError("")

      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: exam.id,
          answers,
        }),
        credentials: 'include', // Important: Include credentials
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit exam')
      }

      const data = await res.json()
      
      // Redirect to results page
      router.push(`/dashboard/student/attempts/${data.attempt.id}`)
    } catch (error) {
      console.error('Submit error:', error)
      setError(error instanceof Error ? error.message : 'Failed to submit exam')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold">{exam.title}</h1>
        <p className="text-gray-600">
          Question {currentQuestion + 1} of {exam.questions.length}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="mb-4">{exam.questions[currentQuestion].text}</p>

        <div className="space-y-2">
          {exam.questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 text-left rounded ${
                answers[currentQuestion] === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleAnswer(index)}
              disabled={submitting}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentQuestion(curr => curr - 1)}
            disabled={currentQuestion === 0 || submitting}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestion === exam.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(curr => curr + 1)}
              disabled={submitting}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 