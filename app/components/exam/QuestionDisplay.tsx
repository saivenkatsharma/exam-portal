"use client"

interface QuestionDisplayProps {
  question: {
    text: string
    options: string[]
    fileUrl?: string
    fileType?: 'PDF' | 'IMAGE'
  }
  selectedOption: number
  onSelectOption: (optionIndex: number) => void
}

export default function QuestionDisplay({ question, selectedOption, onSelectOption }: QuestionDisplayProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{question.text}</h3>

      {question.fileUrl && (
        <div className="my-4">
          {question.fileType === 'PDF' ? (
            <iframe
              src={question.fileUrl}
              className="w-full h-96 border rounded"
            />
          ) : (
            <img
              src={question.fileUrl}
              alt="Question attachment"
              className="max-w-full rounded"
            />
          )}
        </div>
      )}

      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(index)}
            className={`w-full p-3 text-left rounded ${
              selectedOption === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
} 