import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    // Verify authentication first
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded = await verifyAuth(token.value)
    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { examId, answers } = await req.json()

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
        userId: decoded.userId, // Use the userId from token
        answers,
        score,
        endTime: new Date(),
      }
    })

    // Create response with the same cookie to maintain session
    const response = NextResponse.json({
      success: true,
      attempt: {
        id: attempt.id,
        score: attempt.score,
        totalQuestions: exam.questions.length
      }
    })

    // Keep the existing token cookie
    response.cookies.set({
      name: 'token',
      value: token.value,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60 // 8 hours
    })

    return response

  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { error: "Failed to submit exam" },
      { status: 500 }
    )
  }
} 