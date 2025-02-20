import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { prisma } from "@/lib/db"

const prismaClient = new PrismaClient()

interface JWTPayload {
  userId: string
  role: string
}

export async function auth(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1]

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string
    }

    const user = await prismaClient.user.findUnique({
      where: { id: decoded.userId },
    })

    return user
  } catch (error) {
    return null
  }
}

export async function verifyAuth(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    
    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) return null

    return decoded
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
} 