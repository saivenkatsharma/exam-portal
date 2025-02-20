"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import QuestionNavigator from "./components/QuestionNavigator"
import QuestionDisplay from "./components/QuestionDisplay"
import Timer from "./components/Timer"
import WarningNotification from "../components/WarningNotification"

const questions = [
  {
    id: 1,
    text: "What is the purpose of the 'useEffect' hook in React?",
    options: [
      "To handle side effects in functional components",
      "To create new state variables",
      "To define component props",
      "To render JSX elements",
    ],
  },
  {
    id: 2,
    text: "Which of the following is NOT a valid HTTP method?",
    options: ["GET", "POST", "PUT", "SEND"],
  },
  {
    id: 3,
    text: "What does ORM stand for in the context of databases?",
    options: [
      "Object-Relational Mapping",
      "Online Resource Management",
      "Operational Risk Mitigation",
      "Output Rendering Module",
    ],
  },
  {
    id: 4,
    text: "Which of the following is a NoSQL database?",
    options: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"],
  },
  {
    id: 5,
    text: "What is the purpose of a JWT (JSON Web Token)?",
    options: [
      "To encrypt database connections",
      "To authenticate and authorize users in web applications",
      "To compress JSON data for faster transmission",
      "To validate HTML forms",
    ],
  },
]

export default function ExamEnvironment() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(30 * 60) // 30 minutes in seconds
  const [warning, setWarning] = useState({ message: "", isVisible: false })
  const router = useRouter()

  useEffect(() => {
    // Implement security measures
    document.addEventListener("visibilitychange", handleVisibilityChange)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleVisibilityChange = () => {
    if (document.hidden) {
      showWarning("Tab switching detected. Please return to the exam.")
    }
  }

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      showWarning("Fullscreen mode exited. Please return to fullscreen.")
    }
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
    // Implement auto-save logic here
    localStorage.setItem("examAnswers", JSON.stringify({ ...answers, [questionId]: answer }))
    showAutoSaveIndicator()
  }

  const showWarning = (message) => {
    setWarning({ message, isVisible: true })
    setTimeout(() => setWarning({ message: "", isVisible: false }), 5000)
  }

  const showAutoSaveIndicator = () => {
    // Implement a subtle auto-save indicator here
  }

  const handlePassQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleEndExam = () => {
    if (confirm("Are you sure you want to end the exam? This action cannot be undone.")) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the answers to a server
    console.log("Submitting answers:", answers)
    alert("Exam submitted successfully!")
    router.push("/") // Redirect to home page after submission
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow flex">
        <div className="w-1/4 bg-gray-50 p-4">
          <QuestionNavigator
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            answeredQuestions={Object.keys(answers).map(Number)}
          />
          <Timer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} />
        </div>
        <div className="w-3/4 p-4">
          <QuestionDisplay
            question={questions[currentQuestion - 1]}
            answer={answers[currentQuestion]}
            onAnswerChange={handleAnswerChange}
          />
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePassQuestion}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Pass Question
            </button>
            <div>
              <button onClick={handleEndExam} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2">
                End Exam
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
      <WarningNotification message={warning.message} isVisible={warning.isVisible} />
    </div>
  )
}

