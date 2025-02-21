import { NextResponse } from "next/server"
import { prisma } from "@/lib/db" // Use the shared prisma client
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/auth"
import { cookies } from 'next/headers'

// Simple in-memory rate limiting
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // 5 requests per minute
const ipRequests = new Map<string, { count: number; timestamp: number }>()

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const requestData = ipRequests.get(ip)

    if (requestData) {
      if (now - requestData.timestamp < RATE_LIMIT_DURATION) {
        if (requestData.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Too many login attempts. Please try again later." },
            { status: 429 }
          )
        }
        requestData.count++
      } else {
        requestData.count = 1
        requestData.timestamp = now
      }
    } else {
      ipRequests.set(ip, { count: 1, timestamp: now })
    }

    const { username, password, role } = await req.json()
    console.log('Login attempt for:', username)

    // Find user with role check
    const user = await prisma.user.findFirst({
      where: { 
        username,
        role
      },
    })
    console.log('Database result:', {
      found: !!user,
      userId: user?.id,
      username: user?.username,
      role: user?.role
    })

    if (!user) {
      console.log('User not found in database')
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isValidPassword)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Generate token using jose
    const token = await signToken({
      userId: user.id,
      role: user.role
    })

    // Create response with cookie
    const response = NextResponse.json(
      { 
        success: true,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
        }
      },
      { status: 200 }
    )

    // Set cookie with token
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60 // 8 hours
    })

    console.log('Login successful, token set')
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    )
  }
} 