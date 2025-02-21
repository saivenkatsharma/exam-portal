import { redirect } from 'next/navigation'

export default function LoginPage() {
  // Redirect to student login by default
  redirect('/login/student')
} 