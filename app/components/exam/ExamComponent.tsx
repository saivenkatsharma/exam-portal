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
  userId: string
}

export default function ExamComponent({ exam, userId }: ExamProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(exam.questions.length).fill(-1))
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60)

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: exam.id,
          userId,
          answers,
        }),
      })

      if (res.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Failed to submit exam:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{exam.title}</h1>
        <p className="text-gray-600">Time remaining: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl mb-4">
          Question {currentQuestion + 1} of {exam.questions.length}
        </h2>
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
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentQuestion(curr => curr - 1)}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestion === exam.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(curr => curr + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 