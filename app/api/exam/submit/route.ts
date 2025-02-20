import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { examId, userId, answers } = await req.json()

    // Get exam questions to calculate score
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true }
    })

    if (!exam) {
      return NextResponse.json(
        { error: "Exam not found" },
        { status: 404 }
      )
    }

    // Calculate score
    let score = 0
    answers.forEach((answer: number, index: number) => {
      if (answer === exam.questions[index].correctOption) {
        score++
      }
    })

    // Create attempt record
    const attempt = await prisma.attempt.create({
      data: {
        examId,
        userId,
        answers,
        score,
        endTime: new Date(),
      }
    })

    return NextResponse.json({
      success: true,
      attempt: {
        id: attempt.id,
        score: attempt.score,
        totalQuestions: exam.questions.length
      }
    })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { error: "Failed to submit exam" },
      { status: 500 }
    )
  }
} 