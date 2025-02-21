"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'
import QuestionUploadForm from './QuestionUploadForm'

interface CreateQuestionButtonProps {
  examId: string
  onQuestionCreated: () => void
}

export default function CreateQuestionButton({ examId, onQuestionCreated }: CreateQuestionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-6 w-6" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Question</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <QuestionUploadForm
              examId={examId}
              onUploadComplete={() => {
                setIsModalOpen(false)
                onQuestionCreated()
              }}
            />
          </div>
        </div>
      )}
    </>
  )
} 