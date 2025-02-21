import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const token = req.headers.get('cookie')?.split('token=')[1]
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = await verifyAuth(token)
    if (!decoded?.userId || decoded.role !== 'TEACHER') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await req.json()
    const { examId, text, options, correctOption, fileType, fileUrl } = data

    const question = await prisma.question.create({
      data: {
        text,
        options,
        correctOption,
        fileType,
        fileUrl,
        examId
      }
    })

    return NextResponse.json(question)
  } catch (error) {
    console.error('Question creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    )
  }
} 