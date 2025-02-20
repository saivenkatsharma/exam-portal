import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    // Test the connection by attempting to count users
    const userCount = await prisma.user.count()
    
    return NextResponse.json({ 
      status: "Connected successfully", 
      userCount 
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: 500 }
    )
  }
} 