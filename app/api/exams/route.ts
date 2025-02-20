import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const user = await auth(req)
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const exams = await prisma.exam.findMany({
      include: {
        questions: true,
      },
    })

    return NextResponse.json(exams)
  } catch (error) {
    console.error("Error fetching exams:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const user = await auth(req)
    
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const examData = await req.json()
    
    const exam = await prisma.exam.create({
      data: {
        ...examData,
        userId: user.id,
        questions: {
          create: examData.questions,
        },
      },
      include: {
        questions: true,
      },
    })

    return NextResponse.json(exam)
  } catch (error) {
    console.error("Error creating exam:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 