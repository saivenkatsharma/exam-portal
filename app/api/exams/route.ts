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
    const { title, duration, startTime, endTime } = data

    const exam = await prisma.exam.create({
      data: {
        title,
        duration,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        userId: decoded.userId
      }
    })

    return NextResponse.json(exam)
  } catch (error) {
    console.error('Exam creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create exam' },
      { status: 500 }
    )
  }
} 