import LoginForm from "@/app/components/auth/LoginForm"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAuth } from "@/lib/auth"

export default async function InvigilatorLoginPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (token) {
    const decoded = await verifyAuth(token.value)
    if (decoded?.userId && decoded.role === 'INVIGILATOR') {
      redirect('/dashboard/invigilator')
    }
  }

  return <LoginForm role="INVIGILATOR" />
} 