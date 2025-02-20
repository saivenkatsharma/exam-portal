import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const user = await auth(req)
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { examId } = await req.json()

    // Check if user already has an ongoing attempt
    const existingAttempt = await prisma.examAttempt.findFirst({
      where: {
        userId: user.id,
        examId,
        status: "IN_PROGRESS",
      },
    })

    if (existingAttempt) {
      return NextResponse.json(
        { error: "You already have an ongoing attempt" },
        { status: 400 }
      )
    }

    // Create new attempt
    const attempt = await prisma.examAttempt.create({
      data: {
        userId: user.id,
        examId,
        status: "IN_PROGRESS",
      },
    })

    return NextResponse.json(attempt)
  } catch (error) {
    console.error("Error creating exam attempt:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 