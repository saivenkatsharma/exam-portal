import { jwtVerify, SignJWT } from 'jose'
import { prisma } from "@/lib/db"

interface JWTPayload {
  userId: string
  role: string
}

export async function verifyAuth(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    
    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
    })

    if (!user) return null

    return payload as JWTPayload
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export async function signToken(payload: JWTPayload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret)
} 