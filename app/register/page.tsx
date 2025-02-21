import RegisterForm from "@/app/components/auth/RegisterForm"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAuth } from "@/lib/auth"

export default async function RegisterPage() {
  // Check if user is already logged in
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (token) {
    const decoded = await verifyAuth(token.value)
    if (decoded?.userId) {
      redirect('/dashboard')
    }
  }

  return <RegisterForm />
} 