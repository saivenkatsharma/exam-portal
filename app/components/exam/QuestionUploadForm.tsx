"use client"

import { useState } from 'react'
import { Upload } from 'lucide-react'

interface QuestionUploadFormProps {
  examId: string
  onUploadComplete: () => void
}

export default function QuestionUploadForm({ examId, onUploadComplete }: QuestionUploadFormProps) {
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [questionText, setQuestionText] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctOption, setCorrectOption] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      setUploading(true)

      // 1. Upload file to storage
      const formData = new FormData()
      formData.append('file', file)
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const { fileUrl } = await uploadRes.json()

      // 2. Create question with file reference
      const questionData = {
        examId,
        text: questionText,
        options,
        correctOption,
        fileType: file.type.includes('pdf') ? 'PDF' : 'IMAGE',
        fileUrl
      }

      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData)
      })

      onUploadComplete()
      setFile(null)
      setQuestionText('')
      setOptions(['', '', '', ''])
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Question Text</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Options</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options]
              newOptions[index] = e.target.value
              setOptions(newOptions)
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder={`Option ${index + 1}`}
            required
          />
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Correct Option</label>
        <select
          value={correctOption}
          onChange={(e) => setCorrectOption(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {options.map((_, index) => (
            <option key={index} value={index}>Option {index + 1}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload PDF or Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
            {file && <p className="text-sm text-gray-500">{file.name}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {uploading ? 'Uploading...' : 'Upload Question'}
      </button>
    </form>
  )
} 